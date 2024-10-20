import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';

// Fetch a specific blog slider by ID
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const blogSlider = await prisma.BlogSlider.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!blogSlider) {
      return NextResponse.json({ error: 'Blog slider not found' }, { status: 404 });
    }

    return NextResponse.json(blogSlider);
  } catch (error) {
    console.error('Error fetching blog slider:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Update a specific blog slider by ID
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    const { title } = data;

    const updatedBlogSlider = await prisma.BlogSlider.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedBlogSlider);
  } catch (error) {
    console.error('Error updating blog slider:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Delete a specific blog slider by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await prisma.BlogSlider.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ message: 'Blog slider deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog slider:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
