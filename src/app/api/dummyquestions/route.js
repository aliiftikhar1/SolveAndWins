import { NextResponse } from "next/server";
import prisma from "../../util/prisma";

// POST: Create a new question
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      competitionId,
      qText,
    } = data;

    // Create a new question entry in the database
    const newQuestion = await prisma.Dummyquestions.create({
      data: {
        competitionId: parseInt(competitionId, 10), // Ensure competitionId is an integer
        qText,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(newQuestion);
    return NextResponse.json(newQuestion);
  } catch (error) {
    console.error("Error Creating Question Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Retrieve all questions
export async function GET() {
  try {
    const questions = await prisma.Dummyquestions.findMany({
      include: {
        competition: true, // Include related competition data
      },
    });
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error Fetching Questions:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
