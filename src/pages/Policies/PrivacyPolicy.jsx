import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden">

            {/* Hero Section */}
            <section className="relative pt-20 pb-10 md:pt-28 md:pb-14 px-6 text-center bg-slate-50 border-b border-slate-200 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                    {[...Array(12)].map((_, i) => (
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

                <div className="relative z-10 max-w-4xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mx-auto shadow-sm">
                        <Lock size={16} className="text-[var(--color-primary)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Data Protection
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                        Privacy <span className="text-[var(--color-primary)]">Policy</span>
                    </h1>

                    <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        Your privacy is crucial to us. Learn how UNIXA protects and manages your personal information.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Information Collection */}
                    <div className="p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Information We Collect</h2>
                        </div>
                        <p className="text-slate-500 text-lg leading-relaxed mb-4">
                            We collect information to provide better services to our users. This includes information you provide us (like name, email, and address during purchase) and data we get from your use of our services (like usage patterns and device information).
                        </p>
                    </div>

                    {/* How We Use Information */}
                    <div className="p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">How We Use Information</h2>
                        </div>
                        <p className="text-slate-500 text-lg leading-relaxed mb-4">
                            We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect UNIXA and our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads.
                        </p>
                    </div>

                    {/* Data Security */}
                    <div className="p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Data Security</h2>
                        </div>
                        <p className="text-slate-500 text-lg leading-relaxed mb-4">
                            We work hard to protect UNIXA and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold. We restrict access to personal information to UNIXA employees, contractors and agents who need to know that information in order to process it for us.
                        </p>
                    </div>

                    {/* Contact Us */}
                    <div className="p-10 rounded-[40px] text-center bg-slate-900 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                        <h3 className="text-2xl font-bold mb-4 tracking-tight">Questions about Privacy?</h3>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto font-medium mb-6">
                            If you have any questions about this Privacy Policy, please contact us.
                        </p>
                        <a href="mailto:privacy@unixa.com" className="inline-block px-8 py-3 bg-[var(--color-primary)] text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
                            Email Privacy Team
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
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
        </div>
    );
};

export default PrivacyPolicy;
