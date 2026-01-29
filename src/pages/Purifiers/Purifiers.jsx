import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Award } from 'lucide-react';
import ProductCard from '../../components/cards/PurifierCard';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';

const Purifiers = () => {
    // Shared high-quality image for all products to ensure visibility
    const sharedImg = "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop";

    // Static Data for Products (Japanese Hybrid Technology Models)
    const products = [
        {
            _id: '1',
            name: 'HydroLife Alkaline Pro',
            mainImage: { url: sharedImg },
            price: 45000,
            finalPrice: 39999,
            discountPercent: 11,
            description: 'Advanced 11-stage ionization with Platinum plates. Delivers mineral-rich alkaline water.',
            category: { name: 'Premium' }
        },
        {
            _id: '2',
            name: 'NanoPure Smart',
            mainImage: { url: sharedImg },
            price: 25000,
            finalPrice: 19999,
            discountPercent: 20,
            description: 'Compact Under-sink design for modern kitchens. Space-saving yet powerful filtration.',
            category: { name: 'Smart' }
        },
        {
            _id: '3',
            name: 'SilverStream RO+',
            mainImage: { url: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2070&auto=format&fit=crop" },
            price: 15000,
            finalPrice: 12999,
            discountPercent: 13,
            description: 'Superior RO purification with mineral boost. Ideal for high TDS water sources.',
            category: { name: 'Standard' }
        },
        {
            _id: '4',
            name: 'AquaZen Elite',
            mainImage: { url: sharedImg },
            price: 55000,
            finalPrice: 49999,
            discountPercent: 9,
            description: 'Supreme ionization technology with smart touchscreen controls. The future of hydration.',
            category: { name: 'Luxury' }
        }
    ];

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Simple loading simulation
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-[var(--color-surface)] min-h-screen">

            {/* Catalog Hero - Immersive Liquid Water Style */}
            <section className="relative py-12 md:py-20 px-6 text-center overflow-hidden rounded-b-[40px] md:rounded-b-[100px] bg-gradient-to-b from-[#0EA5E9] via-[#38BDF8] to-[#BAE6FD]">
                {/* Animated Liquid Waves */}
                <div className="absolute inset-0 pointer-events-none opacity-50 overflow-hidden">
                    <svg className="absolute bottom-0 left-0 w-full h-[150px] md:h-[200px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                            <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use href="#gentle-wave" x="48" y="7" fill="#fff" />
                        </g>
                    </svg>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    .parallax > use { animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite; }
                    .parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
                    .parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
                    .parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
                    .parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }
                    @keyframes move-forever { 0% { transform: translate3d(-90px,0,0); } 100% { transform: translate3d(85px,0,0); } }
                `}} />

                <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-fade-in px-4">
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg mx-auto">
                        <Award size={18} className="text-white" />
                        <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white">
                            Pure Alkaline Series
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter font-[var(--font-heading)] leading-none drop-shadow-2xl">
                        HydroLife <span className="text-white/90">Series</span>
                    </h1>

                    <p className="text-white text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-bold drop-shadow-lg">
                        Japan's premium hydration technology. Every drop is a promise of health, purity, and absolute rejuvenation.
                    </p>
                </div>
            </section>

            {/* Catalog Grid */}
            <section className="py-12 px-6 md:px-12 bg-white relative z-10 -mt-8 md:-mt-12 rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="py-20 md:py-32 flex flex-col items-center">
                            <Loader text="Calibrating Purity Standards..." />
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col items-center text-center mb-12 md:mb-16 space-y-4">
                                <div className="space-y-3">
                                    <h2 className="text-3xl md:text-6xl font-black text-[var(--color-secondary)] tracking-tighter leading-none">
                                        Select Your <span className="text-[var(--color-primary)]">System</span>
                                    </h2>
                                    <div className="w-16 md:w-20 h-1.5 md:h-2 bg-[var(--color-primary)] mx-auto rounded-full mb-3 md:mb-4"></div>
                                    <p className="text-slate-400 font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs">
                                        Total Collection: {products.length} Premium Models
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-16">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={{
                                            id: product._id,
                                            name: product.name,
                                            img: product.mainImage?.url,
                                            price: product.price,
                                            finalPrice: product.finalPrice,
                                            discountPercent: product.discountPercent,
                                            description: product.description,
                                            category: product.category?.name || 'HydroLife'
                                        }}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Purifiers;