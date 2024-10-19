import { NextResponse } from 'next/server';
import prisma from "../../../util/prisma";

// GET request to verify email
export async function GET(request, { params }) {
  try {
    const { id: token } = params;
    console.log("Token:", token);

    if (!token) {
      console.log("Token is not available!!!!");
      return NextResponse.redirect('/verification/error');
    }

    const verificationNumber = parseInt(token, 10);

    if (isNaN(verificationNumber)) {
      console.log("Invalid verification number");
      return NextResponse.redirect('/verification/error');
    }

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
      console.log("Error while while verifying the token!!");
      return NextResponse.redirect('/verification/error');
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

    // Update the user's status to 'Active'
    await prisma.user.update({
      where: {
        id: verification.userId,
      },
      data: {
        status: 'Active',
      },
    });

    // Redirect to success page
    return NextResponse.redirect('/verification/success');
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.redirect('/verification/error');
  }
}
