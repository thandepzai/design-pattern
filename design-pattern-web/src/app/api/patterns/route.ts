import { NextResponse } from "next/server";
import { getPatternsList } from "@/lib/patterns";

export async function GET() {
  try {
    const list = getPatternsList();
    return NextResponse.json(list);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
