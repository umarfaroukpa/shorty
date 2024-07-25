import React, { useState } from 'react';
import Login from '../components/LoginForm';
import Layout from '../components/Layout';
import Modal from '../components/Modal';

const LoginPage = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleLoginClick = () => {
        console.log("Login clicked");
    };

    const handleSignupClick = () => {
        console.log("Signup clicked");
    };

    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
    };

    const handleCloseModal = () => {
        setShowForgotPassword(false);
    };

    return (
        <Layout onLoginClick={handleLoginClick} onSignupClick={handleSignupClick}>
            <Login onSwitchToSignup={handleSignupClick} />
            <Modal show={showForgotPassword} onClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
                <p>Enter your email address to reset your password:</p>
                <input type="email" className="w-full p-2 border border-gray-300 rounded-md mt-2" />
                <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 mt-4">Submit</button>
            </Modal>
        </Layout>
    );
};

export default LoginPage;
