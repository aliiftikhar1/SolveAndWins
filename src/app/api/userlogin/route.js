// src/app/api/login/route.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request) {
  const data = await request.json();
  const { email, password } = data;
  console.log("Email:", email, "Password:", password);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    // Check if user status is 'Active'
    if (user.status !== 'Active') {
      return NextResponse.json(
        { message: "Account is not active. Please verify your email or contact support." },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    console.log("Email:", user.email, "Name:", user.name, "User ID:", user.id);

    const token = jwt.sign(
      { email: user.email, name: user.name, id: user.id },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    console.log("Generated Token:", token);

    return NextResponse.json(
      {
        status: 200,
        message: "Login successful",
        token,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
