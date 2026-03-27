import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@ruangcerita.id";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password";

  if (!email || !password) {
    return NextResponse.json({ error: "Email dan password wajib diisi." }, { status: 400 });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ email, expires });

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", session, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires,
    });

    return response;
  }

  return NextResponse.json(
    { error: "Email atau password salah." },
    { status: 401 }
  );
}
