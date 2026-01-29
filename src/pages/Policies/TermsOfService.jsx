import React from 'react';
import { FileText, Shield, CreditCard, Copyright, AlertTriangle } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const TermsOfService = () => {
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
                        <FileText size={16} className="text-[var(--color-primary)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Legal Agreement
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                        Terms of <span className="text-[var(--color-primary)]">Service</span>
                    </h1>

                    <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        Defining our commitment and your engagement with UNIXA water purification systems.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    {[
                        { icon: <Shield />, title: "1. Use of Website", desc: "By accessing this website, you agree to use it only for lawful purposes. You are prohibited from using the site in a way that damages its functionality or interferes with other users' experience.", color: "bg-blue-50 text-blue-600" },
                        { icon: <FileText />, title: "2. Product Accuracy", desc: "We strive for precision in our product photos and descriptions. However, as our water purifiers are engineered products, slight variations in appearance due to manufacturing processes are normal and within acceptable quality standards.", color: "bg-emerald-50 text-emerald-600" },
                        { icon: <CreditCard />, title: "3. Pricing and Payment", desc: "All prices are in INR and include applicable taxes. We reserve the right to change prices without prior notice. Payments must be made in full before an order is processed for shipping.", color: "bg-orange-50 text-orange-600", note: "Online payment orders cannot be cancelled once placed and payment is processed." },
                        { icon: <Copyright />, title: "4. Intellectual Property", desc: "The UNIXA brand name, logo, images, and content are the exclusive property of UNIXA. Unauthorized use, reproduction, or distribution of these materials is strictly prohibited and may result in legal action.", color: "bg-purple-50 text-purple-600" },
                        { icon: <FileText />, title: "5. Changes to Terms", desc: "We reserve the right to modify these terms at any time. Your continued use of the site following any changes constitutes acceptance of the new terms.", color: "bg-blue-50 text-blue-600" }
                    ].map((section, idx) => (
                        <div key={idx} className="mb-8 p-8 md:p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-2xl ${section.color.split(' ')[0]} flex items-center justify-center ${section.color.split(' ')[1]}`}>
                                    {React.cloneElement(section.icon, { size: 24 })}
                                </div>
                                <h2 className="text-2xl font-black text-slate-900">{section.title}</h2>
                            </div>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                {section.desc}
                            </p>
                            {section.note && (
                                <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3">
                                    <AlertTriangle size={20} className="text-red-500 flex-shrink-0" />
                                    <p className="text-red-600 text-sm font-bold">{section.note}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Last Updated */}
                    <div className="p-10 rounded-[40px] text-center bg-slate-900 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                        <FileText className="w-12 h-12 mx-auto mb-6 text-[var(--color-primary)] opacity-50" />
                        <h3 className="text-2xl font-bold mb-4 tracking-tight">Document Information</h3>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-6 font-medium">
                            These terms of service are effective as of the date mentioned below and govern your use of UNIXA products and services.
                        </p>
                        <div className="inline-block px-6 py-2 bg-white/10 rounded-full border border-white/10">
                            <span className="text-white font-bold text-sm">Last updated: January 2026</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TermsOfService;