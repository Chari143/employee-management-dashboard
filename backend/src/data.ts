import { Employee } from './types';

// sample data
export let employees: Employee[] = [
    {
        id: 'EMP001',
        fullName: 'Rahul Sharma',
        gender: 'male',
        dateOfBirth: '1990-05-15',
        profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        state: 'Maharashtra',
        isActive: true,
    },
    {
        id: 'EMP002',
        fullName: 'Priya Patel',
        gender: 'female',
        dateOfBirth: '1992-08-22',
        profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
        state: 'Gujarat',
        isActive: true,
    },
    {
        id: 'EMP003',
        fullName: 'Amit Kumar',
        gender: 'male',
        dateOfBirth: '1988-12-10',
        profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
        state: 'Karnataka',
        isActive: false,
    },
    {
        id: 'EMP004',
        fullName: 'Sneha Reddy',
        gender: 'female',
        dateOfBirth: '1995-03-28',
        profileImage: 'https://randomuser.me/api/portraits/women/4.jpg',
        state: 'Telangana',
        isActive: true,
    },
    {
        id: 'EMP005',
        fullName: 'Vikram Singh',
        gender: 'male',
        dateOfBirth: '1985-07-04',
        profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
        state: 'Delhi',
        isActive: false,
    },
];

let counter = 6;
export const generateId = () => `EMP${String(counter++).padStart(3, '0')}`;
