import React from 'react';
import SignUp from '../components/SignupForm';
import Layout from '../components/Layout';

const SignUpPage = () => {
    const handleLoginClick = () => {
        console.log("Login clicked");
    };

    const handleSignupClick = () => {
        console.log("Signup clicked");
    };

    return (
        <Layout onLoginClick={handleLoginClick} onSignupClick={handleSignupClick}>
            <SignUp onSwitchToLogin={handleLoginClick} />
        </Layout>
    );
};

export default SignUpPage;
