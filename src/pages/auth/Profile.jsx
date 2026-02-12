import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { getToken, removeToken, isTokenValid } from '../../utils/auth';
import { User, Mail, Phone, Lock, Eye, EyeOff, LogOut, Edit2, Save, ChevronRight, Package, Download, Calendar, ShoppingBag, ShieldCheck, Zap, RefreshCw, Clock, Info, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';
import Footer from '../../components/layout/Footer';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { createPortal } from 'react-dom';

const InvoiceModal = ({ order, isOpen, onClose }) => {
    const [show, setShow] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShow(true), 10);
        } else {
            setShow(false);
        }
    }, [isOpen]);

    if (!isOpen || !order) return null;

    const handleDownloadPdf = async () => {
        const element = document.getElementById('printable-invoice');
        if (!element) {
            toast.error("Invoice element not found!");
            return;
        }
        setIsGenerating(true);
        try {
            const canvas = await html2canvas(element, { 
                scale: 2, 
                useCORS: true, 
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                onclone: (clonedDoc) => {
                    const invoice = clonedDoc.getElementById('printable-invoice');
                    if (invoice) {
                        invoice.style.fontFamily = "Arial, sans-serif";
                    }
                }
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Invoice_${order._id.slice(-6).toUpperCase()}.pdf`);
            toast.success("Invoice downloaded successfully!");
        } catch (error) {
            console.error("PDF Generation Error:", error);
            toast.error("Failed to download PDF. Try using a different browser.");
        } finally {
            setIsGenerating(false);
        }
    };

    const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

    return createPortal(
        <div 
            className={`fixed inset-0 z-[11000] flex items-center justify-center px-4 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
            onClick={onClose}
        >
            <div 
                className={`bg-[#ffffff] w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative border border-white/20 transition-all duration-500 ease-out ${show ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-12 scale-95 opacity-0'}`}
                onClick={e => e.stopPropagation()}
            >
                <div id="printable-invoice" className="flex flex-col flex-1 overflow-y-auto" style={{ backgroundColor: '#ffffff', color: '#1e293b', padding: '3rem' }}>
                    <div className="flex justify-between items-start mb-10">
                        <div className="flex flex-col gap-1">
                            <div className="w-12 h-12 flex items-center justify-center rounded-2xl mb-2" style={{ backgroundColor: '#eff6ff' }}>
                                <img src="/sks-logo1.png" alt="Logo" className="w-8 h-8 object-contain" />
                            </div>
                            <h2 className="text-xl font-black tracking-tighter" style={{ color: '#0f172a' }}>UNIXA <span style={{ color: '#0ea5e9' }}>PURE</span></h2>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>Tax Invoice</p>
                            <p className="text-sm font-bold" style={{ color: '#0f172a' }}>#INV-{order._id.slice(-6).toUpperCase()}</p>
                            <p className="text-xs font-medium mt-1" style={{ color: '#64748b' }}>{today}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                        <div>
                            <p className="text-[10px] uppercase font-black mb-2 tracking-widest" style={{ color: '#94a3b8' }}>From</p>
                            <p className="font-bold" style={{ color: '#0f172a' }}>UNIXA PURE WATER</p>
                            <p className="text-xs leading-relaxed mt-1" style={{ color: '#64748b' }}>Ahirawan, Sandila,<br />Hardoi, Uttar Pradesh</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase font-black mb-2 tracking-widest" style={{ color: '#94a3b8' }}>Bill To</p>
                            <p className="font-bold" style={{ color: '#0f172a' }}>{order.shippingAddress?.name}</p>
                            <p className="text-xs leading-relaxed mt-1" style={{ color: '#64748b' }}>
                                {order.shippingAddress?.addressLine1}<br />
                                {order.shippingAddress?.city}, {order.shippingAddress?.pincode}
                            </p>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="grid grid-cols-12 border-b pb-3 mb-3 text-[10px] font-black uppercase tracking-widest" style={{ color: '#94a3b8', borderColor: '#f1f5f9' }}>
                            <div className="col-span-8">Product Details</div>
                            <div className="col-span-1 text-center">Qty</div>
                            <div className="col-span-3 text-right">Price</div>
                        </div>
                        {order.items.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-12 py-4 items-start border-b last:border-0" style={{ borderColor: '#f8fafc' }}>
                                <div className="col-span-8 pr-4">
                                    <p className="text-sm font-black" style={{ color: '#0f172a' }}>{item.productName}</p>
                                    
                                    <div className="flex flex-col gap-1 mt-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>
                                                Warranty ID: <span style={{ color: '#0f172a' }}>{item.warrantyId || `WAR-${order._id.slice(-6)}-${idx}`}</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>
                                                AMC Plan: <span style={{ color: '#0f172a' }}>{item.amcPlan || 'Standard Protection'}</span>
                                            </span>
                                        </div>
                                        {item.amcId && (
                                            <div className="flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#6366f1' }}></div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>
                                                    AMC Ref: <span style={{ color: '#0f172a' }}>{item.amcId}</span>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 text-center text-sm font-bold pt-1" style={{ color: '#475569' }}>{item.quantity}</div>
                                <div className="col-span-3 text-right text-sm font-black pt-1" style={{ color: '#0f172a' }}>₹{item.productPrice.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto border-t pt-8" style={{ borderColor: '#f1f5f9' }}>
                        <div className="flex flex-col items-end gap-3 text-sm">
                            <div className="flex justify-between w-48 font-medium" style={{ color: '#64748b' }}>
                                <span>Subtotal</span>
                                <span className="font-bold" style={{ color: '#0f172a' }}>₹{order.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between w-48 font-medium" style={{ color: '#64748b' }}>
                                <span>Shipping Fees</span>
                                <span className="font-bold uppercase text-[10px] tracking-widest" style={{ color: '#16a34a' }}>Free</span>
                            </div>
                            <div className="flex justify-between w-48 items-center mt-2 pt-4 border-t" style={{ borderColor: '#f1f5f9' }}>
                                <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#0f172a' }}>Total Amount</span>
                                <span className="text-2xl font-black" style={{ color: '#0ea5e9' }}>₹{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12 text-center border-2 border-dashed rounded-2xl p-4" style={{ borderColor: '#f1f5f9' }}>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#94a3b8' }}>Thank you for choosing Unixa</p>
                    </div>
                </div>

                <div className="p-6 bg-[#f8fafc] flex items-center justify-between border-t" style={{ borderColor: '#f1f5f9' }}>
                    <button onClick={onClose} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-[#94a3b8] hover:text-[#475569] transition-colors">
                        Close
                    </button>
                    <button 
                        onClick={handleDownloadPdf} 
                        disabled={isGenerating} 
                        className="bg-[#0f172a] hover:bg-[#0ea5e9] text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-500/10 disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <span className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </span>
                        ) : (
                            <><Download size={14} strokeWidth={3} /> Download Invoice</>
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [orders, setOrders] = useState([]);
    const [invoiceOrder, setInvoiceOrder] = useState(null);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    const fetchProfileAndOrders = async () => {
        if (!isTokenValid()) {
            navigate('/login');
            return;
        }

        setIsInitialLoading(true);
        try {
            // Fetch Profile
            const profileRes = await api.get(`/users/profile`);
            if (profileRes.data.user) {
                setProfileData({
                    firstName: profileRes.data.user.firstName || '',
                    lastName: profileRes.data.user.lastName || '',
                    email: profileRes.data.user.email || '',
                    phone: profileRes.data.user.phone || '',
                    gender: profileRes.data.user.gender || ''
                });
                localStorage.setItem('userData', JSON.stringify(profileRes.data.user));
            }

            // Fetch Orders
            const userId = localStorage.getItem('userId');
            if (userId) {
                const ordersRes = await api.get(`/orders/user/${userId}`);
                setOrders(ordersRes.data.orders || []);
            }
        } catch (error) {
            console.error("Fetch profile/orders error:", error);
            if (error.response?.status === 401) {
                handleLogout(true);
            }
        } finally {
            setIsInitialLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileAndOrders();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'text-green-600 bg-green-50 border-green-100';
            case 'processing': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'delivered': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handlePasswordDataChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleUpdatePassword = async () => {
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            toast.error('Please fill all password fields');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            await api.put(`/users/change-password`, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });

            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            toast.success('Password updated successfully!');
            setShowCurrentPassword(false);
            setShowNewPassword(false);
        } catch (error) {
            console.error("Update password error:", error);
            toast.error(error.response?.data?.message || "Failed to update password");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoToDashboard = () => {
        const token = getToken();
        const dashboardUrl = import.meta.env.VITE_USER_PANEL_URL;
        window.location.href = `${dashboardUrl}/login?token=${token}`;
    };

    const handleSaveProfile = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.put(`/users/profile`, profileData);
            setProfileData(data.user);
            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error("Update profile error:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async (silent = false) => {
        if (silent) {
            removeToken();
            localStorage.removeItem('userId');
            localStorage.removeItem('userData');
            navigate('/login');
            return;
        }

        const result = await Swal.fire({
            title: 'Logout Confirmation',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-primary)',
            confirmButtonText: 'Yes, Logout'
        });

        if (result.isConfirmed) {
            removeToken();
            localStorage.removeItem('userId');
            localStorage.removeItem('userData');
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
                                width: `${(i * 11) % 30 + 10}px`,
                                height: `${(i * 11) % 30 + 10}px`,
                                left: `${(i * 17) % 100}%`,
                                bottom: `-${(i * 4) % 20 + 10}%`,
                                animationDuration: `${(i * 3) % 4 + 5}s`,
                                animationDelay: `${(i * 2) % 5}s`
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

                        {/* Right Sidebar Section */}
                        <div className="space-y-6">
                            {/* Dashboard Access Card */}
                            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-8 rounded-[32px] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group border border-slate-700/50">
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                                            <Zap className="text-blue-400" size={24} />
                                        </div>
                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] bg-blue-500/20 px-2 py-1 rounded text-blue-300 border border-blue-500/30">Live Support</span>
                                    </div>
                                    <h3 className="text-xl font-black mb-2">Service Dashboard</h3>
                                    <p className="text-blue-100/60 text-[11px] font-medium mb-8 leading-relaxed">
                                        Manage AMC, track service history, and request filter changes in real-time.
                                    </p>
                                    <button 
                                        onClick={handleGoToDashboard}
                                        className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        GO TO USER-PANAL <ChevronRight size={16} />
                                    </button>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/40 transition-all duration-500"></div>
                                <div className="absolute top-0 right-0 w-full h-full bg-[url('/water-bg.png')] opacity-5 mix-blend-overlay"></div>
                            </div>

                            {/* Security Section */}
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

                    {/* My Orders Section - Proper Integration */}
                    <div className="mt-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                <Package className="text-[var(--color-primary)]" size={28} /> My Recent <span className="text-[var(--color-primary)]">Orders</span>
                            </h2>
                            <div className="flex items-center gap-6">
                                <button onClick={() => navigate('/transactions')} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-500 flex items-center gap-2 transition-colors">
                                    <CreditCard size={14} /> Payment History
                                </button>
                                <button onClick={() => navigate('/orders')} className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:underline flex items-center gap-1">
                                    View All Orders <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {orders.length > 0 ? (
                                orders.slice(0, 3).map(order => (
                                    <div key={order._id} className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 transition-all hover:border-blue-100 group">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center relative group-hover:bg-blue-50 transition-colors">
                                            <Package className="text-[var(--color-primary)]" size={28} />
                                            <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-full">{order.items.length}</div>
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ID: #{order._id.slice(-6).toUpperCase()}</p>
                                            <h3 className="text-lg font-bold mb-3 text-slate-900">{order.items[0].productName} {order.items.length > 1 && `+ ${order.items.length - 1} more`}</h3>
                                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${getStatusColor(order.status)}`}>{order.status}</span>
                                                <span className="text-slate-400 text-xs font-bold flex items-center gap-1"><Calendar size={12} /> {formatDate(order.createdAt)}</span>
                                            </div>
                                        </div>
                                        <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-slate-50 pt-4 md:pt-0 md:pl-8">
                                            <p className="text-2xl font-black text-[var(--color-secondary)] mb-3">₹{order.total.toLocaleString()}</p>
                                            <button onClick={() => { setInvoiceOrder(order); setIsInvoiceModalOpen(true); }} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors mx-auto md:ml-auto">
                                                <Download size={14} /> Download Invoice
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <ShoppingBag size={24} className="text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">No orders yet</h3>
                                    <p className="text-slate-400 text-sm font-medium mt-1">Your hydration journey starts here.</p>
                                    <button onClick={() => navigate('/shop')} className="mt-6 px-8 py-3 bg-[var(--color-primary)] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Start Shopping</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <InvoiceModal order={invoiceOrder} isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
