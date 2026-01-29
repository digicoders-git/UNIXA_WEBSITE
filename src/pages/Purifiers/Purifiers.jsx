import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Award } from 'lucide-react';
import ProductCard from '../../components/cards/PurifierCard';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';
import UnixaBrand from '../../components/common/UnixaBrand';

const Purifiers = () => {
    // Shared high-quality image for all products to ensure visibility
    const sharedImg = "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop";

    // Static Data for Products (Pure Hybrid Technology Models)
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

            {/* Catalog Hero - Clean Light Theme */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 text-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white border-b border-slate-100 rounded-b-[40px] md:rounded-b-[80px]">
                {/* Water Bubbles Effect - High Visibility */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-blue-300/40 border border-white/40 blur-[0.5px] animate-float-bubble"
                            style={{
                                width: `${Math.random() * 50 + 15}px`,
                                height: `${Math.random() * 50 + 15}px`,
                                left: `${Math.random() * 100}%`,
                                bottom: `-${Math.random() * 20 + 20}%`,
                                animationDuration: `${Math.random() * 4 + 4}s`,
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

                {/* Subtle Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-[var(--color-primary)]/10 blur-[100px] rounded-full" />
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-400/10 blur-[100px] rounded-full" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-3 animate-fade-in px-4">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-slate-200 rounded-full mx-auto shadow-sm">
                        <Award size={16} className="text-[var(--color-primary)]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
                            Pure Alkaline Series
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 leading-none">
                        <UnixaBrand className="text-4xl md:text-7xl" color="var(--color-secondary)" /> <span className="text-[var(--color-primary)]">Series</span>
                    </h1>

                    <p className="text-slate-500 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        Advanced premium hydration technology. Every drop is a promise of health, purity, and excellence.
                    </p>
                </div>

                {/* Bottom Overlay - Matching other pages */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none" />
            </section>

            {/* Catalog Grid */}
            <section className="py-12 px-6 md:px-12 bg-white relative z-10">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="py-20 md:py-32 flex flex-col items-center">
                            <Loader text="Calibrating Purity Standards..." />
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col items-center text-center mb-12 md:mb-16 space-y-4">
                                <div className="space-y-3">
                                    <h2 className="text-3xl md:text-6xl font-bold text-[var(--color-secondary)] tracking-tighter leading-none font-[var(--font-heading)]">
                                        Select Your <UnixaBrand className="text-3xl md:text-6xl" /> <span className="text-[var(--color-primary)]">System</span>
                                    </h2>
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