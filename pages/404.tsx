import React from 'react';
import { useRouter } from 'next/router';

const Custom404: React.FC = () => {
    const router = useRouter();

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gradient text-center">
            <h1 className="text-3xl mb-4">The Page You are Looking for Does Not Exist</h1>
            <button
                onClick={handleBackToHome}
                className="px-4 py-2 bg-[#144EE3] border border-[#144EE3] text-gradient rounded hover:bg-white transition"
            >
                Back to Homepage
            </button>
        </div>
    );
};

export default Custom404;
