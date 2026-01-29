import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, LogOut, Edit2, Save, X } from 'lucide-react';
import { toast } from 'react-toastify';
import Footer from '../../components/layout/Footer';
import Swal from 'sweetalert2';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [profileData, setProfileData] = useState({
        firstName: 'Ricky',
        lastName: 'Singh',
        email: 'ricky@example.com',
        phone: '9876543210',
        gender: 'male'
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsEditing(false);
            toast.success('Profile updated successfully (Static)!');
        }, 1000);
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Logout Confirmation',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-primary)',
            confirmButtonText: 'Yes, Logout'
        });

        if (result.isConfirmed) {
            toast.success('Logged out successfully!');
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-surface)] pt-24 pb-16 px-6 md:px-24">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-[var(--color-secondary)] tracking-tighter">My <span className="text-[var(--color-primary)]">Account</span></h1>
                    <p className="text-slate-500 font-medium">Manage your personal purity profile.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Personal Information</h2>
                            <button onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)} className="px-6 py-2 bg-[var(--color-secondary)] text-white rounded-xl font-bold text-sm flex items-center gap-2">
                                {isEditing ? <><Save size={16} /> Save Changes</> : <><Edit2 size={16} /> Edit Profile</>}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">First Name</label>
                                <input name="firstName" value={profileData.firstName} onChange={handleProfileChange} disabled={!isEditing} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none disabled:opacity-50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Last Name</label>
                                <input name="lastName" value={profileData.lastName} onChange={handleProfileChange} disabled={!isEditing} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none disabled:opacity-50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                                <input name="email" value={profileData.email} disabled className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold opacity-50 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                                <input name="phone" value={profileData.phone} onChange={handleProfileChange} disabled={!isEditing} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none disabled:opacity-50" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                            <h2 className="text-xl font-bold mb-6">Security</h2>
                            <div className="space-y-4">
                                <button className="w-full py-4 px-6 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-left flex items-center justify-between">
                                    <div className="flex items-center gap-3"><Lock size={18} /> Update Password</div>
                                </button>
                            </div>
                        </div>

                        <div className="bg-red-50 p-8 rounded-[40px] border border-red-100">
                            <h2 className="text-xl font-bold mb-4 text-red-900">Danger Zone</h2>
                            <button onClick={handleLogout} className="w-full py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-red-500/20 flex items-center justify-center gap-2">
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
