import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma'

// DELETE - Delete a review by ID
export async function DELETE(request,{params}) {
    try {
      const id = params.id;
  
      if (!id) {
        return NextResponse.json({ message: 'Review ID is required' }, { status: 400 });
      }
  
      const deletedReview = await prisma.comments.delete({
        where: { id: Number(id) },
      });
  
      return NextResponse.json({
        status: 200,
        message: 'Review deleted successfully',
        data: deletedReview,
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      return NextResponse.json(
        { message: 'Failed to delete review', error: error.message },
        { status: 500 }
      );
    }
  }

  // PUT - Approve or update a review by ID
export async function PUT(request,{params}) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ message: 'Review ID is required' }, { status: 400 });
    }

    const data = await request.json();

    const updatedReview = await prisma.comments.update({
      where: { id: Number(id) },
      data: {
        reviewid:data.reviewid,
        userid:data.userid,
        rating:parseInt(data.rating),
        comment:data.comment,
        status:data.status
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'Review updated successfully',
      data: updatedReview,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { message: 'Failed to update review', error: error.message },
      { status: 500 }
    );
  }
}
