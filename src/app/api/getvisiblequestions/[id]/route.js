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
    const questions = await prisma.$queryRaw`
    SELECT id,qText
    FROM Question
    WHERE competitionId = ${parseInt(id, 10)} AND status = "Show"
  `;

  if (!questions || questions.length === 0) {
    return NextResponse.json({ message: "No questions found" }, { status: 404 });
  }

    // const question = await prisma.question.findMany({
    //   where: { competitionId: parseInt(id, 10), status: "Show" },
    //   include: {
    //     competition: true, 
    //   },
    // });

    console.log("Question:", questions);
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error Fetching Question:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
