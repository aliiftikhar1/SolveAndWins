import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id, 10);

    // Use Prisma's raw query to fetch comments with user details
    // Filter for status = 'active' and order by createdAt (newest first)
    const comments = await prisma.$queryRaw`
      SELECT c.*, u.fullname, u.email 
      FROM Comments c 
      JOIN User u ON c.userid = u.id
      WHERE c.reviewid = ${id}
      AND c.status = 'approved'
      ORDER BY c.createdAt DESC
    `;

    if (comments.length > 0) {
      return NextResponse.json(comments);
    } else {
      return NextResponse.json({ error: 'Video Comments not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching Comments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
