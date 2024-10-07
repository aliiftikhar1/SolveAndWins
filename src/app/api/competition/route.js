import { NextResponse } from "next/server";
import prisma from "../../util/prisma";

// POST: Create a new competition
export async function POST(request) {
  try {
    const data = await request.json();
    const { 
      title, 
      description, 
      image,
      status,
      start,
      duration,
      startedAt, 
      endedAt 
    } = data;

    // Create a new competition entry in the database
    const newCompetition = await prisma.competition.create({
      data: {
        title,
        description,
        image,
        status,
        start,
        duration,
        startedAt: new Date(startedAt), // Ensure date conversion
        endedAt: new Date(endedAt), // Ensure date conversion
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(newCompetition);
    return NextResponse.json(newCompetition);
  } catch (error) {
    console.error("Error Creating Competition Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Retrieve all competitions
export async function GET() {
  try {
    const competitions = await prisma.competition.findMany();
    return NextResponse.json(competitions);
  } catch (error) {
    console.error("Error Fetching Competitions:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
