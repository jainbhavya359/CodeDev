import { saveExecutedCode } from "@/app/(root)/_constants/getExecutedCode";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const saved = await saveExecutedCode(body);
  return NextResponse.json(saved);
}
