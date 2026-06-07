import { NextResponse } from "next/server";
import { getPatternDetail } from "@/lib/patterns";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const detail = getPatternDetail(id);
    if (!detail) {
      return NextResponse.json({ error: "Pattern not found" }, { status: 404 });
    }
    return NextResponse.json(detail);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
