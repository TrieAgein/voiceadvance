"use client";
import React from 'react';
import styles from "./css/page.module.css";
import './globals.css';
import { useRouter } from 'next/router'; // Import the useRouter hook for page routing 

function login() {

    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.popupWindow}>
            <div className={styles.vaTitle}>
              <img className={styles.westernDigitalLogo} src="/images/icons/logo.svg" alt="Western Digital Logo" />
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
                <a style={{ fontSize: '75%' }} className={styles.link}>Forgot Password?</a>
              </p>
              {/* <button className={styles.loginButton} onClick={handleLogin}>Login</button>  */}
              <div className={styles.loginButton}>
                <button > Login</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}></div>
      </div>
    );
  }

    //   const router = useRouter()
   
  //   return (
  //     <button type="button" onClick={() => router.push('/home')}>
  //       Login
  //     </button>
  //   )
  // }
  // export  function Login() { // Renamed the component to follow naming conventions (use PascalCase)
  //   const router = useRouter(); // Get the router object
  
  //   // Function to handle login button click
  //   const handleLogin = () => {
  //     // Navigate to the login page when the login button is clicked
  //     router.push('/home');
  //   };