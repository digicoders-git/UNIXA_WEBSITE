import React from 'react';
import { Truck, MapPin, Package, Clock, Shield } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const ShippingPolicy = () => {
    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden">

            {/* Hero Section - Matching Premium Theme */}
            <section className="relative pt-20 pb-10 md:pt-28 md:pb-14 px-6 text-center bg-slate-50 border-b border-slate-200 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden">
                {/* Water Bubbles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                    {[...Array(15)].map((_, i) => (
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
                        <Truck size={16} className="text-[var(--color-primary)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Fast & Secure Delivery
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                        Shipping <span className="text-[var(--color-primary)]">Policy</span>
                    </h1>

                    <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        Delivering pure water solutions to your doorstep safely and swiftly across India.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    {/* Delivery Timeline */}
                    <div className="mb-12 p-8 md:p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Delivery Timeline</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: <Package />, title: "Processing", time: "1-2 Days", desc: "Quality check & packaging", bg: "bg-blue-50", text: "text-blue-600" },
                                { icon: <MapPin />, title: "Metro Cities", time: "3-5 Days", desc: "Delhi, Mumbai, Bangalore, etc.", bg: "bg-emerald-50", text: "text-emerald-600" },
                                { icon: <Truck />, title: "Other Cities", time: "5-7 Days", desc: "Rest of India", bg: "bg-orange-50", text: "text-orange-600" }
                            ].map((item, idx) => (
                                <div key={idx} className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 text-center transition-transform hover:-translate-y-2">
                                    <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-6 ${item.text}`}>
                                        {React.cloneElement(item.icon, { size: 32 })}
                                    </div>
                                    <h3 className="font-black text-slate-900 text-lg mb-2">{item.title}</h3>
                                    <p className={`text-3xl font-black mb-2 ${item.text}`}>{item.time}</p>
                                    <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Charges & Installation */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 md:p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Free Services</h2>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Free shipping on orders above ₹15,000",
                                    "Professional installation included",
                                    "Demo and training provided",
                                    "1-year warranty activation"
                                ].map((text, i) => (
                                    <li key={i} className="flex items-center gap-4 text-slate-500 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 md:p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Secure Packaging</h2>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Multi-layer protective packaging",
                                    "Shock-resistant foam inserts",
                                    "Tamper-proof sealing",
                                    "Real-time tracking provided"
                                ].map((text, i) => (
                                    <li key={i} className="flex items-center gap-4 text-slate-500 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Shipping Zones */}
                    <div className="mb-12 p-8 md:p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Delivery Zones</h2>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Zone 1", desc: "Same State", price: "₹200", color: "text-blue-600" },
                                { title: "Zone 2", desc: "Metro Cities", price: "₹350", color: "text-emerald-600" },
                                { title: "Zone 3", desc: "Other Cities", price: "₹500", color: "text-orange-600" },
                                { title: "Remote", desc: "Hill Stations", price: "₹750", color: "text-purple-600" }
                            ].map((zone, idx) => (
                                <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                                    <h3 className="font-black text-slate-900 mb-1">{zone.title}</h3>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">{zone.desc}</p>
                                    <p className={`text-2xl font-black ${zone.color}`}>{zone.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Important Notice */}
                    <div className="p-10 rounded-[40px] text-center bg-slate-50 border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Truck size={120} className="rotate-12" />
                        </div>
                        <Truck className="w-12 h-12 mx-auto mb-6 text-[var(--color-primary)]" />
                        <h3 className="text-2xl font-black mb-4 text-slate-900">Installation & Support</h3>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-3xl mx-auto mb-6 font-medium">
                            Our certified technicians will install your UNIXA water purifier and provide complete training on its operation and maintenance.
                            Installation is scheduled within 24-48 hours of delivery.
                        </p>
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-slate-600 font-bold">24/7 Helpline: 1800-123-UNIXA</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ShippingPolicy;