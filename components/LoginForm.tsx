import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

interface LoginFormProps {
    onSwitchToSignup: () => void;
}

const LoginForm = ({ onSwitchToSignup }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showLoginFields, setShowLoginFields] = useState(false);
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
            router.push('/dashboard'); // Redirect to dashboard or any other page
        }
    };

    return (
        <div className={`max-w-xs h-3/6 mx-auto p-3 bg-white rounded-lg shadow-sm mt-7 ${showLoginFields ? 'slide-in' : ''}`}>
            <h2 className="text-xl font-semibold mb-3">Login</h2>
            <div className="flex justify-between mb-3">
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
            <div className="mt-3 text-center">
                <button onClick={() => alert('Forgot Password')} className="text-blue-500 hover:underline text-sm">Forgot Password?</button>
            </div>
            <p className="mt-3 text-center text-sm">
                <p>Don&apos;t have an account? Sign up now!</p>
                <button onClick={onSwitchToSignup} className="text-blue-500 hover:underline">
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default LoginForm;
