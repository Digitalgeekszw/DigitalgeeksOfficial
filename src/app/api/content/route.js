import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import WebsiteContent from "../../../models/WebsiteContent";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();
    const contents = await WebsiteContent.find({});
    // Convert to a key-value object for easier use on the frontend
    const contentMap = contents.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    return NextResponse.json(contentMap, { status: 200 });
  } catch (error) {
    console.error("Public Content GET Error:", error);
    return NextResponse.json({ message: "Failed to fetch content" }, { status: 500 });
  }
}
