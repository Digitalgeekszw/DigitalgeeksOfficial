#!/usr/bin/env node
/**
 * Applies CORS to the configured R2 bucket (S3-compatible API).
 * Run from repo root with the same vars as Next (e.g. `set -a && source .env.local && set +a && node scripts/r2-apply-cors.mjs`).
 */

import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";

const strip = (str) =>
  typeof str !== "string" ? str : str.replace(/^["']|["']$/g, "");

const R2_ACCOUNT_ID = strip(process.env.R2_ACCOUNT_ID);
const R2_ACCESS_KEY_ID = strip(process.env.R2_ACCESS_KEY_ID);
const R2_SECRET_ACCESS_KEY = strip(process.env.R2_SECRET_ACCESS_KEY);
const R2_BUCKET_NAME = strip(process.env.R2_BUCKET_NAME);

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error(
    "Missing env: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME"
  );
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const CORSRules = [
  {
    AllowedHeaders: ["*"],
    AllowedMethods: ["GET", "PUT", "POST", "HEAD", "DELETE"],
    AllowedOrigins: [
      "https://www.digitalgeeks.tech",
      "https://digitalgeeks.tech",
      "http://localhost:3000",
    ],
    ExposeHeaders: ["ETag"],
    MaxAgeSeconds: 86400,
  },
];

try {
  await client.send(
    new PutBucketCorsCommand({
      Bucket: R2_BUCKET_NAME,
      CORSConfiguration: { CORSRules },
    })
  );
  console.log(`CORS applied to bucket "${R2_BUCKET_NAME}".`);
  console.log(
    "Verify: copy the R2 hostname from a failing presigned URL and run OPTIONS with Origin: https://www.digitalgeeks.tech — headers should include Access-Control-Allow-Origin."
  );
} catch (e) {
  console.error("PutBucketCors failed:", e.message);
  const denied = e?.name === "AccessDenied" || /access denied/i.test(String(e.message));
  if (denied) {
    console.error(
      "\nThis API token cannot change bucket settings; add CORS in the Dashboard (required for browser PUT):\n  Cloudflare Dashboard → R2 → this bucket → Settings → CORS policy → paste as JSON rule:\n"
    );
    console.log(JSON.stringify(CORSRules, null, 2));
  } else {
    console.error(
      "\nAdd CORS manually: Dashboard → R2 → bucket → Settings → CORS policy."
    );
  }
  process.exit(1);
}
