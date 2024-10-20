import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';
// Create a new blog record
export async function POST(request) {
  try {
    const data = await request.json();
    const { title } = data;
console.log(
  "data received: ",data
);
    // Create a new blog record in the database
    const newBlog = await prisma.BlogSlider.create({
      data: {
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(newBlog);
  } catch (error) {
    console.error('Error Creating Blog Record:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Fetch all blog records
// Fetch the latest blog record (or the user's selected category)
export async function GET() {
    try {
      // Assuming only one category is saved at a time
      const selectedBlog = await prisma.BlogSlider.findFirst({
        orderBy: {
          createdAt: 'desc', // Get the latest selected category
        },
      });
  
      return NextResponse.json(selectedBlog || {}); // Return an empty object if no category is found
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  
