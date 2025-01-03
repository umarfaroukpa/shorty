import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Modal from './Modal';

interface LoginFormProps {
    onSwitchToSignup: () => void;
    // Adding prop to track the active form
    activeForm: string;
}

const LoginForm = ({ onSwitchToSignup, activeForm }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showLoginFields, setShowLoginFields] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            rememberMe,
        });

        if (result?.error) {
            alert('Sign in failed. Check the details you provided are correct.');
        } else {
            setEmail('');
            setPassword('');
            router.push('/dashboard');
        }
    };

    const handleForgotPasswordSubmit = async () => {
        try {
            const res = await fetch('/api/auth/resetPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                setResetSent(true);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error Sending Mail:', error);

        }
    };

    const handleCloseModal = () => {
        setShowForgotPassword(false);
        setEmail('');
    };

    return (
        <div className={`max-w-xs mx-auto p-6 bg-white rounded-lg shadow-sm transition-all duration-500 ${activeForm === 'login' ? 'h-full text-lg' : 'h-auto text-sm'
            }`}
        >
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <div className="flex justify-between mb-4">
                <button
                    onClick={() => signIn('google')}
                    className="w-full p-1 bg-red-500 text-white rounded-md hover:bg-red-700 mx-1 text-sm"
                >
                    Google
                </button>
                <button
                    onClick={() => signIn('github')}
                    className="w-full p-1 bg-gray-800 text-white rounded-md hover:bg-gray-900 mx-1 text-sm"
                >
                    GitHub
                </button>
            </div>
            <button
                onClick={() => setShowLoginFields(!showLoginFields)}
                className="w-full p-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-sm"
            >
                {showLoginFields ? "Back" : "Login"}
            </button>
            {showLoginFields && (
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-gray-700 text-sm">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full p-1.5 border border-gray-300 rounded-md text-sm"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-gray-700 text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full p-1.5 border border-gray-300 rounded-md text-sm"
                        />
                    </div>
                    <div className="mb-2 flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="mr-1.5"
                        />
                        <label htmlFor="rememberMe" className="text-gray-700 text-sm">Remember Me</label>
                    </div>
                    <button type="submit" className="w-full p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-sm">Sign In</button>
                </form>
            )}
            <div className="mt-3 text-center text-sm">
                <button onClick={() => alert('Forgot Password')} className="text-blue-500 hover:underline">Forgot Password?</button>
            </div>
            <div className="mt-3 text-center text-sm">
                <span>Don&apos;t have an account? </span>
                <button onClick={onSwitchToSignup} className="text-blue-500 hover:underline">Sign Up</button>
            </div>

            <Modal show={showForgotPassword} onClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
                {resetSent ? (
                    <p>Check your email for a link to reset your password.</p>
                ) : (
                    <>
                        <p>Enter your email address to reset your password:</p>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md mt-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 mt-4"
                            onClick={handleForgotPasswordSubmit}
                        >
                            Submit
                        </button>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default LoginForm;
