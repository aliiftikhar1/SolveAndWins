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
    const prizes = await prisma.prize.findMany();
    return NextResponse.json(prizes);
  } catch (error) {
    console.error("Error Fetching Prizes:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
