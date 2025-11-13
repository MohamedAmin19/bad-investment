import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, submissionType, name, phone, email, artist, profile } = body;

    // Validate role
    if (!role || typeof role !== "string") {
      return NextResponse.json(
        { error: "Role is required" },
        { status: 400 }
      );
    }

    if (role !== "business" && role !== "artist") {
      return NextResponse.json(
        { error: "Role must be either 'business' or 'artist'" },
        { status: 400 }
      );
    }

    // Validate submissionType
    let trimmedSubmissionType = "company"; // default
    if (submissionType) {
      if (typeof submissionType !== "string") {
        return NextResponse.json(
          { error: "Submission type must be a string" },
          { status: 400 }
        );
      }
      const trimmed = submissionType.trim().toLowerCase();
      if (trimmed === "individual" || trimmed === "company") {
        trimmedSubmissionType = trimmed;
      }
    }

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

    // Validate artist/band name (optional but validate if provided)
    let trimmedArtist = "";
    if (artist) {
      if (typeof artist !== "string") {
        return NextResponse.json(
          { error: "Artist/Band name must be a string" },
          { status: 400 }
        );
      }

      trimmedArtist = artist.trim();
      if (trimmedArtist && trimmedArtist.length > 200) {
        return NextResponse.json(
          { error: "Artist/Band name must be less than 200 characters" },
          { status: 400 }
        );
      }
    }

    // Validate profile (optional but validate if provided)
    let trimmedProfile = "";
    if (profile) {
      if (typeof profile !== "string") {
        return NextResponse.json(
          { error: "Music profile must be a string" },
          { status: 400 }
        );
      }

      trimmedProfile = profile.trim();
      if (trimmedProfile && trimmedProfile.length > 5000) {
        return NextResponse.json(
          { error: "Music profile must be less than 5000 characters" },
          { status: 400 }
        );
      }
    }

    // Store submission data in Firestore
    const docRef = await addDoc(collection(db, "submissions"), {
      role: role,
      submissionType: trimmedSubmissionType,
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail.toLowerCase(),
      artist: trimmedArtist,
      profile: trimmedProfile,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Music submission received successfully",
        id: docRef.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error storing music submission:", error);
    return NextResponse.json(
      { error: "Failed to submit music. Please try again." },
      { status: 500 }
    );
  }
}

