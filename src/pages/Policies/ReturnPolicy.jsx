import React from 'react';
import { Shield, CheckCircle, Clock, Mail } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const ReturnPolicy = () => {
    return (
        <div style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-text)`, fontFamily: `var(--font-body)` }} className="min-h-screen -mt-12">
            {/* Hero Section */}
            <section className="relative py-16 px-6 text-center overflow-hidden rounded-b-[80px]" style={{ background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)` }}>
                {/* Animated Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="policy-bubble policy-bubble-1"></div>
                    <div className="policy-bubble policy-bubble-2"></div>
                    <div className="policy-bubble policy-bubble-3"></div>
                    <div className="policy-bubble policy-bubble-4"></div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        .policy-bubble {
                            position: absolute;
                            border-radius: 50%;
                            animation: float-policy 18s infinite ease-in-out;
                        }
                        .policy-bubble-1 {
                            width: 100px;
                            height: 100px;
                            background: rgba(248, 250, 252, 0.12);
                            left: 15%;
                            top: 20%;
                            animation-delay: 0s;
                        }
                        .policy-bubble-2 {
                            width: 70px;
                            height: 70px;
                            background: rgba(248, 250, 252, 0.08);
                            right: 20%;
                            top: 30%;
                            animation-delay: 6s;
                        }
                        .policy-bubble-3 {
                            width: 120px;
                            height: 120px;
                            background: rgba(248, 250, 252, 0.15);
                            left: 70%;
                            bottom: 25%;
                            animation-delay: 12s;
                        }
                        .policy-bubble-4 {
                            width: 80px;
                            height: 80px;
                            background: rgba(248, 250, 252, 0.10);
                            right: 60%;
                            bottom: 35%;
                            animation-delay: 3s;
                        }
                        @keyframes float-policy {
                            0%, 100% {
                                transform: translate(0, 0) scale(1);
                                opacity: 0.4;
                            }
                            50% {
                                transform: translate(20px, -30px) scale(1.1);
                                opacity: 0.7;
                            }
                        }
                    `
                }} />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Shield className="w-8 h-8" style={{ color: `var(--color-surface)` }} />
                        <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: `var(--color-surface)` }}>
                            Customer Protection
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: `var(--color-surface)`, fontFamily: `var(--font-heading)` }}>
                        Return Policy
                    </h1>
                    
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: `var(--color-surface)` }}>
                        Your satisfaction is our priority. Here's how we handle returns and exchanges.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Quality Guarantee */}
                    <div className="mb-12 p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(132, 204, 22, 0.15)` }}>
                                <CheckCircle className="w-6 h-6" style={{ color: `var(--color-accent)` }} />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>Quality Guarantee</h2>
                        </div>
                        <p className="text-lg leading-relaxed mb-4" style={{ color: `var(--color-text-muted)` }}>
                            At UNIXA, we take immense pride in the quality and performance of our water purification systems. All our products come with comprehensive warranty coverage and quality assurance.
                        </p>
                        <p className="text-lg leading-relaxed" style={{ color: `var(--color-text-muted)` }}>
                            We stand behind every product we manufacture and are committed to ensuring your complete satisfaction with your UNIXA water purifier.
                        </p>
                    </div>

                    {/* Return Process */}
                    <div className="mb-12 p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(6, 182, 212, 0.15)` }}>
                                <Shield className="w-6 h-6" style={{ color: `var(--color-secondary)` }} />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>30-Day Return Policy</h2>
                        </div>
                        <p className="text-lg leading-relaxed mb-6" style={{ color: `var(--color-text-muted)` }}>
                            If you're not completely satisfied with your UNIXA water purifier, you can return it within 30 days of delivery for a full refund or exchange.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl" style={{ backgroundColor: `rgba(132, 204, 22, 0.05)`, border: `1px solid rgba(132, 204, 22, 0.2)` }}>
                                <h3 className="font-bold text-lg mb-3" style={{ color: `var(--color-accent)` }}>What We Accept</h3>
                                <ul className="space-y-2" style={{ color: `var(--color-text-muted)` }}>
                                    <li>• Unopened products in original packaging</li>
                                    <li>• Products with manufacturing defects</li>
                                    <li>• Wrong items delivered</li>
                                    <li>• Damaged during shipping</li>
                                </ul>
                            </div>
                            
                            <div className="p-6 rounded-xl" style={{ backgroundColor: `rgba(239, 68, 68, 0.05)`, border: `1px solid rgba(239, 68, 68, 0.2)` }}>
                                <h3 className="font-bold text-lg mb-3" style={{ color: `rgba(239, 68, 68, 0.8)` }}>Return Requirements</h3>
                                <ul className="space-y-2" style={{ color: `var(--color-text-muted)` }}>
                                    <li>• Original receipt or order number</li>
                                    <li>• All accessories and manuals included</li>
                                    <li>• Product in resalable condition</li>
                                    <li>• Return initiated within 30 days</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-12 p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(10, 40, 106, 0.15)` }}>
                                <Mail className="w-6 h-6" style={{ color: `var(--color-primary)` }} />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>How to Return</h2>
                        </div>
                        <p className="text-lg leading-relaxed mb-6" style={{ color: `var(--color-text-muted)` }}>
                            To initiate a return, please contact our customer service team within 30 days of delivery:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl" style={{ backgroundColor: `rgba(6, 182, 212, 0.05)`, border: `1px solid rgba(6, 182, 212, 0.2)` }}>
                                <h3 className="font-bold text-lg mb-3" style={{ color: `var(--color-secondary)` }}>Contact Details</h3>
                                <p style={{ color: `var(--color-text-muted)` }}>
                                    <strong>Email:</strong> returns@unixa.com<br/>
                                    <strong>Phone:</strong> 1800-123-UNIXA<br/>
                                    <strong>Hours:</strong> Mon-Sat, 9 AM - 6 PM
                                </p>
                            </div>
                            
                            <div className="p-6 rounded-xl" style={{ backgroundColor: `rgba(132, 204, 22, 0.05)`, border: `1px solid rgba(132, 204, 22, 0.2)` }}>
                                <h3 className="font-bold text-lg mb-3" style={{ color: `var(--color-accent)` }}>Processing Time</h3>
                                <p style={{ color: `var(--color-text-muted)` }}>
                                    <strong>Refund:</strong> 5-7 business days<br/>
                                    <strong>Exchange:</strong> 3-5 business days<br/>
                                    <strong>Pickup:</strong> Within 2 business days
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Important Note */}
                    <div className="p-8 rounded-2xl text-center" style={{ background: `linear-gradient(135deg, rgba(10, 40, 106, 0.05), rgba(6, 182, 212, 0.05))`, border: `1px solid var(--color-border)` }}>
                        <Clock className="w-12 h-12 mx-auto mb-4" style={{ color: `var(--color-secondary)` }} />
                        <h3 className="text-xl font-bold mb-4" style={{ color: `var(--color-primary)` }}>Important Note</h3>
                        <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: `var(--color-text-muted)` }}>
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