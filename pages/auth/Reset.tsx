import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const { token } = router.query;

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            alert('Password mismatch');
            return;
        }

        const response = await fetch('/api/auth/resetPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Password reset successful');
            router.push('/login');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-xl font-bold">Reset Password</h1>
            <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 border border-gray-300 rounded-md mt-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-2 border border-gray-300 rounded-md mt-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
                onClick={handleResetPassword}
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 mt-4"
            >
                Reset Password
            </button>
        </div>
    );
};

export default ResetPassword;
