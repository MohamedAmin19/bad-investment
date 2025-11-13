import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    const updatesRef = collection(db, "updates");
    const q = query(updatesRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);

    const updates = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      { 
        success: true, 
        updates 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching updates:", error);
    return NextResponse.json(
      { error: "Failed to fetch updates. Please try again." },
      { status: 500 }
    );
  }
}

