import './login.css';
import React from 'react';
import { useState } from 'react';
function Login({ onLogin, onSwitchToRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Both fields are required');
        } else {
            setError('');
            onLogin(username,password);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-xs p-6 bg-white dark:bg-gray-950 rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700 dark:text-gray-100">Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="User"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 border rounded border-gray-300 dark:border-gray-700 dark:bg-gray-500 focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-700"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border rounded border-gray-300 dark:border-gray-700 dark:bg-gray-500 focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-700"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="px-4 py-2 font-semibold text-white dark:text-gray-950 bg-blue-500 dark:bg-blue-800 rounded hover:bg-blue-600 dark:hover:bg-blue-900">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center dark:text-white">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToRegister} className="text-blue-500 dark:text-blue-800 hover:underline">
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;

