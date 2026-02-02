import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Eye, EyeOff, ChevronDown } from 'lucide-react';
// import { createUserApi } from '../../api/user';
import { saveToken } from '../../utils/auth';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/layout/Footer';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'Phone must start with 6,7,8,9 and be 10 digits';
        }

        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const submissionData = {
                    ...formData,
                    gender: formData.gender.toLowerCase()
                };
                const { data } = await axios.post(`${apiUrl}/users/register`, submissionData);
                
                if (data.token) {
                    saveToken(data.token);
                    localStorage.setItem('userId', data.user.id);
                    localStorage.setItem('userData', JSON.stringify(data.user));
                    toast.success('Registration successful!');
                    navigate('/');
                }
            } catch (error) {
                console.error('Registration failed:', error);
                toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 mt-20 relative overflow-hidden" style={{ backgroundColor: `var(--color-surface)` }}>
                {/* Animated Background Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="auth-bubble auth-bubble-1"></div>
                    <div className="auth-bubble auth-bubble-2"></div>
                    <div className="auth-bubble auth-bubble-3"></div>
                    <div className="auth-bubble auth-bubble-4"></div>
                    <div className="auth-bubble auth-bubble-5"></div>
                    <div className="auth-bubble auth-bubble-6"></div>
                    <div className="auth-bubble auth-bubble-7"></div>
                    <div className="auth-bubble auth-bubble-8"></div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        .auth-bubble {
                            position: absolute;
                            background: rgba(132, 204, 22, 0.15);
                            border: 1px solid rgba(132, 204, 22, 0.2);
                            border-radius: 50%;
                            animation: float-auth-bubble 25s infinite ease-in-out;
                        }
                        .auth-bubble-1 { width: 140px; height: 140px; left: 8%; top: 12%; animation-delay: 0s; }
                        .auth-bubble-2 { width: 90px; height: 90px; right: 12%; top: 20%; animation-delay: 4s; }
                        .auth-bubble-3 { width: 170px; height: 170px; left: 18%; bottom: 25%; animation-delay: 8s; }
                        .auth-bubble-4 { width: 110px; height: 110px; right: 25%; bottom: 18%; animation-delay: 12s; }
                        .auth-bubble-5 { width: 70px; height: 70px; left: 45%; top: 8%; animation-delay: 16s; }
                        .auth-bubble-6 { width: 100px; height: 100px; right: 40%; bottom: 35%; animation-delay: 20s; }
                        .auth-bubble-7 { width: 60px; height: 60px; left: 75%; top: 40%; animation-delay: 2s; }
                        .auth-bubble-8 { width: 130px; height: 130px; left: 30%; top: 50%; animation-delay: 6s; }
                        @keyframes float-auth-bubble {
                            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
                            25% { transform: translate(35px, -45px) scale(1.1); opacity: 0.7; }
                            50% { transform: translate(-25px, -70px) scale(0.9); opacity: 0.5; }
                            75% { transform: translate(45px, -35px) scale(1.05); opacity: 0.8; }
                        }
                    `
                }} />

                <div className="max-w-2xl w-full rounded-3xl shadow-2xl p-6 md:p-8 relative z-10 backdrop-blur-sm" style={{ backgroundColor: `rgba(248, 250, 252, 0.95)`, border: `1px solid rgba(6, 182, 212, 0.2)`, boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.25)' }}>
                    <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: `var(--color-primary)` }}>Create Account</h2>
                        <p className="text-sm md:text-base" style={{ color: `var(--color-text-muted)` }}>Join UNIXA for pure water solutions</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2" style={{ color: `var(--color-text)` }}>First Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: `var(--color-text-muted)` }} size={20} />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-cyan-200 outline-none transition-all ${errors.firstName ? 'border-red-500' : ''}`}
                                        style={{
                                            backgroundColor: `white`,
                                            border: `1px solid ${errors.firstName ? '#ef4444' : 'rgba(6, 182, 212, 0.2)'}`,
                                            color: `var(--color-text)`
                                        }}
                                        placeholder="Enter first name"
                                    />
                                </div>
                                {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2" style={{ color: `var(--color-text)` }}>Last Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: `var(--color-text-muted)` }} size={20} />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-cyan-200 outline-none transition-all ${errors.lastName ? 'border-red-500' : ''}`}
                                        style={{
                                            backgroundColor: `white`,
                                            border: `1px solid ${errors.lastName ? '#ef4444' : 'rgba(6, 182, 212, 0.2)'}`,
                                            color: `var(--color-text)`
                                        }}
                                        placeholder="Enter last name"
                                    />
                                </div>
                                {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2" style={{ color: `var(--color-text)` }}>Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: `var(--color-text-muted)` }} size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-cyan-200 outline-none transition-all ${errors.password ? 'border-red-500' : ''}`}
                                        style={{
                                            backgroundColor: `white`,
                                            border: `1px solid ${errors.password ? '#ef4444' : 'rgba(6, 182, 212, 0.2)'}`,
                                            color: `var(--color-text)`
                                        }}
                                        placeholder="Enter password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                                        style={{ color: `var(--color-text-muted)` }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--color-text)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2" style={{ color: `var(--color-text)` }}>Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: `var(--color-text-muted)` }} size={20} />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-cyan-200 outline-none transition-all ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                        style={{
                                            backgroundColor: `white`,
                                            border: `1px solid ${errors.confirmPassword ? '#ef4444' : 'rgba(6, 182, 212, 0.2)'}`,
                                            color: `var(--color-text)`
                                        }}
                                        placeholder="Confirm password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                                        style={{ color: `var(--color-text-muted)` }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--color-text)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2" style={{ color: `var(--color-text)` }}>Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: `var(--color-text-muted)` }} size={20} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-cyan-200 outline-none transition-all ${errors.phone ? 'border-red-500' : ''}`}
                                        style={{
                                            backgroundColor: `white`,
                                            border: `1px solid ${errors.phone ? '#ef4444' : 'rgba(6, 182, 212, 0.2)'}`,
                                            color: `var(--color-text)`
                                        }}
                                        placeholder="Enter 10-digit phone number"
                                        maxLength="10"
                                    />
                                </div>
                                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2" style={{ color: `var(--color-text)` }}>Gender</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                                        className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-left flex items-center justify-between ${errors.gender ? 'border-red-500' : ''}`}
                                        style={{
                                            backgroundColor: `white`,
                                            border: `1px solid ${errors.gender ? '#ef4444' : 'rgba(6, 182, 212, 0.2)'}`,
                                            color: `var(--color-text)`
                                        }}
                                    >
                                        <span style={{ color: formData.gender ? `var(--color-text)` : `var(--color-text-muted)` }}>
                                            {formData.gender || 'Select gender'}
                                        </span>
                                        <ChevronDown className={`w-5 h-5 transition-transform ${showGenderDropdown ? 'rotate-180' : ''}`} style={{ color: `var(--color-text-muted)` }} />
                                    </button>
                                    {showGenderDropdown && (
                                        <div className="absolute z-10 w-full mt-2 rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: `white`, border: `1px solid rgba(6, 182, 212, 0.2)` }}>
                                            {['Male', 'Female', 'Other'].map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData({ ...formData, gender: option });
                                                        setShowGenderDropdown(false);
                                                        if (errors.gender) {
                                                            setErrors({ ...errors, gender: '' });
                                                        }
                                                    }}
                                                    className="w-full px-4 py-3 text-left transition-all"
                                                    style={{ color: `var(--color-text)` }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = 'var(--color-secondary)';
                                                        e.target.style.color = 'white';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = 'transparent';
                                                        e.target.style.color = 'var(--color-text)';
                                                    }}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2" style={{ color: `var(--color-text)` }}>Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: `var(--color-text-muted)` }} size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-cyan-200 outline-none transition-all ${errors.email ? 'border-red-500' : ''}`}
                                    style={{
                                        backgroundColor: `white`,
                                        border: `1px solid ${errors.email ? '#ef4444' : 'rgba(6, 182, 212, 0.2)'}`,
                                        color: `var(--color-text)`
                                    }}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-xl transform hover:scale-[1.02]"
                            style={{
                                backgroundColor: `var(--color-secondary)`,
                                color: `white`,
                                background: `linear-gradient(135deg, var(--color-secondary) 0%, rgba(6, 182, 212, 0.8) 100%)`
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `white` }}></div>
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p style={{ color: `var(--color-text-muted)` }}>
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold hover:underline" style={{ color: `var(--color-secondary)` }}>
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Registration;