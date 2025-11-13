import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    const artistsRef = collection(db, "artists");
    const q = query(artistsRef, orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);

    const artists = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      { 
        success: true, 
        artists 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching artists:", error);
    return NextResponse.json(
      { error: "Failed to fetch artists. Please try again." },
      { status: 500 }
    );
  }
}

