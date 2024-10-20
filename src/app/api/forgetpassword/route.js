import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';
import { sendPasswordResetEmail } from '../../util/sendforgetpasswordemail'; // Import your email function

// POST request to trigger password reset email
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
    const { email } = body;

    console.log("Email to be reset is id: ", email);

    // Validate if the email exists in the database
    const user = await prisma.user.findMany({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: 'No user found with this email',
          status: false,
        },
        { status: 404 }
      );
    }
    // Call your email sending function
    console.log("Email is going to send....")
    try {
        const sendemail =  await sendPasswordResetEmail(email); // Make sure to pass the token to the email

        if(sendemail){
            console.log("email send successfully");
        return NextResponse.json(
          {
            message: 'Password reset email sent successfully',
            status: true,
          },
          { status: 200 }
        );
    }else{
        console.log("Email is not sent")
    }
        
    } catch (error) {
     
        console.error('Error sending password reset email:', error);
        return NextResponse.json(
          {
            message: 'Failed to send password reset email',
            status: false,
            error: error.message,
          },
          { status: 500 }
        );
    }
   
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return NextResponse.json(
      {
        message: 'Failed to send password reset email',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
