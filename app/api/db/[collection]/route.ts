// app/api/db/[collection]/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function GET(req: Request,{ params }: { params: { collection: string } })
   {
      try {
        const { db } = await connectToDB();
        const { collection } = await params;

        // collection 이름으로 동적 접근
        const docs = await db.collection(collection).find().toArray();

        return NextResponse.json(docs);
      } catch (err: any) {
        console.error("DB Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }
