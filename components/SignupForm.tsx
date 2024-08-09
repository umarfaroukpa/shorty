import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { signIn } from 'next-auth/react';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm = ({ onSwitchToLogin }: SignupFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showRegisterFields, setShowRegisterFields] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post('/api/auth/signup', { name, email, password });
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      router.push('/');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Email already registered or something went wrong.');
    }
  };

  return (
    <div className={`max-w-xs mx-auto p-3 bg-white rounded-lg shadow-sm mt-7 ${showRegisterFields ? 'slide-in' : ''}`}>
      <h2 className="text-xl font-semibold mb-3">Signup</h2>
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
        onClick={() => setShowRegisterFields(!showRegisterFields)}
        className="w-full p-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-sm"
      >
        {showRegisterFields ? "Back" : "Signup With Email"}
      </button>
      {showRegisterFields && (
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-2">
            <label htmlFor="name" className="block text-gray-700 text-sm">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full p-1 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-gray-700 text-sm">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-1 border border-gray-300 rounded-md text-sm"
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
              className="w-full p-1 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full p-1 border border-gray-300 rounded-md text-sm"
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
          {error && <p className="mb-2 text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full p-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-sm">Sign Up</button>
        </form>
      )}
      <p className="mt-3 text-center text-sm">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-blue-500 hover:underline">
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
