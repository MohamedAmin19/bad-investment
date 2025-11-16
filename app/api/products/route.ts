import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      { 
        success: true, 
        products 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products. Please try again." },
      { status: 500 }
    );
  }
}

