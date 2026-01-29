import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, LogOut, Edit2, Save, X, ChevronRight } from 'lucide-react';
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

    const handlePasswordDataChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleUpdatePassword = () => {
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            toast.error('Please fill all password fields');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            toast.success('Password updated successfully!');
        }, 1000);
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
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden">

            {/* Hero Section - Matching Premium Theme */}
            <section className="relative pt-20 pb-10 md:pt-28 md:pb-14 px-6 text-center bg-slate-50 border-b border-slate-200 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden">
                {/* Water Bubbles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-blue-300/40 border border-white/40 blur-[0.5px] animate-float-bubble"
                            style={{
                                width: `${Math.random() * 30 + 10}px`,
                                height: `${Math.random() * 30 + 10}px`,
                                left: `${Math.random() * 100}%`,
                                bottom: `-${Math.random() * 20 + 10}%`,
                                animationDuration: `${Math.random() * 4 + 5}s`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                </div>

                <style>{`
                    @keyframes float-bubble {
                        0% { transform: translateY(0) scale(1); opacity: 0; }
                        20% { opacity: 0.4; }
                        80% { opacity: 0.4; }
                        100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
                    }
                    .animate-float-bubble {
                        animation: float-bubble linear infinite;
                    }
                `}</style>

                <div className="relative z-10 max-w-4xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mx-auto shadow-sm">
                        <User size={16} className="text-[var(--color-primary)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Member Profile
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                        My <span className="text-[var(--color-primary)]">Account</span>
                    </h1>

                    <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        Manage your preferences and stay updated with your hydration journey.
                    </p>
                </div>
            </section>

            <div className="relative z-10 py-10 md:py-16 px-4 md:px-8 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Info */}
                        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
                                <button
                                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                                    className={`px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${isEditing ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 text-white'}`}
                                >
                                    {isEditing ? <><Save size={16} /> {isLoading ? 'Saving...' : 'Save Profile'}</> : <><Edit2 size={16} /> Edit Profile</>}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                                    <input name="firstName" value={profileData.firstName} onChange={handleProfileChange} disabled={!isEditing} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all disabled:opacity-50" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                                    <input name="lastName" value={profileData.lastName} onChange={handleProfileChange} disabled={!isEditing} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all disabled:opacity-50" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input name="email" value={profileData.email} disabled className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold opacity-50 cursor-not-allowed" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                    <input name="phone" value={profileData.phone} onChange={handleProfileChange} disabled={!isEditing} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all disabled:opacity-50" />
                                </div>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                                <h2 className="text-xl font-bold mb-6 text-slate-900 flex items-center gap-2">
                                    <Lock size={20} className="text-[var(--color-primary)]" /> Update Password
                                </h2>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                                        <div className="relative">
                                            <input
                                                type={showCurrentPassword ? "text" : "password"}
                                                name="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordDataChange}
                                                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all"
                                                placeholder="••••••••"
                                            />
                                            <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                                        <div className="relative">
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordDataChange}
                                                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all"
                                                placeholder="••••••••"
                                            />
                                            <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordDataChange}
                                            className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <button
                                        onClick={handleUpdatePassword}
                                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </div>

                            <button onClick={handleLogout} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest border border-red-100 hover:bg-red-100 transition-all flex items-center justify-center gap-2">
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
