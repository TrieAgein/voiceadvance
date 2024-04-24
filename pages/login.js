import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import logo from '../app/public/logo.svg';
import '../app/css/page.css';
import { signIn, useSession } from 'next-auth/react';

const Login = () => {
    const router = useRouter(); // Correct placement of useRouter
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { data: session } = useSession();

    if (session) {
      return (
        <>
          <p>Welcome, {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      );
    }

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        
        try {
            const response = await fetch('/api/loginRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful');
                router.replace('/dashboard');  // Use the router here directly
            } else {
                throw new Error(data.message || 'Failed to login');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div className="popup-window">
                <div className="va-title">
                    <div className="western_digital-logo">
                        <Image
                            src={logo}
                            width="50"
                            margin="5"
                            alt="Logo"
                        />
                    </div>
                    VoiceAdvance
                </div> 
      <p>You are not signed in.</p>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
                {/* <div style={{ width: 'fit-content', margin: 'auto' }}>
                    <p style={{ fontSize: '38px' }}>Login</p>
                    <p> 
                        Email: <br />
                        <input
                            type="text"
                            placeholder="username@company.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </p>
                    <p>
                        Password:<br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        /><br />
                        <a style={{ fontSize: '75%' }} className="link">Forgot Password?</a>
                    </p>
                    <div className="login-button">
                        <button onClick={handleLogin}>Login</button>
                    </div> */}
                </div>
            {/* </div> */}
            <div className="footer"></div>
        </>
    );
}

export default Login;
