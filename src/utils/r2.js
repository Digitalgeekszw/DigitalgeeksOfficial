import { S3Client, PutObjectCommand, PutBucketCorsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';

// Helper to strip quotes from env variables if they exist
const stripQuotes = (str) => {
  if (!str) return str;
  return str.replace(/^["']|["']$/g, '');
};

// Validate required environment variables
const R2_ACCOUNT_ID = stripQuotes(process.env.R2_ACCOUNT_ID);
const R2_ACCESS_KEY_ID = stripQuotes(process.env.R2_ACCESS_KEY_ID);
const R2_SECRET_ACCESS_KEY = stripQuotes(process.env.R2_SECRET_ACCESS_KEY);
const R2_BUCKET_NAME = stripQuotes(process.env.R2_BUCKET_NAME);
const R2_PUBLIC_URL = stripQuotes(process.env.R2_PUBLIC_URL);

let s3Client = null;
let corsConfigured = false;
/** After one failed PutBucketCors per process, skip retries (credentials often lack permission; use Dashboard). */
let corsConfigureSkipped = false;

if (R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY) {
  s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
    // Avoid default CRC32 on presigned PutObject URLs (fewer query params / simpler browser CORS preflight).
    requestChecksumCalculation: 'WHEN_REQUIRED',
  });
} else {
  console.warn('R2 credentials missing in environment variables');
}

export async function configureR2CORS() {
  if (corsConfigured || corsConfigureSkipped || !s3Client || !R2_BUCKET_NAME) return;
  try {
    await s3Client.send(new PutBucketCorsCommand({
      Bucket: R2_BUCKET_NAME,
      CORSConfiguration: {
        CORSRules: [{
          AllowedHeaders: ['*'],
          AllowedMethods: ['GET', 'PUT', 'POST', 'HEAD', 'DELETE'],
          AllowedOrigins: [
            'https://www.digitalgeeks.tech',
            'https://digitalgeeks.tech',
            'http://localhost:3000',
          ],
          ExposeHeaders: ['ETag'],
          MaxAgeSeconds: 86400,
        }],
      },
    }));
    corsConfigured = true;
    console.log('R2 CORS configured successfully via API');
  } catch (error) {
    corsConfigureSkipped = true;
    const denied =
      /Access Denied|403|Forbidden/i.test(String(error.message)) ||
      error.name === "AccessDenied";
    console.error(
      "[R2] PutBucketCors failed — bucket CORS is required for browser PUT uploads.",
      error.message,
      denied
        ? "Your R2 API token likely cannot configure buckets (normal for object-only tokens). Open Cloudflare Dashboard → R2 → this bucket → Settings → CORS policy and add a rule manually. See https://developers.cloudflare.com/r2/buckets/cors/"
        : "Try adding CORS via Dashboard → R2 → bucket → Settings → CORS policy."
    );
  }
}

/**
 * Uploads a file buffer to Cloudflare R2 and returns the public URL
 * @param {Buffer|Uint8Array} fileBuffer The file content
 * @param {string} originalFilename The original name of the file
 * @param {string} mimeType The mime type of the file
 * @returns {Promise<string>} The public URL of the uploaded file
 */
export async function uploadToR2(fileBuffer, originalFilename, mimeType, folder = 'resumes') {
  console.log(`Starting R2 upload: ${originalFilename} (${mimeType}) to bucket: ${R2_BUCKET_NAME}`);
  
  if (!s3Client) {
    console.error('R2 Client not initialized. Check credentials.');
    throw new Error('R2 credentials are not configured in environment variables');
  }

  if (!R2_BUCKET_NAME || !R2_PUBLIC_URL) {
    console.error('R2 Bucket Name or Public URL missing');
    throw new Error('R2_BUCKET_NAME or R2_PUBLIC_URL is missing in environment variables');
  }

  // Generate a unique filename to prevent overwrites
  const extension = originalFilename.split('.').pop();
  const uniqueId = uuidv4();
  const safeFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
  const fileKey = `${folder}/${uniqueId}-${safeFilename}`;

  console.log(`Generated file key: ${fileKey}`);

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  try {
    console.log('Sending PutObjectCommand to R2...');
    await s3Client.send(command);
    console.log('R2 upload successful');

    // Remove trailing slash from public URL if present
    const cleanBaseUrl = R2_PUBLIC_URL.endsWith('/') 
      ? R2_PUBLIC_URL.slice(0, -1) 
      : R2_PUBLIC_URL;
    
    // Ensure the URL starts with https:// if it doesn't already
    const protocolBaseUrl = cleanBaseUrl.startsWith('http') 
      ? cleanBaseUrl 
      : `https://${cleanBaseUrl}`;
    
    const finalUrl = `${protocolBaseUrl}/${fileKey}`;
    console.log(`Public URL generated: ${finalUrl}`);
    return finalUrl;
  } catch (error) {
    console.error('Detailed R2 Upload Error:', {
      message: error.message,
      code: error.code,
      requestId: error.$metadata?.requestId,
      bucket: R2_BUCKET_NAME
    });
    throw new Error(`Cloudflare R2 Error: ${error.message}`);
  }
}

/**
 * Generates a presigned URL for direct upload from the browser
 * @param {string} fileName 
 * @param {string} fileType 
 * @param {string} folder 
 * @returns {Promise<{uploadUrl: string, publicUrl: string}>}
 */
export async function generatePresignedUrl(fileName, fileType, folder = 'content') {
  if (!s3Client) throw new Error('R2 Client not initialized');
  await configureR2CORS();

  const uniqueId = uuidv4();
  const safeFilename = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const fileKey = `${folder}/${uniqueId}-${safeFilename}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: fileKey,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  
  const cleanBaseUrl = R2_PUBLIC_URL.endsWith('/') ? R2_PUBLIC_URL.slice(0, -1) : R2_PUBLIC_URL;
  const protocolBaseUrl = cleanBaseUrl.startsWith('http') ? cleanBaseUrl : `https://${cleanBaseUrl}`;
  const publicUrl = `${protocolBaseUrl}/${fileKey}`;

  return { uploadUrl, publicUrl };
}
