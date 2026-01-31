import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Star, Award, Search, X, Grid, Filter, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import ProductCard from '../../components/cards/PurifierCard';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';
import UnixaBrand from '../../components/common/UnixaBrand';

const Purifiers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Featured');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Shared high-quality image for all products to ensure visibility
    const sharedImg = "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop";

    // Static Data for Products (Pure Hybrid Technology Models)
    const products = useMemo(() => [
        {
            _id: '1',
            name: 'HydroLife Alkaline Pro',
            mainImage: { url: sharedImg },
            price: 45000,
            finalPrice: 39999,
            discountPercent: 11,
            description: 'Advanced 11-stage ionization with Platinum plates. Delivers mineral-rich alkaline water.',
            category: { name: 'Premium' },
            stock: 12
        },
        {
            _id: '2',
            name: 'NanoPure Smart',
            mainImage: { url: sharedImg },
            price: 25000,
            finalPrice: 19999,
            discountPercent: 20,
            description: 'Compact Under-sink design for modern kitchens. Space-saving yet powerful filtration.',
            category: { name: 'Smart' },
            stock: 5
        },
        {
            _id: '3',
            name: 'SilverStream RO+',
            mainImage: { url: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2070&auto=format&fit=crop" },
            price: 15000,
            finalPrice: 12999,
            discountPercent: 13,
            description: 'Superior RO purification with mineral boost. Ideal for high TDS water sources.',
            category: { name: 'Standard' },
            stock: 0
        },
        {
            _id: '4',
            name: 'AquaZen Elite',
            mainImage: { url: sharedImg },
            price: 55000,
            finalPrice: 49999,
            discountPercent: 9,
            description: 'Supreme ionization technology with smart touchscreen controls. The future of hydration.',
            category: { name: 'Luxury' },
            stock: 8
        },
        {
            _id: '5',
            name: 'PureNexus AI',
            mainImage: { url: sharedImg },
            price: 65000,
            finalPrice: 58999,
            discountPercent: 9,
            description: 'AI-monitored water health with automated filter flush system.',
            category: { name: 'Luxury' },
            stock: 15
        },
        {
            _id: '6',
            name: 'EcoPure Basic',
            mainImage: { url: sharedImg },
            price: 9999,
            finalPrice: 8499,
            discountPercent: 15,
            description: 'Essential purification for pure family health.',
            category: { name: 'Standard' },
            stock: 3
        }
    ], []);

    const filteredAndSortedProducts = useMemo(() => {
        let result = products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                p.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || p.category.name === activeCategory;
            return matchesSearch && matchesCategory;
        });

        if (sortBy === 'Price: Low to High') {
            result.sort((a, b) => a.finalPrice - b.finalPrice);
        } else if (sortBy === 'Price: High to Low') {
            result.sort((a, b) => b.finalPrice - a.finalPrice);
        } else if (sortBy === 'Newest') {
            result.sort((a, b) => b._id.localeCompare(a._id));
        }

        return result;
    }, [searchQuery, activeCategory, sortBy, products]);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [activeCategory, sortBy]);

    const categories = ['All', 'Premium', 'Luxury', 'Smart', 'Standard'];
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                                {filteredAndSortedProducts.map((product) => (
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

                            {filteredAndSortedProducts.length === 0 && (
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
            `}</style>
        </div>
    );
};

export default Purifiers;