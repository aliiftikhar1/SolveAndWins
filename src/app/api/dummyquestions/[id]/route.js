import { NextResponse } from "next/server";
import prisma from "../../../util/prisma";

// PUT: Update a question by ID
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    const {
      competitionId,
      qText,
    } = data;

    console.log(data);

    const updatedQuestion = await prisma.Dummyquestions.update({
      where: { id: parseInt(id, 10) },
      data: {
        competitionId: parseInt(competitionId, 10), // Ensure competitionId is an integer
        qText,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error("Error Updating Question Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Delete a question by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const deletedQuestion = await prisma.Dummyquestions.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(deletedQuestion);
  } catch (error) {
    console.error("Error Deleting Question Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Retrieve a single question by ID
export async function GET(request, { params }) {
  const { id } = params; // This is the competitionId
  try {
    // Using a raw SQL query to fetch all questions for the given competitionId
    const questions = await prisma.$queryRaw`
      SELECT *
      FROM Dummyquestions
      WHERE competitionId = ${parseInt(id, 10)}
    `;

    if (!questions || questions.length === 0) {
      return NextResponse.json({ message: "No questions found" }, { status: 404 });
    }

    console.log("Questions:", questions);
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error Fetching Questions:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}