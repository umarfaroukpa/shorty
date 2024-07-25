import React from 'react';
import Navbar from '../components/Navbar';
import Profile from '../components/profile';

const ProfilePage = () => {
    const handleLoginClick = () => {
        // Add your login logic here
    };

    const handleSignupClick = () => {
        // Add your signup logic here
    };

    return (
        <>
            <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
            <Profile />
        </>
    );
};

export default ProfilePage;
