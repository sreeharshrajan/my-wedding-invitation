import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  const collectionName = 'wishes'
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return NextResponse.json({ error: "Data fetch failed" }, { status: 500 });
  }
}
