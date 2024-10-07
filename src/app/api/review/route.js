import { NextResponse } from "next/server";
import prisma from "../../util/prisma";

// POST: Create a new result
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      title,
      url
    } = data;

    // Create a new result entry in the database
    const review = await prisma.review.create({
      data: {
        title,
      url
      },
    });

    console.log("New Result Created:", review);
    return NextResponse.json(review);
  } catch (error) {
    console.error("Error Creating Result Record:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET: Retrieve all results
export async function GET() {
  try {
    const results = await prisma.review.findMany();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error Fetching Results:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
