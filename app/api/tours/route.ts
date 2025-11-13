import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    const toursRef = collection(db, "tours");
    const q = query(toursRef, orderBy("date", "asc"));
    const querySnapshot = await getDocs(q);

    const tours = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      { 
        success: true, 
        tours 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tours:", error);
    return NextResponse.json(
      { error: "Failed to fetch tours. Please try again." },
      { status: 500 }
    );
  }
}

