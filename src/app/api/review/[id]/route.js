import { NextResponse } from "next/server";
import prisma from "../../../util/prisma";

// PUT: Update a result by ID
export async function PUT(request, { params }) {
  const { id } = params; // Result ID
  try {
    const data = await request.json();
    const {
      title,
      url
    } = data;

    console.log("Data received for update:", data);

    const updatedResult = await prisma.review.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        url
      },
    });

    return NextResponse.json(updatedResult);
  } catch (error) {
    console.error("Error Updating Result Record:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a result by ID
export async function DELETE(request, { params }) {
  const { id } = params; // Result ID
  try {
    const deletedResult = await prisma.review.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(deletedResult);
  } catch (error) {
    console.error("Error Deleting Result Record:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET: Retrieve a single result by ID
export async function GET(request, { params }) {
  console.log(params.id);
  const  id  = parseInt(params.id); // Result ID
  console.log("id",id);
  try {
    const result = await prisma.review.findUnique({
      where: { id: id },
    });

    if (!result) {
      return NextResponse.json(
        { message: "Result not found" },
        { status: 404 }
      );
    }

    console.log("Result of user:",params,"is", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error Fetching Result:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
