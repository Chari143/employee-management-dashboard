interface Props {
    searchTerm: string;
    onSearchChange: (val: string) => void;
    genderFilter: string;
    onGenderChange: (val: string) => void;
    statusFilter: string;
    onStatusChange: (val: string) => void;
}

export default function SearchFilter({
    searchTerm, onSearchChange,
    genderFilter, onGenderChange,
    statusFilter, onStatusChange
}: Props) {
    return (
        <div className="flex flex-wrap gap-3 items-center">
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={e => onSearchChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <select
                value={genderFilter}
                onChange={e => onGenderChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <select
                value={statusFilter}
                onChange={e => onStatusChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
    );
}
