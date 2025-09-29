import { NextRequest, NextResponse } from "next/server";
import { enroll } from "@/lib/data";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body?.courseId) {
    return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
  }
  try {
    const result = await enroll({ courseId: body.courseId, isVIP: true });
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ message: result.isFree ? "Enrolled free as VIP 🎉" : "Payment captured. You're enrolled!" });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
