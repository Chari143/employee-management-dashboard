import { Pencil, Trash2 } from 'lucide-react';
import type { Employee } from '../types';

interface Props {
    employees: Employee[];
    onEdit: (emp: Employee) => void;
    onDelete: (emp: Employee) => void;
    onToggleStatus: (id: string) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete, onToggleStatus }: Props) {
    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
    });

    if (employees.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 font-medium">No employees found</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Photo</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DOB</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">State</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider no-print">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {employees.map(emp => (
                        <tr key={emp.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{emp.employeeId}</td>
                            <td className="px-6 py-4">
                                <img
                                    src={emp.profileImage}
                                    alt={emp.fullName}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                    onError={e => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40'}
                                />
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800">{emp.fullName}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 capitalize">{emp.gender}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{formatDate(emp.dateOfBirth)}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{emp.state}</td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => onToggleStatus(emp.id)}
                                    className={`w-12 h-6 rounded-full relative transition no-print ${emp.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                                >
                                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow ${emp.isActive ? 'left-6' : 'left-0.5'}`} />
                                </button>
                                <span className="hidden print:inline text-sm ml-2 text-gray-600">{emp.isActive ? 'Active' : 'Inactive'}</span>
                            </td>
                            <td className="px-6 py-4 no-print">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(emp)}
                                        className="p-2 hover:bg-blue-50 rounded-lg transition"
                                        title="Edit"
                                    >
                                        <span className="text-lg"><Pencil /></span>
                                    </button>
                                    <button
                                        onClick={() => onDelete(emp)}
                                        className="p-2 hover:bg-red-50 rounded-lg transition"
                                        title="Delete"
                                    >
                                        <span className="text-lg"><Trash2 /></span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
