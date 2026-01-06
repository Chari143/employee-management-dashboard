import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    onLogin: (username: string, password: string) => boolean;
}

export default function Login({ onLogin }: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError('username and password are required');
            return;
        }

        setError('');

        const ok = onLogin(username, password);
        if (ok) {
            navigate('/dashboard');
        } else {
            setError('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">

                <div className="text-center mb-6">
                    <h1 className="text-xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && (
                        <div className="p-2 bg-red-50 text-red-600 text-sm rounded">{error}</div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-gray-400 text-xs mt-4">
                    Use username/password
                </p>
            </div>
        </div>
    );
}
