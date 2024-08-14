import React from 'react';

const Loading: React.FC = () => {
    console.log("Loading component rendered");
    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
    );
};

export default Loading;
