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
  console.log("email: ", email, "password: ", password);

  try {
    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        message: "User does not exist"
      }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        message: "Invalid Password"
      }, { status: 401 });
    }

    
    console.log("Email:",user.email,"Name:", user.name, "Role:",user.role,"user id:",user.id);
    const token = jwt.sign({ email: user.email, name: user.name, role: user.role, id: user.id }, SECRET_KEY,
      { expiresIn: '1h' }
    );
    
    console.log("Generated Token:", token); // Add this line to check the token content
    
//     const decodedToken = jwt.decode(token);
// console.log("Decoded Token:", decodedToken);

    return NextResponse.json({
      status: 200,
      message: "Login Successfully",
      token
    });
    
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
