import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const ProfilePage = () => {
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
        <>
            <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
            <Profile />
            <Footer />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                {isLogin ? (
                    <LoginForm onSwitchToSignup={handleSignupClick} />
                ) : (
                    <SignupForm onSwitchToLogin={handleLoginClick} />
                )}
            </Modal>
        </>
    );
};

export default ProfilePage;
