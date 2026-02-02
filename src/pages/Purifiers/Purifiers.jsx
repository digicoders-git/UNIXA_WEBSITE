import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Sparkles, Star, Award, Search, X, Grid, Filter, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import ProductCard from '../../components/cards/PurifierCard';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';
import UnixaBrand from '../../components/common/UnixaBrand';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Purifiers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Featured');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products from API
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const { data } = await axios.get(`${apiUrl}/products`);
                if (data && data.products) {
                    setProducts(data.products);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Derive dynamic categories from products
    const categories = useMemo(() => {
        const cats = new Set(products.map(p => p.category?.name).filter(Boolean));
        return ['All', ...Array.from(cats)];
    }, [products]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = products.filter(p => {
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch = p.name.toLowerCase().includes(query) ||
                                 (p.description && p.description.toLowerCase().includes(query)) ||
                                 (p.category?.name && p.category.name.toLowerCase().includes(query));
            const matchesCategory = activeCategory === 'All' || p.category?.name === activeCategory;
            return matchesSearch && matchesCategory;
        });


        if (sortBy === 'Price: Low to High') {
            result.sort((a, b) => a.finalPrice - b.finalPrice);
        } else if (sortBy === 'Price: High to Low') {
            result.sort((a, b) => b.finalPrice - a.finalPrice);
        } else if (sortBy === 'Newest') {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return result;
    }, [searchQuery, activeCategory, sortBy, products]);

    // Group products into pages of 8 for the slider
    const paginatedProducts = useMemo(() => {
        const pages = [];
        for (let i = 0; i < filteredAndSortedProducts.length; i += 8) {
            pages.push(filteredAndSortedProducts.slice(i, i + 8));
        }
        return pages;
    }, [filteredAndSortedProducts]);


    const sortOptions = ['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'];

    return (
        <div className="bg-[var(--color-surface)] min-h-screen font-['Outfit',sans-serif]">

            {/* Catalog Hero */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 text-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-white border-b border-slate-100 rounded-b-[40px] md:rounded-b-[80px]">
                {/* Water Bubbles Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-blue-400/30 border border-white/40 blur-[0.5px] animate-float-bubble"
                            style={{
                                width: `${(i * 13) % 40 + 15}px`,
                                height: `${(i * 13) % 40 + 15}px`,
                                left: `${(i * 23) % 100}%`,
                                bottom: `-${(i * 11) % 20 + 20}%`,
                                animationDuration: `${(i * 2) % 4 + 5}s`,
                                animationDelay: `${(i * 7) % 5}s`
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in px-4">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-slate-200 rounded-full mx-auto shadow-sm">
                            <Sparkles size={14} className="text-blue-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                                Unixa Purifier Catalog 2026
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-none">
                            <UnixaBrand className="text-5xl md:text-8xl" /> <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Series.</span>
                        </h1>

                        <p className="text-slate-500 text-sm md:text-lg max-w-xl mx-auto leading-relaxed font-bold uppercase tracking-wider opacity-60">
                            Discover the next generation of smart hydration. Engineered for purity, designed for your lifestyle.
                        </p>
                    </div>

                    {/* Integrated Search Bar */}
                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-[32px] opacity-0 group-focus-within:opacity-10 blur-xl transition-all duration-500" />
                        <div className="relative flex items-center bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[30px] p-2 shadow-2xl shadow-blue-500/5 hover:border-blue-200 transition-all duration-300">
                            <div className="pl-6 text-slate-400">
                                <Search size={22} strokeWidth={2.5} />
                            </div>
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by model or series..."
                                className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-slate-800 font-bold text-sm md:text-lg px-4 py-4 placeholder:text-slate-300 placeholder:font-black placeholder:uppercase placeholder:tracking-widest"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all"
                                >
                                    <X size={18} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none" />
            </section>

            {/* Purity Control Dashboard (Filters & Sort) */}
            <section className="sticky top-[70px] md:top-[74px] z-50 py-4 px-6 md:px-12 bg-white/70 backdrop-blur-xl border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Category Tabs */}
                    <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 border border-slate-100 rounded-2xl overflow-x-auto no-scrollbar w-full md:w-auto">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-white text-blue-600 shadow-md border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Quick Stats & Sort */}
                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Catalog Sync</span>
                            <span className="text-xs font-black text-slate-900 mt-1">{filteredAndSortedProducts.length} Systems Active</span>
                        </div>
                        <div className="w-px h-8 bg-slate-100 hidden md:block" />
                        
                        <div className="relative">
                            <button 
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-blue-200 transition-all shadow-sm"
                            >
                                <ArrowUpDown size={14} className="text-blue-500" />
                                <span>{sortBy}</span>
                                <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isSortOpen && (
                                <>
                                    <div className="fixed inset-0 z-0" onClick={() => setIsSortOpen(false)} />
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 z-10 animate-in fade-in zoom-in-95 duration-200">
                                        {sortOptions.map(option => (
                                            <button 
                                                key={option}
                                                onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === option ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
                                            >
                                                {option}
                                                {sortBy === option && <Check size={14} />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Catalog Grid */}
            <section className="py-16 px-6 md:px-12 relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="py-32 flex flex-col items-center">
                            <Loader text="Calibrating Purity Matrix..." />
                        </div>
                    ) : (
                        <>
                            {paginatedProducts.length > 0 ? (
                                <div className="purifier-slider-container relative">
                                    <Swiper
                                        modules={[Navigation, Pagination, EffectFade]}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        navigation={{
                                            nextEl: '.swiper-button-next-custom',
                                            prevEl: '.swiper-button-prev-custom',
                                        }}
                                        pagination={{ 
                                            clickable: true,
                                            dynamicBullets: true,
                                            renderBullet: (index, className) => {
                                                return `<span class="${className} custom-bullet">${index + 1}</span>`;
                                            }
                                        }}
                                        className="purifier-swiper pb-20"
                                    >
                                        {paginatedProducts.map((page, pageIdx) => (
                                            <SwiperSlide key={pageIdx}>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                                    {page.map((product) => (
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
                                                                category: product.category?.name
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Custom Navigation Buttons */}
                                    {paginatedProducts.length > 1 && (
                                        <>
                                            <button className="swiper-button-prev-custom absolute left-[-20px] md:left-[-50px] top-[40%] z-30 w-10 h-10 md:w-14 md:h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-xl text-slate-900 transition-all hover:bg-slate-900 hover:text-white group">
                                                <ChevronDown size={24} className="rotate-90 group-hover:-translate-x-1 transition-transform" />
                                            </button>
                                            <button className="swiper-button-next-custom absolute right-[-20px] md:right-[-50px] top-[40%] z-30 w-10 h-10 md:w-14 md:h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-xl text-slate-900 transition-all hover:bg-slate-900 hover:text-white group">
                                                <ChevronDown size={24} className="-rotate-90 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="py-32 text-center space-y-6 animate-in fade-in slide-in-from-bottom-5">
                                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                                        <Filter size={48} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Zero Purity Match</h3>
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-xs mx-auto opacity-60">We couldn't find any premium systems matching these specific calibration parameters.</p>
                                    </div>
                                    <button 
                                        onClick={() => { setSearchQuery(''); setActiveCategory('All'); setSortBy('Featured'); }}
                                        className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Reset Matrix
                                    </button>
                                </div>
                            )}
                        </>
                    )}
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
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .custom-bullet {
                    width: 35px !important;
                    height: 35px !important;
                    background: white !important;
                    border: 1px solid #e2e8f0 !important;
                    opacity: 1 !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    font-size: 12px !important;
                    font-weight: 900 !important;
                    color: #64748b !important;
                    border-radius: 10px !important;
                    margin: 0 5px !important;
                    transition: all 0.3s ease !important;
                }
                .custom-bullet.swiper-pagination-bullet-active {
                    background: var(--color-secondary) !important;
                    color: white !important;
                    border-color: var(--color-secondary) !important;
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                .swiper-pagination-lock {
                    display: none !important;
                }
                .purifier-swiper {
                    overflow: visible !important;
                }
            `}</style>

        </div>
    );
};

export default Purifiers;