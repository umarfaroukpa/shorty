import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, onLoginClick, onSignupClick }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
            <main className="flex-grow pt-16 p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;