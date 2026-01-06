export interface Employee {
    id: string;
    employeeId?: string;
    fullName: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: string;
    profileImage: string;
    state: string;
    isActive: boolean;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: { username: string } | null;
}
