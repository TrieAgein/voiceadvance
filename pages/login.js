import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from "next/image";
import CreateUser from '../app/components/createUser';
import '../app/css/page.css';
import logo from '../app/public/logo.svg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data: session, status } = useSession(); // Include status to check if the session is loading
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return; // Return early if the session is loading

        if (status === 'unauthenticated') {
            // Redirect to login only if not already on the login page
            if (router.pathname !== '/login') {
                router.replace('/login');
            }
            return;
        }

        if (status === 'authenticated') {
            // Handling based on user role
            switch(session.user.role) {
                case 'Employee':
                    // Redirect to dashboard only if not already there
                    if (router.pathname !== '/dashboard') {
                        router.replace('/dashboard');
                    }
                    break;
                case 'Resolver':
                    // Redirect to dashboard only if not already there
                    if (router.pathname !== '/resolver') {
                        router.replace('/resolver');
                    }
                    break;
                default:
                    // Sign out if the role is not allowed
                    signOut();
                    // Optionally redirect to a "not authorized" page or back to login
                    router.replace('/login');
                    break;
            }
        }
    }, [status, router]); // React only on changes in status or router path

    // Content to render based on conditions
    if (status === 'loading') {
        return <div>Loading...</div>; // Show loading indicator
    }
    

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (result.error) {
            alert(result.error);
        }
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

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
                    </p>
                    <button type="submit" className="login-button">Login</button>
                    <CreateUser/>
                </form>
            </div>
        </div>
    );
}

export default Login;
