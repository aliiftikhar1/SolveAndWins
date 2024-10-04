'use client';

import { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function VerificationSuccess() {
  useEffect(() => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: '<strong>Email Verified!</strong>',
      html: 'Your email has been verified successfully.',
      icon: 'success',
      confirmButtonText: 'Go to Login',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      customClass: {
        confirmButton: 'swal-button',
        popup: 'swal-popup',
        title: 'swal-title',
        htmlContainer: 'swal-html',
      },
      background: '#f0f9ff',
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    }).then(() => {
      window.location.href = '/login';
    });
  }, []);

  return null; 
}
