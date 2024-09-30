// pages/api/User/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';
import bcrypt from 'bcryptjs'; 

// GET request to fetch an User user by ID
export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const User = await prisma.User.findUnique({ where: { id } });
    if (User) {
      return NextResponse.json(User);
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching User user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT request to update an User user by ID
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();
    const { fullname, email, password, address, fathername, education, institute, dob, city, province, fbProfile, tiktok, whatsappNo, country } = body;

    const User = await prisma.User.findUnique({ where: { id } });
    if (!User) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update password only if a new one is provided
    let hashedPassword = User.password;
    if (password && password !== User.password) {
      const salt = bcrypt.genSaltSync(10);
      hashedPassword = bcrypt.hashSync(password, salt);
    }

    // Update User user with the new details
    const updatedUser = await prisma.User.update({
      where: { id },
      data: {
        fullname,
        email,
        password: hashedPassword,
        address,
        fathername,
        education,
        institute,
        dob: new Date(dob), // Ensure dob is stored as a Date object
        city,
        province,
        fbProfile,
        tiktok,
        whatsappNo,
        country,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating User user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE request to delete an User user by ID
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await prisma.User.delete({ where: { id } });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting User user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
