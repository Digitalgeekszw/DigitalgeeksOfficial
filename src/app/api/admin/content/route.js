import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import WebsiteContent from "../../../../models/WebsiteContent";
import { uploadToR2, generatePresignedUrl } from "../../../../utils/r2";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName");
    const fileType = searchParams.get("fileType");

    // Case 1: Request for presigned URL (via GET)
    if (fileName && fileType) {
      const folder = searchParams.get("folder") || "content";
      const { uploadUrl, publicUrl } = await generatePresignedUrl(fileName, fileType, folder);
      return NextResponse.json({ uploadUrl, publicUrl }, { status: 200 });
    }

    // Case 2: Fetch all content
    const contents = await WebsiteContent.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ contents }, { status: 200 });
  } catch (error) {
    console.error("Content GET Error:", error);
    return NextResponse.json({ message: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { key, label, type, value } = body;

    if (!key || !label || !type || !value) {
      return NextResponse.json({ message: 'Key, label, type and value are required.' }, { status: 400 });
    }

    const updated = await WebsiteContent.findOneAndUpdate(
      { key },
      { key, label, type, value },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Content updated successfully", content: updated }, { status: 200 });
  } catch (error) {
    console.error("Content POST Error:", error);
    return NextResponse.json({ message: "Failed to update content", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });
    await WebsiteContent.findByIdAndDelete(id);
    return NextResponse.json({ message: "Content deleted" }, { status: 200 });
  } catch (error) {
    console.error("Content DELETE Error:", error);
    return NextResponse.json({ message: "Failed to delete content" }, { status: 500 });
  }
}
