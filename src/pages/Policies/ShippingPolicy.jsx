import React from 'react';
import { Truck, MapPin, Package, Clock, Shield } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const ShippingPolicy = () => {
    return (
        <div style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-text)`, fontFamily: `var(--font-body)` }} className="min-h-screen -mt-12">
            {/* Hero Section */}
            <section className="relative py-16 px-6 text-center overflow-hidden rounded-b-[80px]" style={{ background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)` }}>
                {/* Animated Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="shipping-bubble shipping-bubble-1"></div>
                    <div className="shipping-bubble shipping-bubble-2"></div>
                    <div className="shipping-bubble shipping-bubble-3"></div>
                    <div className="shipping-bubble shipping-bubble-4"></div>
                    <div className="shipping-bubble shipping-bubble-5"></div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        .shipping-bubble {
                            position: absolute;
                            border-radius: 50%;
                            animation: float-shipping 20s infinite ease-in-out;
                        }
                        .shipping-bubble-1 {
                            width: 90px;
                            height: 90px;
                            background: rgba(248, 250, 252, 0.10);
                            left: 12%;
                            top: 18%;
                            animation-delay: 0s;
                        }
                        .shipping-bubble-2 {
                            width: 60px;
                            height: 60px;
                            background: rgba(248, 250, 252, 0.15);
                            right: 18%;
                            top: 25%;
                            animation-delay: 4s;
                        }
                        .shipping-bubble-3 {
                            width: 110px;
                            height: 110px;
                            background: rgba(248, 250, 252, 0.08);
                            left: 65%;
                            bottom: 20%;
                            animation-delay: 8s;
                        }
                        .shipping-bubble-4 {
                            width: 75px;
                            height: 75px;
                            background: rgba(248, 250, 252, 0.12);
                            right: 55%;
                            bottom: 30%;
                            animation-delay: 12s;
                        }
                        .shipping-bubble-5 {
                            width: 50px;
                            height: 50px;
                            background: rgba(248, 250, 252, 0.18);
                            left: 40%;
                            top: 15%;
                            animation-delay: 16s;
                        }
                        @keyframes float-shipping {
                            0%, 100% {
                                transform: translate(0, 0) scale(1);
                                opacity: 0.3;
                            }
                            50% {
                                transform: translate(25px, -35px) scale(1.15);
                                opacity: 0.6;
                            }
                        }
                    `
                }} />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Truck className="w-8 h-8" style={{ color: `var(--color-surface)` }} />
                        <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: `var(--color-surface)` }}>
                            Fast & Secure Delivery
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: `var(--color-surface)`, fontFamily: `var(--font-heading)` }}>
                        Shipping Policy
                    </h1>
                    
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: `var(--color-surface)` }}>
                        Delivering pure water solutions to your doorstep safely and swiftly across India.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    {/* Delivery Timeline */}
                    <div className="mb-12 p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(6, 182, 212, 0.15)` }}>
                                <Clock className="w-6 h-6" style={{ color: `var(--color-secondary)` }} />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>Delivery Timeline</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `rgba(10, 40, 106, 0.05)`, border: `1px solid rgba(10, 40, 106, 0.2)` }}>
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `rgba(10, 40, 106, 0.15)` }}>
                                    <Package className="w-8 h-8" style={{ color: `var(--color-primary)` }} />
                                </div>
                                <h3 className="font-bold text-lg mb-2" style={{ color: `var(--color-primary)` }}>Processing</h3>
                                <p className="text-2xl font-bold mb-2" style={{ color: `var(--color-secondary)` }}>1-2 Days</p>
                                <p className="text-sm" style={{ color: `var(--color-text-muted)` }}>Quality check & packaging</p>
                            </div>
                            
                            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `rgba(6, 182, 212, 0.05)`, border: `1px solid rgba(6, 182, 212, 0.2)` }}>
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `rgba(6, 182, 212, 0.15)` }}>
                                    <MapPin className="w-8 h-8" style={{ color: `var(--color-secondary)` }} />
                                </div>
                                <h3 className="font-bold text-lg mb-2" style={{ color: `var(--color-primary)` }}>Metro Cities</h3>
                                <p className="text-2xl font-bold mb-2" style={{ color: `var(--color-secondary)` }}>3-5 Days</p>
                                <p className="text-sm" style={{ color: `var(--color-text-muted)` }}>Delhi, Mumbai, Bangalore, etc.</p>
                            </div>
                            
                            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `rgba(132, 204, 22, 0.05)`, border: `1px solid rgba(132, 204, 22, 0.2)` }}>
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `rgba(132, 204, 22, 0.15)` }}>
                                    <Truck className="w-8 h-8" style={{ color: `var(--color-accent)` }} />
                                </div>
                                <h3 className="font-bold text-lg mb-2" style={{ color: `var(--color-primary)` }}>Other Cities</h3>
                                <p className="text-2xl font-bold mb-2" style={{ color: `var(--color-secondary)` }}>5-7 Days</p>
                                <p className="text-sm" style={{ color: `var(--color-text-muted)` }}>Rest of India</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Charges & Installation */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(132, 204, 22, 0.15)` }}>
                                    <Package className="w-6 h-6" style={{ color: `var(--color-accent)` }} />
                                </div>
                                <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>Free Services</h2>
                            </div>
                            <ul className="space-y-4" style={{ color: `var(--color-text-muted)` }}>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-accent)` }}></div>
                                    <span>Free shipping on orders above ₹15,000</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-accent)` }}></div>
                                    <span>Professional installation included</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-accent)` }}></div>
                                    <span>Demo and training provided</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-accent)` }}></div>
                                    <span>1-year warranty activation</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(6, 182, 212, 0.15)` }}>
                                    <Shield className="w-6 h-6" style={{ color: `var(--color-secondary)` }} />
                                </div>
                                <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>Secure Packaging</h2>
                            </div>
                            <ul className="space-y-4" style={{ color: `var(--color-text-muted)` }}>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-secondary)` }}></div>
                                    <span>Multi-layer protective packaging</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-secondary)` }}></div>
                                    <span>Shock-resistant foam inserts</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-secondary)` }}></div>
                                    <span>Tamper-proof sealing</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-secondary)` }}></div>
                                    <span>Real-time tracking provided</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Shipping Zones */}
                    <div className="mb-12 p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(10, 40, 106, 0.15)` }}>
                                <MapPin className="w-6 h-6" style={{ color: `var(--color-primary)` }} />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>Delivery Zones</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `rgba(132, 204, 22, 0.05)`, border: `1px solid rgba(132, 204, 22, 0.2)` }}>
                                <h3 className="font-bold text-lg mb-2" style={{ color: `var(--color-accent)` }}>Zone 1</h3>
                                <p className="text-sm mb-2" style={{ color: `var(--color-text-muted)` }}>Same State</p>
                                <p className="font-bold" style={{ color: `var(--color-secondary)` }}>₹200</p>
                            </div>
                            
                            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `rgba(6, 182, 212, 0.05)`, border: `1px solid rgba(6, 182, 212, 0.2)` }}>
                                <h3 className="font-bold text-lg mb-2" style={{ color: `var(--color-secondary)` }}>Zone 2</h3>
                                <p className="text-sm mb-2" style={{ color: `var(--color-text-muted)` }}>Metro Cities</p>
                                <p className="font-bold" style={{ color: `var(--color-secondary)` }}>₹350</p>
                            </div>
                            
                            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `rgba(10, 40, 106, 0.05)`, border: `1px solid rgba(10, 40, 106, 0.2)` }}>
                                <h3 className="font-bold text-lg mb-2" style={{ color: `var(--color-primary)` }}>Zone 3</h3>
                                <p className="text-sm mb-2" style={{ color: `var(--color-text-muted)` }}>Other Cities</p>
                                <p className="font-bold" style={{ color: `var(--color-secondary)` }}>₹500</p>
                            </div>
                            
                            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `rgba(132, 204, 22, 0.05)`, border: `1px solid rgba(132, 204, 22, 0.2)` }}>
                                <h3 className="font-bold text-lg mb-2" style={{ color: `var(--color-accent)` }}>Remote</h3>
                                <p className="text-sm mb-2" style={{ color: `var(--color-text-muted)` }}>Hill Stations</p>
                                <p className="font-bold" style={{ color: `var(--color-secondary)` }}>₹750</p>
                            </div>
                        </div>
                    </div>

                    {/* Important Notice */}
                    <div className="p-8 rounded-2xl text-center" style={{ background: `linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(132, 204, 22, 0.05))`, border: `1px solid var(--color-border)` }}>
                        <Truck className="w-12 h-12 mx-auto mb-4" style={{ color: `var(--color-secondary)` }} />
                        <h3 className="text-xl font-bold mb-4" style={{ color: `var(--color-primary)` }}>Installation & Support</h3>
                        <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-4" style={{ color: `var(--color-text-muted)` }}>
                            Our certified technicians will install your UNIXA water purifier and provide complete training on its operation and maintenance. 
                            Installation is scheduled within 24-48 hours of delivery.
                        </p>
                        <p className="font-semibold" style={{ color: `var(--color-secondary)` }}>
                            For any delivery queries, call us at 1800-123-UNIXA
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ShippingPolicy;