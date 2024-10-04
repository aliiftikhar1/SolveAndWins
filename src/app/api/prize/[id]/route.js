import { NextResponse } from "next/server";
import prisma from "../../../util/prisma";

// PUT: Update a prize by ID
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    const { title, description, image } = data;

    console.log(data);

    const updatedPrize = await prisma.prize.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        description,
        image,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedPrize);
  } catch (error) {
    console.error("Error Updating Prize Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Delete a prize by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const deletedPrize = await prisma.prize.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(deletedPrize);
  } catch (error) {
    console.error("Error Deleting Prize Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Retrieve a single prize by ID
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const prize = await prisma.prize.findUnique({
      where: { id: parseInt(id, 10) },
    });

    console.log("Prize:", prize);
    return NextResponse.json(prize);
  } catch (error) {
    console.error("Error Fetching Prize:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
