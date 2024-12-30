import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import UrlShortener from '../components/UrlShortener';
import MarkdownEditor from '../components/MarkdownEditor';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

const HomePage = () => {
    const { data: session, status } = useSession();
    const [showEditor, setShowEditor] = useState(false);
    const [activeForm, setActiveForm] = useState<'login' | 'signup' | 'none'>('none');

    const handleLoginClick = () => setActiveForm('login');
    const handleSignupClick = () => setActiveForm('signup');
    const handleCloseForm = () => setActiveForm('none');
    const toggleEditor = () => setShowEditor(!showEditor);

    // Use effect to prevent body scrolling when form is active
    useEffect(() => {
        if (activeForm !== 'none') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [activeForm]);

    return (
        <Layout onLoginClick={handleLoginClick} onSignupClick={handleSignupClick}>
            <div className="pt-16 p-4 flex relative h-screen overflow-hidden">
                {/* Main Content */}
                <div
                    className={`flex-grow rounded-lg shadow-md transition-all duration-500 ${activeForm === 'none' ? 'w-full' : 'w-[60%]'
                        }`}
                >
                    {status === 'loading' ? (
                        <p>Loading...</p>
                    ) : status === 'unauthenticated' ? (
                        <p>Please log in to access the features.</p>
                    ) : (
                        <p className="text-gradient">Welcome Back, {session?.user?.name || 'User'}!</p>
                    )}
                    <UrlShortener />
                </div>

                {/* Sliding Login/Signup Form */}
                <div
                    className={`absolute top-0 h-full bg-white shadow-lg transition-transform duration-500 right-0 w-[40%] ${activeForm === 'none' ? 'translate-x-full' : 'translate-x-0'
                        }`}
                    style={{ overflow: 'hidden' }} // Prevent overflow inside the form container
                >
                    {activeForm === 'login' && (
                        <LoginForm onSwitchToSignup={handleSignupClick} activeForm={activeForm} />
                    )}
                    {activeForm === 'signup' && (
                        <SignupForm onSwitchToLogin={handleLoginClick} activeForm={activeForm} />
                    )}
                </div>

                {/* Close Button for Forms */}
                {activeForm !== 'none' && (
                    <button
                        onClick={handleCloseForm}
                        className="absolute top-10 right-4 text-gray-700 text-2xl z-50"
                    >
                        &times;
                    </button>
                )}
            </div>

            {/* Fixed button for showing/hiding the editor */}
            <button
                onClick={toggleEditor}
                className={`fixed bottom-4 right-4 p-3 rounded-md shadow-lg text-gradient transition-all duration-300 ${showEditor ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
                    }`}
            >
                {showEditor ? 'Hide Editor' : 'Show Editor'}
            </button>

            {showEditor && (
                <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="relative bg-white p-6 rounded-lg w-full max-w-4xl">
                        <button
                            onClick={toggleEditor}
                            className="absolute top-2 right-2 p-2 text-gray-700 hover:text-gray-900"
                        >
                            <i className="fa fa-times"></i>
                        </button>
                        <MarkdownEditor />
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default HomePage;
