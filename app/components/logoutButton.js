import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const logoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        // This function handles logout and redirection
        await signOut({ redirect: true, callbackUrl: '/login' });
    };

    return (
        <a className="logout-button" onClick={handleLogout}>Logout</a>
    );
};

export default logoutButton;
