import React from 'react';
import { useSession } from 'next-auth/react';
import UrlShortener from '../components/UrlShortener';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';

const DashboardPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    };

    const handleSignupClick = () => {
        router.push('/signup');
    };

    return (
        <>
            <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
            <div className="p-4">
                <h1 className="text-2xl font-bold text-gradient">Welcome to SHORTY</h1>
                {session ? (
                    <>
                        <p className="text-gradient">Welcome back to SHORTY {session.user.name}! Enjoy Our Numerous Servicess.</p>
                        <UrlShortener />
                        <footer />
                    </>
                ) : (
                    <p className="text-gradient">Welcome! Please sign in to access premium features.</p>
                )}
            </div>
        </>
    );
};

export default DashboardPage;
