import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png';
import { useRouter } from 'next/router';

interface NavbarProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick }) => {
    const { data: session } = useSession();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [marketDropdownVisible, setMarketDropdownVisible] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
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

    const toggleMarketDropdown = () => {
        setMarketDropdownVisible(!marketDropdownVisible);
    };

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    };

    const closeMobileMenu = () => {
        setMobileMenuVisible(false);
    };

    return (
        <nav className="fixed top-0 w-full text-white p-4 flex items-center justify-between bg-[#1E1E1E] shadow-md z-50">
            <div className="flex items-center">
                <Image src={logo} alt="Logo" width={50} height={50} />
                <span className="ml-2 text-xl font-bold text-gradient">Shorty</span>
            </div>
            <ul className="hidden md:flex items-center space-x-4">
                <li>
                    <Link href="/" className="hover:underline pr-12 text-custom-text font-inter font-semibold text-sm text-gradient">
                        Home
                    </Link>
                </li>
                <li className="relative">
                    <button onClick={toggleMarketDropdown} className="flex pr-7 items-center space-x-2 text-gradient">
                        Market
                        <i className="fa fa-caret-down ml-1"></i>
                    </button>
                    {marketDropdownVisible && (
                        <ul className="absolute right-0 mt-2 w-48 text-black rounded-md shadow-lg z-10 text-gradient">
                            <li>
                                <Link href="/pricing" className="block px-4 py-2 hover:bg-gray-200 text-gradient w-full text-left" onClick={closeMobileMenu}>
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/analytics" className="block px-4 py-2 hover:bg-gray-200 text-gradient w-full text-left" onClick={closeMobileMenu}>
                                    Analytics
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
                {session ? (
                    <>
                        <li className="relative">
                            <button onClick={toggleDropdown} className="flex items-center space-x-2 text-gradient">
                                <i className="fa-solid fa-user-circle text-2xl"></i>
                            </button>
                            {dropdownVisible && (
                                <ul className="absolute right-0 mt-2 w-48 text-black rounded-md shadow-lg z-10 text-gradient">
                                    <li>
                                        <button className="block px-4 py-2 hover:bg-gray-200 text-gradient w-full text-left" onClick={handleProfileClick}>
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-gradient">
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
                                className="flex items-center justify-center pr-11  space-x-2 bg-custom-dark border border-custom-border shadow-custom rounded-custom px-6 py-4"
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
            <button className={`hamburger ${mobileMenuVisible ? 'active' : ''} md:hidden`} onClick={toggleMobileMenu}>
                <div />
                <div />
                <div />
            </button>
            <div className={`mobile-menu ${mobileMenuVisible ? 'active' : ''} md:hidden`}>
                <span className="close-btn" onClick={closeMobileMenu}>
                    <i className="fa fa-times"></i>
                </span>
                <ul className="flex flex-col space-y-4">
                    <li>
                        <Link href="/" className="hover:underline text-custom-text font-inter font-semibold text-sm text-gradient" onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <button onClick={toggleMarketDropdown} className="flex items-center space-x-2 text-gradient">
                            Market
                            <i className="fa fa-caret-down ml-1"></i>
                        </button>
                        {marketDropdownVisible && (
                            <ul className="mt-2 text-black rounded-md shadow-lg z-10 text-gradient">
                                <li>
                                    <Link href="/pricing" className="block px-4 py-2 hover:bg-gray-200 text-gradient w-full text-left" onClick={closeMobileMenu}>
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/analytics" className="block px-4 py-2 hover:bg-gray-200 text-gradient w-full text-left" onClick={closeMobileMenu}>
                                        Analytics
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    {session ? (
                        <>
                            <li>
                                <button className="block px-4 py-2 hover:bg-gray-200 text-gradient w-full text-left" onClick={handleProfileClick}>
                                    Profile
                                </button>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-gradient">
                                    Logout
                                </button>
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
            </div>
        </nav>
    );
};

export default Navbar;
