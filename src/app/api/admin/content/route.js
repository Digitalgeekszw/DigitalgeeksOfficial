import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import WebsiteContent from "../../../../models/WebsiteContent";
import { uploadToR2 } from "../../../../utils/r2";

export async function GET(req) {
  try {
    await connectDB();
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
    const formData = await req.formData();
    
    const key = formData.get('key');
    const label = formData.get('label');
    const type = formData.get('type');
    const file = formData.get('file');
    let value = formData.get('value');

    if (!key || !label || !type) {
      return NextResponse.json({ message: 'Key, label and type are required.' }, { status: 400 });
    }

    if (file && typeof file !== 'string') {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const folder = type === 'video' ? 'videos' : 'images';
      value = await uploadToR2(buffer, file.name, file.type, folder);
    }

    if (!value) {
      return NextResponse.json({ message: 'Value or file is required.' }, { status: 400 });
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
