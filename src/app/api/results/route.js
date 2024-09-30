import { NextResponse } from "next/server";
import prisma from "../../util/prisma";

// POST: Create a new result
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      competitionId,
      userId,
      noOfQuestions,
      correctAnswers,
      score,
      timeAttempted,
    } = data;

    // Create a new result entry in the database
    const newResult = await prisma.result.create({
      data: {
        competitionId: parseInt(competitionId, 10), // Ensure competitionId is an integer
        userId: parseInt(userId, 10), // Ensure userId is an integer
        noOfQuestions: parseInt(noOfQuestions, 10),
        correctAnswers: parseInt(correctAnswers, 10),
        score: parseFloat(score),
        timeAttempted: new Date(timeAttempted),
        // createdAt and updatedAt are automatically handled by Prisma
      },
    });

    console.log("New Result Created:", newResult);
    return NextResponse.json(newResult);
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
    const results = await prisma.result.findMany({
      include: {
        competition: true, // Include related competition data
        user: true,        // Include related user data
      },
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error Fetching Results:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
