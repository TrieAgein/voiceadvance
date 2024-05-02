import React, { useState, useEffect } from 'react';
import crypto from 'crypto';
import { useRouter } from 'next/router';
import Image from "next/image";
import '../app/css/page.css';
import logo from '../app/public/logo.svg'; // Adjust the path if necessary
import CreateUser from '../app/components/createUser.js';
import { signIn, useSession, signOut } from 'next-auth/react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            console.log(session.user);
            // Check the role of the user and redirect accordingly
            switch(session.user.role) {
                case 'Employee':
                    router.replace('/dashboard'); // Redirect to Employee dashboard
                    break;
                case 'Resolver':
                    router.replace('/resolver'); // Redirect to Resolver dashboard
                    break;
                default:
                    // Optionally handle other roles or default case
                    router.replace('/login');
                    break;
            }
        }
    }, [session, router]);

    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent the form from submitting traditionally

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (result.error) {
            alert(result.error);
        } else {
            // Check if the session is updated, then access it
            setTimeout(() => {
                if (session) {
                    localStorage.setItem('userId', session.user.id);
                    router.replace('/dashboard');
                }
            }, 1000); // Delay to wait for session update, adjust as needed
        }
    };

    return (
        <div className="popup-window">
            <div className="va-title">
                <Image src={logo} alt="Logo" width={50} height={50} />
                VoiceAdvance
            </div>
            <div style={{ width: 'fit-content', margin: 'auto' }}>
                <p style={{ fontSize: '38px' }}>Login</p>
                <form onSubmit={handleLogin}>
                    <p>Email:<br />
                        <input
                            type="email"
                            placeholder="username@company.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </p>
                    <p>Password:<br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <a style={{ fontSize: '75%' }} className="link">Forgot Password?</a>
                    </p>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            <div className="footer"></div>
        </div>
    );
}

export default Login;
