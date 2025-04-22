import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { signIn } from 'next-auth/react';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  activeForm: string;
}

const SignupForm = ({ onSwitchToLogin, activeForm }: SignupFormProps) => {
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
    <div className={`w-full max-w-xs mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm transition-all duration-500 ${activeForm === 'signup' ? 'h-full text-base md:text-lg' : 'h-auto text-xs md:text-sm'}`}>
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Signup</h2>

      <div className="flex justify-between mb-4 gap-2">
        <button
          onClick={() => signIn('google')}
          className="w-full p-1 md:p-2 bg-red-500 text-white rounded-md hover:bg-red-700 text-xs md:text-sm flex items-center justify-center"
        >
          <i className="fa-brands fa-google mr-1"></i> Google
        </button>
        <button
          onClick={() => signIn('github')}
          className="w-full p-1 md:p-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 text-xs md:text-sm flex items-center justify-center"
        >
          <i className="fa-brands fa-github mr-1"></i> GitHub
        </button>
      </div>

      <button
        onClick={() => setShowRegisterFields(!showRegisterFields)}
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-xs md:text-sm flex items-center justify-center"
      >
        {showRegisterFields ? (
          <><i className="fa-solid fa-arrow-left mr-1"></i> Back</>
        ) : (
          <><i className="fa-solid fa-envelope mr-1"></i> Signup With Email</>
        )}
      </button>

      {showRegisterFields && (
        <form onSubmit={handleSubmit} className="mt-3 space-y-2 md:space-y-3">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-xs md:text-sm">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full p-1 md:p-2 border border-gray-300 rounded-md text-xs md:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 text-xs md:text-sm">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-1 md:p-2 border border-gray-300 rounded-md text-xs md:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-xs md:text-sm">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-1 md:p-2 border border-gray-300 rounded-md text-xs md:text-sm"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-xs md:text-sm">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full p-1 md:p-2 border border-gray-300 rounded-md text-xs md:text-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-1.5"
            />
            <label htmlFor="rememberMe" className="text-gray-700 text-xs md:text-sm">Remember Me</label>
          </div>

          {error && <p className="text-red-500 text-xs md:text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full p-1 md:p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-xs md:text-sm flex items-center justify-center"
          >
            <i className="fa-solid fa-user-plus mr-1"></i> Sign Up
          </button>
        </form>
      )}

      <p className="mt-3 text-center text-xs md:text-sm">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-blue-500 hover:underline">
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignupForm;