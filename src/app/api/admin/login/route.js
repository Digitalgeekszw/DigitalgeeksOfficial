import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (password === adminPassword) {
      const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
      
      // Set a session cookie
      response.cookies.set({
        name: "admin_session",
        value: "authenticated",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
      });

      return response;
    }

    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 });
  }
}
