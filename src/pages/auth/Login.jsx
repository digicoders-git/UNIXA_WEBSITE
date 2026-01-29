import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

import { loginUserApi } from '../../api/user';
import { saveToken } from '../../utils/auth';
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/Navbar/Navbar';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const response = await loginUserApi(formData);
            if (response.token) {
                saveToken(response.token);
                toast.success('Login successful!');
                navigate('/');
            }
        } catch (error) {
            console.error("Login Error:", error);
            const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4 py-8 -mb-20 relative overflow-hidden" style={{ backgroundColor: `var(--color-surface)` }}>
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
                        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: `var(--color-primary)` }}>Welcome Back</h2>
                        <p className="text-sm md:text-base" style={{ color: `var(--color-text-muted)` }}>Sign in to your UNIXA account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2" style={{ color: `var(--color-text)` }}>Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: `var(--color-text-muted)` }} size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                                    style={{ 
                                        backgroundColor: `white`, 
                                        border: `1px solid rgba(6, 182, 212, 0.2)`, 
                                        color: `var(--color-text)`
                                    }}
                                    placeholder="Enter your email"
                                />
                            </div>

                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2" style={{ color: `var(--color-text)` }}>Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: `var(--color-text-muted)` }} size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                                    style={{ 
                                        backgroundColor: `white`, 
                                        border: `1px solid rgba(6, 182, 212, 0.2)`, 
                                        color: `var(--color-text)`
                                    }}
                                    placeholder="Enter your password"
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
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p style={{ color: `var(--color-text-muted)` }}>
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold hover:underline" style={{ color: `var(--color-secondary)` }}>
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;