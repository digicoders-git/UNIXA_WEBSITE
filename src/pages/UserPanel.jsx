import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, CreditCard, Settings, LogOut, Bell, Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/layout/Footer';

const UserPanel = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userData));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('userId');
        toast.success('Logged out successfully');
        navigate('/');
    };

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'transactions', label: 'Transactions', icon: CreditCard },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input 
                                    type="text" 
                                    value={`${user?.firstName || ''} ${user?.lastName || ''}`}
                                    className="w-full p-3 border rounded-lg"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input 
                                    type="email" 
                                    value={user?.email || ''}
                                    className="w-full p-3 border rounded-lg"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Phone</label>
                                <input 
                                    type="tel" 
                                    value={user?.phone || ''}
                                    className="w-full p-3 border rounded-lg"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'orders':
                return (
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">My Orders</h3>
                        <div className="text-center py-8">
                            <Package size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-500">No orders found</p>
                        </div>
                    </div>
                );
            case 'transactions':
                return (
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">Transaction History</h3>
                        <div className="text-center py-8">
                            <CreditCard size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-500">No transactions found</p>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">{menuItems.find(item => item.id === activeTab)?.label}</h3>
                        <p className="text-gray-500">Content coming soon...</p>
                    </div>
                );
        }
    };

    if (!user) return null;

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="text-center mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <User size={32} className="text-white" />
                                    </div>
                                    <h2 className="font-bold text-lg">{user.firstName} {user.lastName}</h2>
                                    <p className="text-gray-500 text-sm">{user.email}</p>
                                </div>
                                
                                <nav className="space-y-2">
                                    {menuItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveTab(item.id)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                                    activeTab === item.id 
                                                        ? 'bg-cyan-50 text-cyan-600 border-l-4 border-cyan-500' 
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                            >
                                                <Icon size={20} />
                                                {item.label}
                                            </button>
                                        );
                                    })}
                                    
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={20} />
                                        Logout
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserPanel;
