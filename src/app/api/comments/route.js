import { NextResponse } from 'next/server';
import prisma from '../../util/prisma'

// POST - Add a new review
export async function POST(request) {
  try {
    const data = await request.json();
    const { reviewid,userid,rating,comment,status } = data;


    // Create a new review in the database with 'pending' status
    const newReview = await prisma.comments.create({
      data: {
        reviewid: parseInt(reviewid),
        userid,
        rating: parseInt(rating),
        comment,
        status
      },
    });

    return NextResponse.json({
      status: 201,
      message: 'Review added successfully and is pending approval',
      data: newReview,
    });
  } catch (error) {
    console.error('Error creating review:', error); // Log full error message
    return NextResponse.json(
      { message: 'Failed to create review', error: error.message },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const reviews = await prisma.comments.findMany({
    
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { message: 'Failed to fetch reviews', error: error.message },
      { status: 500 }
    );
  }
}

