import React from "react";
const Footer = () => {
    return (
        <footer className="bg-[#3f4551] text-white py-4 flex justify-center font-extrabold items-center mt-4 text-gradient">
            <div className="text-center">
                <p className="text-sm">&copy; 2024 Shorty. All rights reserved.</p>
                <p className="text-xs">
                    Follow us on
                    <a href="https://twitter.com" className="text-blue-500 mx-2" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                    <a href="https://facebook.com" className="text-blue-700 mx-2" target="_blank" rel="noopener noreferrer">
                        Facebook
                    </a>
                    <a href="https://linkedin.com" className="text-blue-700 mx-2" target="_blank" rel="noopener noreferrer">
                        Linkedin
                    </a>
                    <a href="https://instagram.com" className="text-blue-700 mx-2" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
