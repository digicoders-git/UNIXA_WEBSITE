import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Award } from 'lucide-react';
import LadduCard from '../../components/cards/LadduCard';
import Footer from '../../components/layout/Footer';
import { listProductsApi } from '../../api/product';
import Loader from '../../components/common/Loader';

const Laddus = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await listProductsApi();
                if (data.products) {
                    setProducts(data.products);
                } else if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-[var(--color-surface)] min-h-screen -mt-12">
            
            {/* Hero Header Section */}
            <section className="relative py-8 md:py-12 px-6 text-center overflow-hidden rounded-b-[40px] md:rounded-b-[100px]" style={{ background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)` }}>
                {/* Animated Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="bubble bubble-1"></div>
                    <div className="bubble bubble-2"></div>
                    <div className="bubble bubble-3"></div>
                    <div className="bubble bubble-4"></div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        .bubble {
                            position: absolute;
                            border-radius: 50%;
                            animation: float-bubble 15s infinite ease-in-out;
                        }
                        .bubble-1 {
                            width: 80px;
                            height: 80px;
                            background: rgba(248, 250, 252, 0.15);
                            left: 15%;
                            top: 25%;
                            animation-delay: 0s;
                        }
                        .bubble-2 {
                            width: 60px;
                            height: 60px;
                            background: rgba(248, 250, 252, 0.12);
                            right: 20%;
                            top: 35%;
                            animation-delay: 4s;
                        }
                        .bubble-3 {
                            width: 100px;
                            height: 100px;
                            background: rgba(248, 250, 252, 0.18);
                            left: 70%;
                            bottom: 30%;
                            animation-delay: 8s;
                        }
                        .bubble-4 {
                            width: 70px;
                            height: 70px;
                            background: rgba(248, 250, 252, 0.14);
                            right: 65%;
                            bottom: 40%;
                            animation-delay: 12s;
                        }
                        @keyframes float-bubble {
                            0%, 100% {
                                transform: translateY(0) scale(1);
                                opacity: 0.4;
                            }
                            50% {
                                transform: translateY(-30px) scale(1.1);
                                opacity: 0.7;
                            }
                        }
                    `
                }} />
                
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
                        <span className="font-semibold text-xs md:text-sm uppercase tracking-wider" style={{ color: `var(--color-surface)` }}>
                            Premium Collection
                        </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6" style={{ color: `var(--color-surface)`, fontFamily: `var(--font-heading)` }}>
                        Our Products
                    </h1>
                    
                    <p className="text-base md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium" style={{ color: `var(--color-surface)` }}>
                        Handcrafted with love, made with the finest ingredients for an authentic taste experience
                    </p>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader text="Loading Delicious Products..." />
                        </div>
                    ) : (
                        <>
                            {/* Section Header */}
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
                                    Choose Your Favorite
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full"></div>
                            </div>
                            
                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {products.map((product, index) => (
                                    <div key={product._id || index} className="transform hover:-translate-y-2 transition-all duration-300">
                                        <LadduCard
                                            product={{
                                                id: product._id,
                                                name: product.name,
                                                img: product.images?.[0] || product.mainImage?.url || '/src/assets/images/default-product.png',
                                                price: product.price,
                                                finalPrice: product.finalPrice,
                                                discountPercent: product.discountPercent,
                                                description: product.description,
                                                category: product.category?.name || 'Premium Product'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            {/* Empty State */}
                            {products.length === 0 && (
                                <div className="text-center py-20">
                                    <div className="w-32 h-32 bg-gradient-to-br from-[var(--color-secondary)]/20 to-[var(--color-accent)]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--color-border)]">
                                        <Sparkles className="w-16 h-16 text-[var(--color-secondary)]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">Coming Soon!</h3>
                                    <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
                                        Our delicious products are being prepared with love. Stay tuned for amazing treats!
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Laddus;