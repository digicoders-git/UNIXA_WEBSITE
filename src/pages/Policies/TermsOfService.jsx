import React from 'react';
import { FileText, Shield, CreditCard, Copyright, AlertTriangle } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const TermsOfService = () => {
    return (
        <div style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-text)`, fontFamily: `var(--font-body)` }} className="min-h-screen -mt-12">
            {/* Hero Section */}
            <section className="relative py-16 px-6 text-center overflow-hidden rounded-b-[80px]" style={{ background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)` }}>
                {/* Animated Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="terms-bubble terms-bubble-1"></div>
                    <div className="terms-bubble terms-bubble-2"></div>
                    <div className="terms-bubble terms-bubble-3"></div>
                    <div className="terms-bubble terms-bubble-4"></div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        .terms-bubble {
                            position: absolute;
                            border-radius: 50%;
                            animation: float-terms 22s infinite ease-in-out;
                        }
                        .terms-bubble-1 {
                            width: 95px;
                            height: 95px;
                            background: rgba(248, 250, 252, 0.11);
                            left: 10%;
                            top: 22%;
                            animation-delay: 0s;
                        }
                        .terms-bubble-2 {
                            width: 65px;
                            height: 65px;
                            background: rgba(248, 250, 252, 0.14);
                            right: 15%;
                            top: 28%;
                            animation-delay: 5s;
                        }
                        .terms-bubble-3 {
                            width: 115px;
                            height: 115px;
                            background: rgba(248, 250, 252, 0.09);
                            left: 68%;
                            bottom: 18%;
                            animation-delay: 10s;
                        }
                        .terms-bubble-4 {
                            width: 85px;
                            height: 85px;
                            background: rgba(248, 250, 252, 0.13);
                            right: 58%;
                            bottom: 32%;
                            animation-delay: 15s;
                        }
                        @keyframes float-terms {
                            0%, 100% {
                                transform: translate(0, 0) scale(1);
                                opacity: 0.35;
                            }
                            50% {
                                transform: translate(22px, -28px) scale(1.12);
                                opacity: 0.65;
                            }
                        }
                    `
                }} />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <FileText className="w-8 h-8" style={{ color: `var(--color-surface)` }} />
                        <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: `var(--color-surface)` }}>
                            Legal Agreement
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: `var(--color-surface)`, fontFamily: `var(--font-heading)` }}>
                        Terms of Service
                    </h1>
                    
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: `var(--color-surface)` }}>
                        Defining our commitment and your engagement with UNIXA water purification systems.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Website Usage */}
                    <div className="mb-12 p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(10, 40, 106, 0.15)` }}>
                                <Shield className="w-6 h-6" style={{ color: `var(--color-primary)` }} />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>1. Use of Website</h2>
                        </div>
                        <p className="text-lg leading-relaxed" style={{ color: `var(--color-text-muted)` }}>
                            By accessing this website, you agree to use it only for lawful purposes. You are prohibited from using the site in a way that damages its functionality or interferes with other users' experience.
                        </p>
                    </div>

                    {/* Product Accuracy */}
                    <div className="mb-12 p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(6, 182, 212, 0.15)` }}>
                                <FileText className="w-6 h-6" style={{ color: `var(--color-secondary)` }} />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>2. Product Accuracy</h2>
                        </div>
                        <p className="text-lg leading-relaxed" style={{ color: `var(--color-text-muted)` }}>
                            We strive for precision in our product photos and descriptions. However, as our water purifiers are engineered products, slight variations in appearance due to manufacturing processes are normal and within acceptable quality standards.
                        </p>
                    </div>

                    {/* Pricing and Payment */}
                    <div className="mb-12 p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(132, 204, 22, 0.15)` }}>
                                <CreditCard className="w-6 h-6" style={{ color: `var(--color-accent)` }} />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>3. Pricing and Payment</h2>
                        </div>
                        <p className="text-lg leading-relaxed mb-4" style={{ color: `var(--color-text-muted)` }}>
                            All prices are in INR and include applicable taxes. We reserve the right to change prices without prior notice. Payments must be made in full before an order is processed for shipping.
                        </p>
                        <div className="p-4 rounded-lg" style={{ backgroundColor: `rgba(239, 68, 68, 0.05)`, border: `1px solid rgba(239, 68, 68, 0.2)` }}>
                            <p className="font-semibold" style={{ color: `rgba(239, 68, 68, 0.8)` }}>
                                <AlertTriangle className="w-5 h-5 inline mr-2" />
                                Online payment orders cannot be cancelled once placed and payment is processed.
                            </p>
                        </div>
                    </div>

                    {/* Intellectual Property */}
                    <div className="mb-12 p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(10, 40, 106, 0.15)` }}>
                                <Copyright className="w-6 h-6" style={{ color: `var(--color-primary)` }} />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>4. Intellectual Property</h2>
                        </div>
                        <p className="text-lg leading-relaxed" style={{ color: `var(--color-text-muted)` }}>
                            The UNIXA brand name, logo, images, and content are the exclusive property of UNIXA. Unauthorized use, reproduction, or distribution of these materials is strictly prohibited and may result in legal action.
                        </p>
                    </div>

                    {/* Changes to Terms */}
                    <div className="mb-12 p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(6, 182, 212, 0.15)` }}>
                                <FileText className="w-6 h-6" style={{ color: `var(--color-secondary)` }} />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>5. Changes to Terms</h2>
                        </div>
                        <p className="text-lg leading-relaxed" style={{ color: `var(--color-text-muted)` }}>
                            We reserve the right to modify these terms at any time. Your continued use of the site following any changes constitutes acceptance of the new terms. We recommend reviewing these terms periodically.
                        </p>
                    </div>

                    {/* Last Updated */}
                    <div className="p-8 rounded-2xl text-center" style={{ background: `linear-gradient(135deg, rgba(10, 40, 106, 0.05), rgba(6, 182, 212, 0.05))`, border: `1px solid var(--color-border)` }}>
                        <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: `var(--color-secondary)` }} />
                        <h3 className="text-xl font-bold mb-4" style={{ color: `var(--color-primary)` }}>Document Information</h3>
                        <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-4" style={{ color: `var(--color-text-muted)` }}>
                            These terms of service are effective as of the date mentioned below and govern your use of UNIXA products and services.
                        </p>
                        <p className="font-semibold" style={{ color: `var(--color-secondary)` }}>
                            Last updated: January 2026
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TermsOfService;