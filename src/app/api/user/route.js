import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';
import bcrypt from 'bcryptjs';

// POST request to create a new User user
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
    const { fullname, email, password, address, fathername, education, institute, dob, city, province, fbProfile, tiktok, whatsappNo, country } = body;

    // Hash the password using bcryptjs
    const salt = bcrypt.genSaltSync(10); // Generate a salt
    const hashedPassword = bcrypt.hashSync(password, salt); // Hash the password

    // Create new user with all the required fields
    const newUser = await prisma.User.create({
      data: {
        fullname,
        email,
        password: hashedPassword, // Save the hashed password
        address,
        fathername,
        education,
        institute,
        dob: new Date(dob), // Convert dob to Date object
        city,
        province,
        fbProfile,
        tiktok,
        whatsappNo,
        country,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    return NextResponse.json(newUser);
  } 
  catch (error) {
    console.error('Error creating User:', error);
    return NextResponse.json(
      {
        message: 'Failed to create User',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// GET request to fetch all User users
export async function GET() {
  try {
    const users = await prisma.User.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch users',
        status: false,
        error: error.message,
      },
      {
        status: 500
      }
    );
  }
}
