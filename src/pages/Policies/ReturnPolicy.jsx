import React from 'react';
import { Shield, CheckCircle, Clock, Mail } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const ReturnPolicy = () => {
    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden">

            {/* Hero Section - Matching Premium Theme */}
            <section className="relative pt-20 pb-10 md:pt-28 md:pb-14 px-6 text-center bg-slate-50 border-b border-slate-200 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden">
                {/* Water Bubbles */}
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
                        <Shield size={16} className="text-[var(--color-primary)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Customer Protection
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                        Return <span className="text-[var(--color-primary)]">Policy</span>
                    </h1>

                    <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        Your satisfaction is our priority. Here's how we handle returns and exchanges with complete transparency.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Quality Guarantee */}
                    <div className="mb-8 p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Quality Guarantee</h2>
                        </div>
                        <p className="text-slate-500 text-lg leading-relaxed mb-4">
                            At UNIXA, we take immense pride in the quality and performance of our water purification systems. All our products come with comprehensive warranty coverage and quality assurance.
                        </p>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            We stand behind every product we manufacture and are committed to ensuring your complete satisfaction with your UNIXA water purifier.
                        </p>
                    </div>

                    {/* Return Process */}
                    <div className="mb-8 p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">30-Day Return Policy</h2>
                        </div>
                        <p className="text-slate-500 text-lg leading-relaxed mb-6">
                            If you're not completely satisfied with your UNIXA water purifier, you can return it within 30 days of delivery for a full refund or exchange.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <h3 className="font-bold text-lg mb-4 text-slate-900 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400" /> What We Accept
                                </h3>
                                <ul className="space-y-3 text-slate-500 font-medium">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-300" /> Unopened original packaging</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-300" /> Manufacturing defects</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-300" /> Wrong items delivered</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-300" /> Damaged during shipping</li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <h3 className="font-bold text-lg mb-4 text-slate-900 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-400" /> Requirements
                                </h3>
                                <ul className="space-y-3 text-slate-500 font-medium">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-300" /> Original receipt</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-300" /> All accessories included</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-300" /> Resalable condition</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-300" /> 30-day initiation</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* How to Return */}
                    <div className="mb-8 p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">How to Return</h2>
                        </div>
                        <p className="text-slate-500 text-lg leading-relaxed mb-8">
                            To initiate a return, please contact our customer service team within 30 days of delivery:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
                                <h3 className="font-bold text-lg mb-4 text-[var(--color-primary)]">Contact Details</h3>
                                <div className="space-y-2 text-slate-600 font-medium text-sm">
                                    <p className="flex justify-between"><span>Email:</span> <span className="font-bold">returns@unixa.com</span></p>
                                    <p className="flex justify-between"><span>Phone:</span> <span className="font-bold">1800-123-UNIXA</span></p>
                                    <p className="flex justify-between"><span>Hours:</span> <span className="font-bold">Mon-Sat, 9 AM - 6 PM</span></p>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                                <h3 className="font-bold text-lg mb-4 text-emerald-700">Processing Time</h3>
                                <div className="space-y-2 text-slate-600 font-medium text-sm">
                                    <p className="flex justify-between"><span>Refund:</span> <span className="font-bold">5-7 business days</span></p>
                                    <p className="flex justify-between"><span>Exchange:</span> <span className="font-bold">3-5 business days</span></p>
                                    <p className="flex justify-between"><span>Pickup:</span> <span className="font-bold">Within 2 business days</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Important Note */}
                    <div className="p-10 rounded-[40px] text-center bg-slate-900 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                        <Clock className="w-12 h-12 mx-auto mb-6 text-[var(--color-primary)] animate-pulse" />
                        <h3 className="text-2xl font-bold mb-4 tracking-tight">Important Support Information</h3>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto font-medium">
                            We strive to ensure every UNIXA water purifier meets the highest quality standards.
                            If you experience any issues, our technical support team is available to help resolve
                            problems before considering a return.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ReturnPolicy;