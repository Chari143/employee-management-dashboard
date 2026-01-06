import { useNavigate } from 'react-router-dom';

interface Props {
    username: string;
    onLogout: () => void;
}

export default function Header({ username, onLogout }: Props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm border-b no-print">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-semibold text-gray-800">Employee Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 text-sm">Hi, <span className="font-medium">{username}</span></span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition font-medium border border-gray-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
