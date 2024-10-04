import { NextResponse } from "next/server";
import prisma from "../../util/prisma";

// POST: Create a new prize
export async function POST(request) {
  try {
    const data = await request.json();
    const { title, description, image } = data;

    // Create a new prize entry in the database
    const newPrize = await prisma.prize.create({
      data: {
        title,
        description,
        image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(newPrize);
    return NextResponse.json(newPrize);
  } catch (error) {
    console.error("Error Creating Prize Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Retrieve all prizes
export async function GET() {
  try {
    // Raw SQL query to fetch competitions with status 'featured'
    const featuredCompetitions = await prisma.$queryRaw`
      SELECT * FROM Competition WHERE status = ${'featured'}
    `;

    return NextResponse.json(featuredCompetitions);
  } catch (error) {
    console.error("Error Fetching Featured Competitions:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}