import { NextResponse } from "next/server";
import { updateSetting } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const { key, value } = await req.json();

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key dan value harus diisi" },
        { status: 400 }
      );
    }

    const ok = await updateSetting(key, value);

    if (!ok) {
      return NextResponse.json(
        { error: "Gagal memperbarui pengaturan" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API settings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
