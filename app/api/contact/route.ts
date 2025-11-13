import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, comment } = body;

    // Validate name
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    if (trimmedName === "") {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (trimmedName.length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Name must be less than 100 characters" },
        { status: 400 }
      );
    }

    // Validate name contains only valid characters
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(trimmedName)) {
      return NextResponse.json(
        { error: "Name can only contain letters, spaces, hyphens, and apostrophes" },
        { status: 400 }
      );
    }

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail === "") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (trimmedEmail.length > 254) {
      return NextResponse.json(
        { error: "Email must be less than 254 characters" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // More strict email validation
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!strictEmailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Validate phone (optional but validate if provided)
    let trimmedPhone = "";
    if (phone) {
      if (typeof phone !== "string") {
        return NextResponse.json(
          { error: "Phone must be a string" },
          { status: 400 }
        );
      }

      trimmedPhone = phone.trim();
      if (trimmedPhone) {
        // Remove common formatting characters
        const phoneDigits = trimmedPhone.replace(/[\s\-\(\)\+]/g, "");
        
        // Check if it contains only digits
        if (!/^\d+$/.test(phoneDigits)) {
          return NextResponse.json(
            { error: "Phone number can only contain digits, spaces, hyphens, parentheses, and +" },
            { status: 400 }
          );
        }

        if (phoneDigits.length < 7) {
          return NextResponse.json(
            { error: "Phone number must be at least 7 digits" },
            { status: 400 }
          );
        }

        if (phoneDigits.length > 15) {
          return NextResponse.json(
            { error: "Phone number must be less than 15 digits" },
            { status: 400 }
          );
        }
      }
    }

    // Validate comment (optional but validate if provided)
    let trimmedComment = "";
    if (comment) {
      if (typeof comment !== "string") {
        return NextResponse.json(
          { error: "Comment must be a string" },
          { status: 400 }
        );
      }

      trimmedComment = comment.trim();
      if (trimmedComment) {
        if (trimmedComment.length < 10) {
          return NextResponse.json(
            { error: "Comment must be at least 10 characters" },
            { status: 400 }
          );
        }

        if (trimmedComment.length > 5000) {
          return NextResponse.json(
            { error: "Comment must be less than 5000 characters" },
            { status: 400 }
          );
        }
      }
    }

    // Store contact form data in Firestore
    const docRef = await addDoc(collection(db, "contacts"), {
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail.toLowerCase(),
      comment: trimmedComment,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Contact form submitted successfully",
        id: docRef.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error storing contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form. Please try again." },
      { status: 500 }
    );
  }
}

