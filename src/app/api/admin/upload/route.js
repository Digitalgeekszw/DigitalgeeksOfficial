import { NextResponse } from "next/server";
import { uploadToR2 } from "../../../../utils/r2";

export const dynamic = "force-dynamic";

// Allows up to 500MB — needed for video uploads through the server
export const maxDuration = 60;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "content";

    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicUrl = await uploadToR2(buffer, file.name, file.type, folder);
    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: error.message || "Upload failed" }, { status: 500 });
  }
}
