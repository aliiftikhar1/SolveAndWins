import { NextResponse } from 'next/server';
import prisma from "../../util/prisma";

// GET request to verify email
export async function GET(request, {params}) {
    
  try {
    const token = params;
console.log("TOken",params);
    if (!token) {
      return NextResponse.json(
        { message: 'Verification token is required.' },
        { status: 400 }
      );
    }

    const verificationNumber = parseInt(token, 10);

    // Find the verification record with the given token and not yet verified
    const verification = await prisma.verification.findFirst({
      where: {
        verificationNo: verificationNumber,
        verified: false,
      },
      include: {
        user: true,
      },
    });

    if (!verification) {
      return NextResponse.json(
        { message: 'Invalid or expired verification token.' },
        { status: 400 }
      );
    }

    // Update the verification record to set verified to true
    await prisma.verification.update({
      where: {
        id: verification.id,
      },
      data: {
        verified: true,
      },
    });

    // Optionally, update the user's status to 'Active'
    await prisma.user.update({
      where: {
        id: verification.userId,
      },
      data: {
        status: 'Active',
      },
    });

    return NextResponse.json(
      { message: 'Email verified successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      {
        message: 'Failed to verify email.',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
