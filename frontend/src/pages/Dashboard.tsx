import { useState, useMemo } from 'react';
import type { Employee } from '../types';
import Header from '../components/Header';
import SearchFilter from '../components/SearchFilter';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import DeleteModal from '../components/DeleteModal';

interface Props {
    username: string;
    onLogout: () => void;
    employees: Employee[];
    loading?: boolean;
    onAddEmployee: (data: Omit<Employee, 'id'>) => void;
    onUpdateEmployee: (id: string, data: Partial<Employee>) => void;
    onDeleteEmployee: (id: string) => void;
    onToggleStatus: (id: string) => void;
}

export default function Dashboard({
    username,
    onLogout,
    employees,
    loading = false,
    onAddEmployee,
    onUpdateEmployee,
    onDeleteEmployee,
    onToggleStatus
}: Props) {
    const [search, setSearch] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [formOpen, setFormOpen] = useState(false);
    const [editingEmp, setEditingEmp] = useState<Employee | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deletingEmp, setDeletingEmp] = useState<Employee | null>(null);

    const filtered = useMemo(() => {
        return employees.filter(emp => {
            const nameMatch = emp.fullName.toLowerCase().includes(search.toLowerCase());
            const genderMatch = !genderFilter || emp.gender === genderFilter;
            const statusMatch = !statusFilter ||
                (statusFilter === 'active' ? emp.isActive : !emp.isActive);
            return nameMatch && genderMatch && statusMatch;
        });
    }, [employees, search, genderFilter, statusFilter]);

    const total = employees.length;
    const active = employees.filter(e => e.isActive).length;
    const inactive = total - active;

    const openAddForm = () => {
        setEditingEmp(null);
        setFormOpen(true);
    };

    const openEditForm = (emp: Employee) => {
        setEditingEmp(emp);
        setFormOpen(true);
    };

    const openDeleteConfirm = (emp: Employee) => {
        setDeletingEmp(emp);
        setDeleteOpen(true);
    };

    const handleSave = (data: Omit<Employee, 'id'>) => {
        if (editingEmp) {
            onUpdateEmployee(editingEmp.id, data);
        } else {
            onAddEmployee(data);
        }
    };

    const confirmDelete = () => {
        if (deletingEmp) {
            onDeleteEmployee(deletingEmp.id);
            setDeleteOpen(false);
            setDeletingEmp(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header username={username} onLogout={onLogout} />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-6 mb-8">
                    <div className="rounded-lg shadow-sm p-5 bg-blue-50">
                        <h2 className="text-lg font-semibold mb-2">Total Employees</h2>
                        <p className="text-2xl font-bold text-blue-600">{total}</p>
                    </div>
                    <div className="rounded-lg shadow-sm p-5 bg-green-50">
                        <h2 className="text-lg font-semibold mb-2">Active</h2>
                        <p className="text-2xl font-bold text-green-600">{active}</p>
                    </div>
                    <div className="rounded-lg shadow-sm p-5 bg-orange-50">
                        <h2 className="text-lg font-semibold mb-2">Inactive</h2>
                        <p className="text-2xl font-bold text-orange-600">{inactive}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        <SearchFilter
                            searchTerm={search}
                            onSearchChange={setSearch}
                            genderFilter={genderFilter}
                            onGenderChange={setGenderFilter}
                            statusFilter={statusFilter}
                            onStatusChange={setStatusFilter}
                        />

                        <div className="flex gap-3 no-print">
                            <button
                                onClick={() => window.print()}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                            >
                                🖨️ Print
                            </button>
                            <button
                                onClick={openAddForm}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                            >
                                + Add Employee
                            </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <p className="text-gray-500 font-medium">Loading employees...</p>
                    </div>
                ) : (
                    <EmployeeTable
                        employees={filtered}
                        onEdit={openEditForm}
                        onDelete={openDeleteConfirm}
                        onToggleStatus={onToggleStatus}
                    />
                )}
            </main>

            <EmployeeForm
                isOpen={formOpen}
                onClose={() => setFormOpen(false)}
                onSave={handleSave}
                editData={editingEmp}
            />

            <DeleteModal
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={confirmDelete}
                employeeName={deletingEmp?.fullName || ''}
            />
        </div>
    );
}
