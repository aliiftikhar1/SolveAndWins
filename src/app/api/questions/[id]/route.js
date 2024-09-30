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
      op1,
      op2,
      op3,
      op4,
      key,
    } = data;

    console.log(data);

    const updatedQuestion = await prisma.question.update({
      where: { id: parseInt(id, 10) },
      data: {
        competitionId: parseInt(competitionId, 10), // Ensure competitionId is an integer
        qText,
        op1,
        op2,
        op3,
        op4,
        key,
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
    const deletedQuestion = await prisma.question.delete({
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
  const { id } = params;
  try {
    const question = await prisma.question.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        competition: true, // Include the related competition details
      },
    });

    console.log("Question:", question);
    return NextResponse.json(question);
  } catch (error) {
    console.error("Error Fetching Question:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
