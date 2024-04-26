import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import '../app/css/page.css';
import logo from '../app/public/logo.svg'; // Adjust the path if necessary
import { signIn, useSession, signOut } from 'next-auth/react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Redirect if already logged in
        if (session) {
            router.replace('/dashboard'); // Redirect to dashboard or other intended page
        }
    }, [session, router]);

    const handleLogin = async (e) => {
        e.preventDefault();  // To prevent the form from submitting traditionally

        // NextAuth signIn with "credentials" provider
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (result.error) {
            alert(result.error);
        } else if (result.status === 200) {
            router.replace('/dashboard');
        }
    };

    return (
        <div className="popup-window">
            <div className="va-title"><Image src={logo} alt="Logo"/>VoiceAdvance</div> 
            <div style={{ width: 'fit-content', margin: 'auto' }}>
                <p style={{ fontSize: '38px' }}>Login</p>
                <form onSubmit={handleLogin}>
                    <p>
                        Email:<br />
                        <input
                            type="email"
                            placeholder="username@company.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </p>
                    <p>
                        Password:<br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        /><br />
                        <a style={{ fontSize: '75%' }} className="link">Forgot Password?</a>
                    </p>
                        <button className="login-button" onClick={handleLogin}>Login</button>
                </form>
                {/* OAuth Providers */}
                {/* <div>
                    <button onClick={() => signIn('google')}>Sign in with Google</button>
                    {/* Add more OAuth provider buttons as needed 
                </div> */}
            </div>
            <div className="footer"></div>
        </div>
    );
}

export default Login;
