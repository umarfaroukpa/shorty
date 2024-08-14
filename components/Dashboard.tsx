import React from 'react';
import { useSession } from 'next-auth/react';
import UrlShortener from './UrlShortener';
import Layout from './Layout';

const Dashboard = () => {
    const { data: session } = useSession();

    return (
        <Layout onLoginClick={() => { }} onSignupClick={() => { }}>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
                <h1 className="text-3xl font-bold mb-4">Welcome to SHORTY</h1>
                {session ? (
                    <>
                        <p className="text-lg mb-4">
                            Welcome back, {session.user.email}! You have {session.user.premium ? 'unlimited' : '20'} URL shortening services available.
                        </p>
                        <UrlShortener />
                    </>
                ) : (
                    <p className="text-lg">Welcome! Please sign in to access premium features.</p>
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
