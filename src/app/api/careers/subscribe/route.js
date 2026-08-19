import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import StudentEmailSubscriber from "../../../../models/StudentEmailSubscriber";
import { normalizeEmail } from "../../../../utils/applicantAuth";
import { getClientIp, isFakeSignupEmail, isRateLimited } from "../../../../utils/spamFilter";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = normalizeEmail(body.email);
    const name = String(body.name || "").trim();

    if (!email) {
      return NextResponse.json({ message: "A valid email address is required." }, { status: 400 });
    }

    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
    }

    if (isFakeSignupEmail(email, body.website)) {
      return NextResponse.json({ message: "You are on the opportunity email list." }, { status: 200 });
    }

    await connectDB();

    await StudentEmailSubscriber.findOneAndUpdate(
      { email },
      {
        $set: { subscribed: true, ...(name ? { name } : {}) },
        $setOnInsert: { email, source: "signup" },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "You are on the opportunity email list." }, { status: 200 });
  } catch (error) {
    console.error("Careers Subscribe Error:", error);
    return NextResponse.json({ message: "Unable to subscribe.", error: error.message }, { status: 500 });
  }
}
