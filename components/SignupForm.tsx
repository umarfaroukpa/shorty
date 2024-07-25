import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import axios from 'axios';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm = ({ onSwitchToLogin }: SignupFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', { name, email, password });
      setName('');
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Email already registered or something went wrong.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-gray-700">Remember Me</label>
        </div>
        {error && <p className="mb-3 text-red-500">{error}</p>}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Sign Up</button>
      </form>
      <div className="mt-4">
        <button onClick={() => signIn('google')} className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-700 mt-2">Sign up with Google</button>
        <button onClick={() => signIn('github')} className="w-full p-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 mt-2">Sign up with GitHub</button>
      </div>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-blue-500 hover:underline">
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
