'use client';

import { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function VerificationError() {
  useEffect(() => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: '<strong>Email Verification Error</strong>',
      html: 'There was an issue verifying your email. Please try again or contact support.',
      icon: 'error',
      confirmButtonText: 'Try Again',
      showClass: {
        popup: 'animate__animated animate__shakeX', // Error animation
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      customClass: {
        confirmButton: 'swal-button swal-button-error',
        popup: 'swal-popup-error',
        title: 'swal-title-error',
        htmlContainer: 'swal-html-error',
      },
      background: '#ffe6e6', // Red-tinted background for error
      backdrop: `
        rgba(255,0,0,0.4)
      `,
    }).then(() => {
      window.location.href = '/verify'; // Redirect to email verification page
    });
  }, []);

  return null; 
}
