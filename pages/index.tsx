import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Modal from '../components/Modal';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Navbar from '../components/Navbar';
import UrlShortener from '../components/UrlShortener';

const HomePage = () => {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleLoginClick = () => {
        setIsLogin(true);
        setShowModal(true);
    };

    const handleSignupClick = () => {
        setIsLogin(false);
        setShowModal(true);
    };


    return (
        <div>
            <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
            <div className="p-4">
                {session ? (
                    <div className="p-4 rounded-lg shadow-md ">
                        <p className="text-gradient">Welcome Back, {session.user?.name || 'User'}</p>
                        <UrlShortener />
                    </div>
                ) : (
                    <div className="text-center p-8 rounded-lg max-w-lg mx-auto">
                        <h1 className="text-4xl font-bold mb-2 text-gradient">Welcome To The Best URL Shortener!</h1>
                    </div>
                )}
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                {isLogin ? <LoginForm onSwitchToSignup={handleSignupClick} /> : <SignupForm onSwitchToLogin={handleLoginClick} />}
            </Modal>
        </div>
    );
};

export default HomePage;
