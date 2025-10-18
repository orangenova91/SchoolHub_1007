// app/api/people/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDB();
    const docs = await db.collection("test_db").find().toArray();
    return NextResponse.json(docs, { status: 200 });
  } catch (err: any) {
    console.error("[GET /api/people] ", err);
    return NextResponse.json({ error: "DB_ERROR", message: err?.message }, { status: 500 });
  }
}
