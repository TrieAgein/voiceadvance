import React from 'react';
import Image from "next/image";
import logo from './public/logo.svg';
import './css/page.css';

function login() {
  return (
    <>
      <div className="popup-window">
        <div className="va-title">
          <div className="western_digital-logo">
            <Image
              src={logo}
            />
          </div>
          VoiceAdvance
        </div> 
        <div style={{ width: 'fit-content', margin: 'auto' }}>
          <p style={{ fontSize: '38px' }}>Login</p>
          <p> 
            Email: <br />
            <input type="text" placeholder="username@company.com" />
          </p>
          <p>
            Password:<br />
            <input type="password" placeholder="Password" /><br />
            <a style={{ fontSize: '75%' }} className="link">Forgot Password?</a>
          </p>
          <div className="login-button">
            <a>Login</a>
          </div>
          </div>
        </div>
      <div className="footer"></div>
    </>
  );
}
