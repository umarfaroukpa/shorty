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
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="mr-2"
                    />
                    <label htmlFor="rememberMe" className="text-gray-700">Remember Me</label>
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Sign In</button>
            </form>
            <div className="mt-4">
                <button onClick={() => signIn('google')} className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-700 mt-2">Sign in with Google</button>
                <button onClick={() => signIn('github')} className="w-full p-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 mt-2">Sign in with GitHub</button>
            </div>
            <div className="mt-4 text-center">
                <button onClick={() => alert('Forgot Password')} className="text-blue-500 hover:underline">Forgot Password?</button>
            </div>
            <p className="mt-4 text-center">
                Don't have an account?{' '}
                <button onClick={onSwitchToSignup} className="text-blue-500 hover:underline">
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default LoginForm;
