import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  // const collectionName = new URL(req.url).searchParams.get("collection");
  const collectionName =  'wishes'
  // if (!collectionName) {
  //   return NextResponse.json(
  //     { error: "Collection name required" },
  //     { status: 400 }
  //   );
  // }

  try {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return NextResponse.json({ error: "Data fetch failed" }, { status: 500 });
  }
}
