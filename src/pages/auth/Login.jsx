import React, { useState } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, Shield, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { saveToken, getToken } from '../../utils/auth';
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/Navbar/Navbar';

const Login = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Enter mobile/email, 2: Enter OTP
    const [formData, setFormData] = useState({
        identifier: '', // mobile or email
        otp: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'identifier') {
            // Allow both email and phone number
            setFormData({ ...formData, [name]: value });
        } else if (name === 'otp') {
            // Only allow numbers for OTP and limit to 6 digits
            const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 6);
            setFormData({ ...formData, [name]: numbersOnly });
        }
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        
        if (!formData.identifier.trim()) {
            toast.error('Please enter your mobile number or email');
            return;
        }

        // Basic validation
        const isEmail = /\S+@\S+\.\S+/.test(formData.identifier);
        const isPhone = /^[6-9]\d{9}$/.test(formData.identifier);
        
        if (!isEmail && !isPhone) {
            toast.error('Please enter a valid mobile number or email address');
            return;
        }

        setIsLoading(true);
        try {
            // Real API call to send OTP
            const { data } = await api.post('/users/auth/send-otp', {
                identifier: formData.identifier
            });
            
            setOtpSent(true);
            setStep(2);
            toast.success('OTP sent successfully!');
        } catch (error) {
            console.error("Send OTP Error:", error);
            if (error.response?.status === 404) {
                toast.error('User not found. Please register first.');
            } else {
                toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        
        if (!formData.otp) {
            toast.error('Please enter the OTP');
            return;
        }

        setIsLoading(true);
        try {
            // Real API call to verify OTP and login
            const loginData = {
                identifier: formData.identifier,
                otp: formData.otp
            };
            
            const response = await api.post('/users/auth/verify-otp', loginData);
            const { token, user } = response.data;
            
            saveToken(token);
            localStorage.setItem('userId', user._id || user.id);
            localStorage.setItem('userData', JSON.stringify(user));
            
            // Clear old guest cart
            localStorage.removeItem('sks_cart_guest');
            
            toast.success('Login successful!');
            
            // Force navbar to update auth state
            window.dispatchEvent(new Event('storage'));
            
            // Direct redirect to user panel with token
            const dashboardUrl = import.meta.env.VITE_USER_PANEL_URL || 'http://localhost:5176';
            window.location.href = `${dashboardUrl}/login?token=${token}`;
            
        } catch (error) {
            console.error("OTP Verification Error:", error);
            if (error.response?.status === 400) {
                toast.error('Invalid OTP. Please try again.');
            } else if (error.response?.status === 404) {
                toast.error('User not found. Please register first.');
            } else {
                toast.error(error.response?.data?.message || 'Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserPanelRedirect = () => {
        const token = getToken();
        if (!token) {
            toast.error('Please login first');
            return;
        }
        
        const dashboardUrl = import.meta.env.VITE_USER_PANEL_URL || 'http://localhost:5176';
        localStorage.setItem('userPanelToken', token);
        window.location.href = `${dashboardUrl}/dashboard`;
    };

    const resetForm = () => {
        setStep(1);
        setFormData({ identifier: '', otp: '' });
        setOtpSent(false);
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-80px)] mt-20 flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ backgroundColor: `var(--color-surface)` }}>
                {/* Animated Background Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="auth-bubble auth-bubble-1"></div>
                    <div className="auth-bubble auth-bubble-2"></div>
                    <div className="auth-bubble auth-bubble-3"></div>
                    <div className="auth-bubble auth-bubble-4"></div>
                    <div className="auth-bubble auth-bubble-5"></div>
                    <div className="auth-bubble auth-bubble-6"></div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        .auth-bubble {
                            position: absolute;
                            background: rgba(132, 204, 22, 0.15);
                            border: 1px solid rgba(132, 204, 22, 0.2);
                            border-radius: 50%;
                            animation: float-auth-bubble 20s infinite ease-in-out;
                        }
                        .auth-bubble-1 { width: 120px; height: 120px; left: 5%; top: 15%; animation-delay: 0s; }
                        .auth-bubble-2 { width: 80px; height: 80px; right: 10%; top: 25%; animation-delay: 3s; }
                        .auth-bubble-3 { width: 150px; height: 150px; left: 15%; bottom: 20%; animation-delay: 6s; }
                        .auth-bubble-4 { width: 100px; height: 100px; right: 20%; bottom: 15%; animation-delay: 9s; }
                        .auth-bubble-5 { width: 60px; height: 60px; left: 50%; top: 10%; animation-delay: 12s; }
                        .auth-bubble-6 { width: 90px; height: 90px; right: 45%; bottom: 30%; animation-delay: 15s; }
                        @keyframes float-auth-bubble {
                            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
                            25% { transform: translate(30px, -40px) scale(1.1); opacity: 0.7; }
                            50% { transform: translate(-20px, -60px) scale(0.9); opacity: 0.5; }
                            75% { transform: translate(40px, -30px) scale(1.05); opacity: 0.8; }
                        }
                    `
                }} />

                <div className="max-w-md w-full rounded-3xl shadow-2xl p-6 md:p-8 relative z-10 backdrop-blur-sm" style={{ backgroundColor: `rgba(248, 250, 252, 0.95)`, border: `1px solid rgba(6, 182, 212, 0.2)`, boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.25)' }}>
                    <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: `var(--color-primary)` }}>
                            {step === 1 ? 'Welcome Back' : 'Verify OTP'}
                        </h2>
                        <p className="text-sm md:text-base" style={{ color: `var(--color-text-muted)` }}>
                            {step === 1 ? 'Sign in to your UNIXA account' : 'Enter the OTP sent to your mobile/email'}
                        </p>
                    </div>

                    {step === 1 ? (
                        // Step 1: Enter Mobile/Email
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSendOTP}>
                            <div>
                                <label className="block text-sm font-bold mb-2" style={{ color: `var(--color-text)` }}>
                                    Mobile Number or Email
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        {formData.identifier.includes('@') ? 
                                            <Mail style={{ color: `var(--color-text-muted)` }} size={20} /> :
                                            <Phone style={{ color: `var(--color-text-muted)` }} size={20} />
                                        }
                                    </div>
                                    <input
                                        type="text"
                                        name="identifier"
                                        value={formData.identifier}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                                        style={{
                                            backgroundColor: `white`,
                                            border: `1px solid rgba(6, 182, 212, 0.2)`,
                                            color: `var(--color-text)`
                                        }}
                                        placeholder="Enter mobile number or email"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-xl transform hover:scale-[1.01]"
                                style={{
                                    backgroundColor: `var(--color-secondary)`,
                                    color: `white`,
                                    background: `linear-gradient(135deg, var(--color-secondary) 0%, rgba(6, 182, 212, 0.8) 100%)`
                                }}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Send OTP
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        // Step 2: Enter OTP
                        <form className="space-y-4 md:space-y-6" onSubmit={handleVerifyOTP}>
                            <div>
                                <label className="block text-sm font-bold mb-2" style={{ color: `var(--color-text)` }}>
                                    Enter OTP
                                </label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: `var(--color-text-muted)` }} size={20} />
                                    <input
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-center text-lg font-bold tracking-widest"
                                        style={{
                                            backgroundColor: `white`,
                                            border: `1px solid rgba(6, 182, 212, 0.2)`,
                                            color: `var(--color-text)`
                                        }}
                                        placeholder="123456"
                                        maxLength="6"
                                    />
                                </div>
                                <p className="text-xs mt-2 text-center" style={{ color: `var(--color-text-muted)` }}>
                                    OTP sent to: {formData.identifier}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-xl transform hover:scale-[1.01]"
                                    style={{
                                        backgroundColor: `var(--color-secondary)`,
                                        color: `white`,
                                        background: `linear-gradient(135deg, var(--color-secondary) 0%, rgba(6, 182, 212, 0.8) 100%)`
                                    }}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Login to Website'
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleUserPanelRedirect}
                                    disabled={isLoading || formData.otp !== '123456'}
                                    className="w-full py-3 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50 border-2 hover:bg-slate-50 flex items-center justify-center gap-2 transform hover:scale-[1.01]"
                                    style={{
                                        borderColor: `var(--color-primary)`,
                                        color: `var(--color-primary)`
                                    }}
                                >
                                    Go to User Panel
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={resetForm}
                                className="w-full text-sm font-bold hover:underline"
                                style={{ color: `var(--color-text-muted)` }}
                            >
                                ← Change Mobile/Email
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <p style={{ color: `var(--color-text-muted)` }}>
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold hover:underline" style={{ color: `var(--color-secondary)` }}>
                                Create Account
                            </Link>
                        </p>
                    </div>

                    {step === 2 && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                            <p className="text-xs text-blue-600 text-center font-bold">
                                Demo OTP: 123456
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;