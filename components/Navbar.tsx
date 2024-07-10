"use client";

import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <div>
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/login">Login</Link>
                <Link href="/signup">Sign Up</Link>
            </div>
        </nav>
    );
};

export default Navbar;


// import Link from 'next/link';
// import { useState } from 'react';

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleNav = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <nav className={`navbar ${isOpen ? 'open' : ''}`}>
//             <button onClick={toggleNav} className="nav-toggle">Menu</button>
//             <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
//                 <li><Link href="/">Home</Link></li>
//                 <li><Link href="/about">About</Link></li>
//                 <li><Link href="/services">Services</Link></li>
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;
