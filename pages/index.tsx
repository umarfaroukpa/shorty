import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Modal from '../components/Modal';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Navbar from '../components/Navbar';
import UrlShortener from '../components/UrlShortener';
import Features from '../components/Features';
import SlidingText from '../components/SlidingText';
import Brand from '@/components/Brand';
import MarkdownEditor from '@/components/MarkdownEditor';

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
        <div>
            <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
            <div className="pt-16 p-4"> {/* Add padding-top to account for sticky Navbar */}
                <div className="p-4 rounded-lg shadow-md">
                    {session ? (
                        <p className="text-gradient">Welcome Back, {session.user?.name || 'User'}</p>
                    ) : (
                        <div className="relative w-full">
                            <img
                                src="/tablet-with-annual-report-removebg-preview.png"
                                alt="Hero Image"
                                className="absolute top-0 left-0 w-full h-full object-cover size-fit opacity-40 bg-no-repeat"
                                style={{ zIndex: -1 }}
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
                    <button
                        onClick={toggleEditor}
                        className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                    >
                        {showEditor ? 'Hide Editor' : 'Show Editor'}
                    </button>
                    {showEditor && <MarkdownEditor />}
                </div>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                {isLogin ? <LoginForm onSwitchToSignup={handleSignupClick} /> : <SignupForm onSwitchToLogin={handleLoginClick} />}
            </Modal>
        </div>
    );
};

export default HomePage;
