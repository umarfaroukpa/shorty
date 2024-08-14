import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Url {
    _id: string;
    shortUrl: string;
    originalUrl: string;
}

const Profile = () => {
    const { data: session, status } = useSession();
    const [urls, setUrls] = useState<Url[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;
        if (!session || !session.accessToken) {
            console.log('No session, redirecting...');
            router.push('/');
        } else {
            console.log('Session exists, fetching URLs...');
            fetchUrls(session);
        }
    }, [session, status, router]);

    const fetchUrls = async (session: any) => {
        try {
            const response = await axios.get('/api/url', {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                }
            });
            console.log('URLs fetched:', response.data.urls);
            setUrls(response.data.urls);
        } catch (error) {
            console.error('Error fetching URLs:', error);
        }
    };

    if (status === 'loading') {
        return <p className="text-center text-xl text-gradient">Loading...</p>;
    }

    return (
        <div className="min-h-screen p-6 bg-[#1E1E1E]">
            {session && (
                <div className="max-w-4xl mx-auto bg-[#144EE3] rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-gradient">Profile</h1>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gradient">User Details</h2>
                        <p className="text-gradient">Name: {session.user?.name}</p>
                        <p className="text-gradient">Email: {session.user?.email}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gradient">Your Shortened URLs</h2>
                        {urls.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {urls.map((url) => (
                                    <li key={url._id} className="mb-2">
                                        <a href={url.shortUrl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                            {url.shortUrl}
                                        </a>
                                        <p className="text-sm text-gray-500">{url.originalUrl}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gradient">You have not shortened any URLs yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
