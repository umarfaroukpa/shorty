import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Modal from '../components/Modal';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Layout from '../components/Layout';
import UrlShortener from '../components/UrlShortener';
import Features from '../components/Features';
import SlidingText from '../components/SlidingText';
import CustomerReviews from '../components/Review';
import Brand from '../components/Brand';
import MarkdownEditor from '../components/MarkdownEditor';
import Image from 'next/image';


const HomePage = () => {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [showEditor, setShowEditor] = useState(false);

    const handleLoginClick = () => {
        setIsLogin(true);
        setShowModal(true);
    };

    const handleSignupClick = () => {
        setIsLogin(false);
        setShowModal(true);
    };

    const toggleEditor = () => {
        setShowEditor(!showEditor);
    };

    return (
        <Layout onLoginClick={handleLoginClick} onSignupClick={handleSignupClick}>
            <div className="pt-16 p-4">
                <div className="p-4 rounded-lg shadow-md">
                    {session ? (
                        <p className="text-gradient">Welcome Back, {session.user?.name || 'User'}</p>
                    ) : (
                        <div className="relative w-full">
                            <Image
                                src="/tablet-with-annual-report-removebg-preview.png"
                                alt="Hero Image"
                                width={800}
                                height={600}
                                className="absolute top-0 left-0 w-full h-full object-cover size-fit opacity-40 bg-no-repeat"
                                style={{ zIndex: -1 }}
                                priority // Add the priority property here
                            />
                            <div className="relative flex flex-col md:flex-row items-center justify-center rounded-lg max-w-5xl mx-auto p-8">
                                <div className="md:flex-1 text-center md:text-left mb-4 md:mb-0 p-8">
                                    <SlidingText />
                                </div>
                            </div>
                        </div>
                    )}
                    <UrlShortener />
                    <Features />
                    <Brand />
                    <CustomerReviews />
                </div>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                {isLogin ? <LoginForm onSwitchToSignup={handleSignupClick} /> : <SignupForm onSwitchToLogin={handleLoginClick} />}
            </Modal>
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
