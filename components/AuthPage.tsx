import React, { useState } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Navbar from './Navbar';

const AuthPage = () => {
    const [activeForm, setActiveForm] = useState<'login' | 'signup' | 'none'>('none');

    const handleLoginClick = () => {
        setActiveForm('login');
    };

    const handleSignupClick = () => {
        setActiveForm('signup');
    };

    const handleCloseForm = () => {
        setActiveForm('none');
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Navbar */}
            <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center bg-gray-100 relative">
                {/* Main content takes 60% width when form is active */}
                <div className={`p-4 transition-all duration-500 ${activeForm !== 'none' ? 'w-[60%]' : 'w-full'}`}>
                    <h1 className="text-4xl font-bold">Welcome to Shorty</h1>
                    <p className="mt-2 text-gray-600">Your ultimate URL shortening service!</p>
                </div>

                {/* Sliding Form Area */}
                <div className={`absolute top-0 h-full bg-white shadow-lg transition-transform duration-500 right-0 w-[40%] ${activeForm === 'none' ? 'translate-x-full' : 'translate-x-0'}`}>
                    {activeForm === 'login' && (
                        <LoginForm onSwitchToSignup={handleSignupClick} activeForm={activeForm} />
                    )}
                    {activeForm === 'signup' && (
                        <SignupForm onSwitchToLogin={handleLoginClick} activeForm={activeForm} />
                    )}
                </div>
            </div>

            {/* Close Button for Forms */}
            {activeForm !== 'none' && (
                <button
                    onClick={handleCloseForm}
                    className="absolute top-4 right-4 text-gray-700 text-2xl"
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default AuthPage;
