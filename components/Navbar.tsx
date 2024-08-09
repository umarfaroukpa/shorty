import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import logo from '../public/logo.png';
import { useRouter } from 'next/router';

interface NavbarProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick }) => {
    const { data: session, status } = useSession();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    const handleProfileClick = () => {
        setDropdownVisible(false);
        router.push('/profile');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    // Debugging: Log session status and data
    console.log('Session status:', status);
    console.log('Session data:', session);

    return (
        <nav className="fixed top-0 w-full text-white p-4 flex items-center justify-between bg-[#1E1E1E] shadow-md z-50">
            <div className="flex items-center">
                <Image src={logo} alt="Logo" width={50} height={50} />
                <span className="ml-2 text-xl font-bold text-gradient">Shorty</span>
            </div>
            <ul className="flex items-center space-x-4">
                <li><a href="/" className="hover:underline text-custom-text font-inter font-semibold text-sm text-gradient">Home</a></li>
                {session ? (
                    <>
                        <li className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 text-gradient"
                            >
                                <i className="fa-solid fa-user-circle text-2xl"></i>
                            </button>
                            {dropdownVisible && (
                                <ul className="absolute right-0 mt-2 w-48 text-black rounded-md shadow-lg z-10">
                                    <li>
                                        <button
                                            className="block px-4 py-2 hover:bg-gray-200 text-gradient w-full text-left"
                                            onClick={handleProfileClick}
                                        >
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-gradient"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <button
                                onClick={onLoginClick}
                                className="flex items-center justify-center space-x-2 bg-custom-dark border border-custom-border shadow-custom rounded-custom px-6 py-4"
                            >
                                <span className="text-custom-text font-inter font-semibold text-sm text-gradient">Login</span>
                                <span className="text-custom-icon text-2xl">
                                    <i className="fa-solid fa-arrow-right-from-bracket text-gradient"></i>
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={onSignupClick}
                                className="flex items-center justify-center space-x-2 bg-[#144EE3] border border-[#144EE3] shadow-[10px_9px_22px_rgba(20,78,227,0.38)] rounded-[48px] px-[25px] py-[21px] w-[178px] h-[60px] text-white font-inter font-semibold text-lg leading-[18px]"
                            >
                                <span className="flex items-center">Signup</span>
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
