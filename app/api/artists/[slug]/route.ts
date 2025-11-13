import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const artistsRef = collection(db, "artists");
    const q = query(artistsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: "Artist not found" },
        { status: 404 }
      );
    }

    const artistDoc = querySnapshot.docs[0];
    const artist = {
      id: artistDoc.id,
      ...artistDoc.data(),
    };

    return NextResponse.json(
      { 
        success: true, 
        artist 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching artist:", error);
    return NextResponse.json(
      { error: "Failed to fetch artist. Please try again." },
      { status: 500 }
    );
  }
}

