import { NextResponse } from "next/server";
import prisma from "../../../util/prisma";

// PUT: Update a competition by ID
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    const {
      title,
      description,
      image,
      status,
      startedAt,
      endedAt
    } = data;

    console.log(data);

    const updatedCompetition = await prisma.competition.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        description,
        image,
        status,
        startedAt: new Date(startedAt), // Ensure date conversion
        endedAt: new Date(endedAt), // Ensure date conversion
        updatedAt: new Date(),
      },
    });

    console.log("Updated Record",updatedCompetition);

    return NextResponse.json(updatedCompetition);
  } catch (error) {
    console.error("Error Updating Competition Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Delete a competition by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const deletedCompetition = await prisma.competition.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(deletedCompetition);
  } catch (error) {
    console.error("Error Deleting Competition Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Retrieve a single competition by ID
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const competition = await prisma.competition.findUnique({
      where: { id: parseInt(id, 10) },
    });

    console.log("Competition:", competition);
    return NextResponse.json(competition);
  } catch (error) {
    console.error("Error Fetching Competition:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
