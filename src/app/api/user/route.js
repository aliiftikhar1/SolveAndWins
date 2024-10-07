import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '../../util/senduserverificationemail'

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
      fullname,
      email,
      password,
      status,
      address,
      fathername,
      education,
      institute,
      dob,
      city,
      province,
      // fbProfile,
      // tiktok,
      image,
      whatsappNo,
      country,
    } = body;

    
    const salt = bcrypt.genSaltSync(10); 
    const hashedPassword = bcrypt.hashSync(password, salt); 

    
    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword, 
        address,
        fathername,
        education,
        institute,
        dob: dob ? new Date(dob) : null,
        city,
        province,
        // fbProfile,
        // tiktok,
        whatsappNo,
        status,
        country,
        image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (status !== 'Active'){

      // Generate a random verification number (e.g., 6-digit number)
    const verificationNumber = Math.floor(100000 + Math.random() * 900000);

    // Create a verification record linked to the new user
    const verification = await prisma.Verification.create({
      data: {
        userId: newUser.id,
        verified: false, // Use boolean value
        verificationNo: verificationNumber,
      },
    });

    if(verification){
      console.log("verification number saved!!!");
      await sendVerificationEmail(email, verification.verificationNo);
    }
    
    return NextResponse.json({ newUser, verification });

    }
    else{
      return NextResponse.json({ newUser });
    }
    
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      {
        message: 'Failed to create user',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// GET request to fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    const verification = await prisma.verification.findMany();
    console.log(verification);
    return NextResponse.json(users,verification);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch users',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
