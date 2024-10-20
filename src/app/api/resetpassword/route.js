import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';
import bcrypt from 'bcryptjs';

// POST request to create a new User
export async function POST(request) {
  if (request.method === 'OPTIONS') {
    const headers = {
      'Access-Control-Allow-Origin': '*', // Change to your frontend URL in production
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    return new Response(null, { status: 204, headers });
  }

  try {
    const body = await request.json();
    const {
      email,
      newPassword
    } = body;

    
    const salt = bcrypt.genSaltSync(10); 
    const hashedPassword = bcrypt.hashSync(newPassword, salt); 

    
    const newUser = await prisma.user.update({
      where:{email},
      data: {
        password: hashedPassword, 
        updatedAt: new Date(),
      },
    });


    return NextResponse.json({ newUser });

    
  } catch (error) {
    console.error('Error updating password :', error);
    return NextResponse.json(
      {
        message: 'Failed to update password.',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
