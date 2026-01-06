export interface Employee {
    id: string;
    fullName: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: string;
    profileImage: string;
    state: string;
    isActive: boolean;
}
