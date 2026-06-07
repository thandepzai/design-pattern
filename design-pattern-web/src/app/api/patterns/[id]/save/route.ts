import { NextResponse } from "next/server";
import { savePatternExercise } from "@/lib/patterns";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { code } = await request.json();

    if (typeof code !== 'string') {
      return NextResponse.json({ error: "Invalid code format" }, { status: 400 });
    }

    // Ghi trực tiếp vào file local
    const success = savePatternExercise(id, code);
    if (!success) {
      return NextResponse.json({ error: "Failed to save exercise" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
