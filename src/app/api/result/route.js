import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';

// Create a new result record
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      competitionId,
      userId,
      noOfQuestions,
      correctAnswers,
      score,
      timeAttempted
    } = data;

    // Validate required fields
    if (!competitionId || !userId || !noOfQuestions || !correctAnswers || !score || !timeAttempted) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create a new result record in the database
    const newResult = await prisma.result.create({
      data: {
        competitionId,
        userId,
        noOfQuestions,
        correctAnswers,
        score,
        timeAttempted: new Date(timeAttempted),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(newResult);
  } catch (error) {
    console.error('Error Creating Result Record:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Fetch all result records
export async function GET() {
  try {
    const results = await prisma.result.findMany({
      include: {
        competition: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Order by createdAt field in descending order
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
