import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
    children: React.ReactNode;
}

const Layout = ({ onLoginClick, onSignupClick, children }: LayoutProps) => {
    return (
        <div>
            <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
            <div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
