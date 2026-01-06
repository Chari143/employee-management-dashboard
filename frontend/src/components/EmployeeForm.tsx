import { useState, useEffect } from 'react';
import type { Employee } from '../types';
import { INDIAN_STATES } from '../data/mockData';
import { CircleUserRound } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Employee, 'id'>) => void;
    editData?: Employee | null;
}

type gender = 'male' | 'female' | 'other';
export default function EmployeeForm({ isOpen, onClose, onSave, editData }: Props) {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: 'male' as gender,
        dateOfBirth: '',
        state: '',
        isActive: true,
        profileImage: ''
    });
    const [imagePreview, setImagePreview] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (editData) {
            setFormData({
                fullName: editData.fullName,
                gender: editData.gender,
                dateOfBirth: editData.dateOfBirth,
                state: editData.state,
                isActive: editData.isActive,
                profileImage: editData.profileImage
            });
            setImagePreview(editData.profileImage);
        } else {
            setFormData({
                fullName: '',
                gender: 'male',
                dateOfBirth: '',
                state: '',
                isActive: true,
                profileImage: ''
            });
            setImagePreview('');
            setErrors({});
        }
    }, [editData, isOpen]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setErrors({ ...errors, image: 'Image too large (max 2MB)' });
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            setFormData({ ...formData, profileImage: base64 });
            setImagePreview(base64);
            const { image, ...rest } = errors;
            setErrors(rest);
        };
        reader.readAsDataURL(file);
    };

    const validateForm = () => {
        const errs: { [key: string]: string } = {};
        if (!formData.fullName.trim()) errs.fullName = 'Name is required';
        if (!formData.dateOfBirth) errs.dateOfBirth = 'DOB is required';
        if (!formData.state) errs.state = 'Select a state';
        if (!formData.profileImage) errs.image = 'Upload an image';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        onSave({
            fullName: formData.fullName.trim(),
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
            state: formData.state,
            isActive: formData.isActive,
            profileImage: formData.profileImage
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>

                <div className="px-6 py-5 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">{editData ? 'Edit Employee' : 'Add Employee'}</h2>
                </div>

                <div className="p-6 space-y-5">
                    {/* image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image *</label>
                        <div className="flex items-center gap-4">
                            {imagePreview ? (
                                <img src={imagePreview} alt="preview" className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center"><CircleUserRound className='w-14 h-14 text-gray-500' /></div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
                            />
                        </div>
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                    </div>

                    {/* name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-400' : 'border-gray-300'}`}
                            placeholder="Enter full name"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    {/* gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <div className="flex gap-6">
                            {['male', 'female', 'other'].map(g => (
                                <label key={g} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={formData.gender === g}
                                        onChange={() => setFormData({ ...formData, gender: g as any })}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm text-gray-700 capitalize">{g}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* dob */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                        <input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={e => {
                                setFormData({ ...formData, dateOfBirth: e.target.value });
                                if (errors.dateOfBirth) setErrors({ ...errors, dateOfBirth: '' });
                            }}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dateOfBirth ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                    </div>

                    {/* state */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                        <select
                            value={formData.state}
                            onChange={e => setFormData({ ...formData, state: e.target.value })}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${errors.state ? 'border-red-400' : 'border-gray-300'}`}
                        >
                            <option value="">Select state</option>
                            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>

                    {/* active toggle */}
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-gray-700">Active Status</span>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                            className={`w-12 h-6 rounded-full relative transition ${formData.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow ${formData.isActive ? 'left-6' : 'left-0.5'}`} />
                        </button>
                    </div>
                </div>

                <div className="px-6 py-5 border-t bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                    >
                        {editData ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
}
