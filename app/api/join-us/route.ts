import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Store email in Firestore
    const docRef = await addDoc(collection(db, "subscribers"), {
      email: email.toLowerCase().trim(),
      createdAt: serverTimestamp(),
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Email subscribed successfully",
        id: docRef.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error storing email:", error);
    return NextResponse.json(
      { error: "Failed to subscribe email. Please try again." },
      { status: 500 }
    );
  }
}

