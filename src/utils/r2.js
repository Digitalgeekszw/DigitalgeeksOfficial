import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// Validate required environment variables
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

let s3Client = null;

if (R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY) {
  s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

/**
 * Uploads a file buffer to Cloudflare R2 and returns the public URL
 * @param {Buffer|Uint8Array} fileBuffer The file content
 * @param {string} originalFilename The original name of the file
 * @param {string} mimeType The mime type of the file
 * @returns {Promise<string>} The public URL of the uploaded file
 */
export async function uploadToR2(fileBuffer, originalFilename, mimeType, folder = 'resumes') {
  if (!s3Client) {
    throw new Error('R2 credentials are not configured in environment variables');
  }

  if (!R2_BUCKET_NAME || !R2_PUBLIC_URL) {
    throw new Error('R2_BUCKET_NAME or R2_PUBLIC_URL is missing in environment variables');
  }

  // Generate a unique filename to prevent overwrites
  const extension = originalFilename.split('.').pop();
  const uniqueId = uuidv4();
  const safeFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
  const fileKey = `${folder}/${uniqueId}-${safeFilename}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  try {
    await s3Client.send(command);
    // Remove trailing slash from public URL if present
    const cleanBaseUrl = R2_PUBLIC_URL.endsWith('/') 
      ? R2_PUBLIC_URL.slice(0, -1) 
      : R2_PUBLIC_URL;
    
    return `${cleanBaseUrl}/${fileKey}`;
  } catch (error) {
    console.error('Error uploading to R2:', error);
    throw new Error('Failed to upload file to Cloudflare storage');
  }
}
