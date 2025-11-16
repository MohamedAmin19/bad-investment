import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerInfo, items, total } = body;

    // Validate required fields
    if (!customerInfo || typeof customerInfo !== "object") {
      return NextResponse.json(
        { error: "Customer information is required" },
        { status: 400 }
      );
    }

    if (!customerInfo.name || typeof customerInfo.name !== "string" || customerInfo.name.trim() === "") {
      return NextResponse.json(
        { error: "Customer name is required" },
        { status: 400 }
      );
    }

    if (!customerInfo.email || typeof customerInfo.email !== "string") {
      return NextResponse.json(
        { error: "Customer email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order items are required" },
        { status: 400 }
      );
    }

    if (!total || typeof total !== "number" || total <= 0) {
      return NextResponse.json(
        { error: "Valid order total is required" },
        { status: 400 }
      );
    }

    // Validate each item
    for (const item of items) {
      if (!item.id || !item.name || typeof item.price !== "number" || typeof item.quantity !== "number") {
        return NextResponse.json(
          { error: "Invalid item data" },
          { status: 400 }
        );
      }
    }

    // Store order in Firestore
    const orderData = {
      customerInfo: {
        name: customerInfo.name.trim(),
        email: customerInfo.email.toLowerCase().trim(),
        phone: customerInfo.phone?.trim() || "",
        address: customerInfo.address?.trim() || "",
        city: customerInfo.city?.trim() || "",
      },
      items: items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || "",
      })),
      total: total,
      status: "pending", // pending, processing, shipped, delivered, cancelled
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "orders"), orderData);

    return NextResponse.json(
      { 
        success: true, 
        message: "Order created successfully",
        orderId: docRef.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}

