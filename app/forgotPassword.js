import React from 'react';
import Image from "next/image";
import forgot from './public/forgot.svg';

export default function forgotPassword() {
    return (
      <>
        <div className="forgot-window">
          <div className="forgot-icon">
            <Image
              src={forgot}
            />
          </div>
          <p className="forgot-title">Forgot Password?</p>
          <p style={{ fontSize: '15px' }}>Enter your email and we'll send you a link to reset your password.</p>
          <p> Email: <input type="text" placeholder="Enter your email" />
          </p>
          <div className="forgot-button">
            <a>Submit</a>
          </div>
        </div>
      </>
    );
  }
