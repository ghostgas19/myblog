import { NextResponse } from "next/server";
import { createMessage } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const { content, sender_name } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong" },
        { status: 400 }
      );
    }

    const message = await createMessage(content, sender_name);

    if (!message) {
      return NextResponse.json(
        { error: "Gagal mengirim pesan" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("API messages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
