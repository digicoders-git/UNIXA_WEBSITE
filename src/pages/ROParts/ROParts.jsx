import React, { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import { Settings, Search, X, Filter, ArrowUpDown, ChevronDown, Check, Wrench, ShieldCheck, Truck, Plus } from 'lucide-react';
import ProductCard from '../../components/cards/PurifierCard';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';
import UnixaBrand from '../../components/common/UnixaBrand';

const ROParts = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Featured');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    
    // Pagination state
    const [visibleCount, setVisibleCount] = useState(8);
    const observerTarget1 = React.useRef(null);
    const observerTarget2 = React.useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/ro-parts');
                if (data && data.roParts) {
                    setProducts(data.roParts);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);



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

    // Infinite Scroll Observer
    useEffect(() => {
        const target1 = observerTarget1.current;
        const target2 = observerTarget2.current;

        const observer = new IntersectionObserver(
            entries => {
                if (entries.some(entry => entry.isIntersecting) && visibleCount < filteredAndSortedProducts.length) {
                     setVisibleCount(prev => Math.min(prev + 4, filteredAndSortedProducts.length)); 
                }
            },
            { threshold: 0.1 }
        );

        if (target1) observer.observe(target1);
        if (target2) observer.observe(target2);

        return () => {
            if (target1) observer.unobserve(target1);
            if (target2) observer.unobserve(target2);
        };
    }, [visibleCount, filteredAndSortedProducts]);

    // Reset visible count when filters change
    useEffect(() => {
        setVisibleCount(8);
    }, [searchQuery, activeCategory, sortBy]);

    const visibleProducts = useMemo(() => {
        return filteredAndSortedProducts.slice(0, visibleCount);
    }, [filteredAndSortedProducts, visibleCount]);

    const sortOptions = ['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'];

    return (
        <div className="bg-[var(--color-surface)] min-h-screen font-['Outfit',sans-serif]">

            {/* Hero Section */}
            <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 px-6 text-center bg-slate-50 border-b border-slate-200 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden">
                {/* High Visibility Water Bubbles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-blue-300/40 border border-white/40 blur-[0.5px] animate-float-bubble"
                            style={{
                                width: `${Math.random() * 40 + 10}px`,
                                height: `${Math.random() * 40 + 10}px`,
                                left: `${Math.random() * 100}%`,
                                bottom: `-${Math.random() * 20 + 10}%`,
                                animationDuration: `${Math.random() * 4 + 5}s`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mx-auto shadow-sm">
                        <Settings size={16} className="text-[var(--color-primary)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Genuine Spares
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                        RO Parts <span className="text-[var(--color-primary)]">Store</span>
                    </h1>

                    <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        Keep your <UnixaBrand className="text-slate-900"/> running like new. 
                        Authentic filters, membranes, and accessories delivered to your door.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative group mt-8">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-[32px] opacity-0 group-focus-within:opacity-10 blur-xl transition-all duration-500" />
                        <div className="relative flex items-center bg-white border border-slate-200 rounded-[30px] p-2 shadow-sm transition-all duration-300 focus-within:shadow-md focus-within:border-blue-300">
                            <div className="pl-4 text-slate-400">
                                <Search size={20} strokeWidth={2.5} />
                            </div>
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Find your part (e.g. 'Sediment Filter')"
                                className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-slate-800 font-bold text-sm px-4 py-3 placeholder:text-slate-400 placeholder:font-bold"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="p-2 bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition-all"
                                >
                                    <X size={16} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters & Sorting */}
            <section className="sticky top-[70px] md:top-[74px] z-40 py-4 px-6 md:px-12 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Categories */}
                    <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-2xl overflow-x-auto no-scrollbar w-full md:w-auto mask-linear-fade">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all select-none ${activeCategory === cat ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-400 hover:text-slate-700 hover:bg-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Stats & Sort */}
                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Inventory</span>
                            <span className="text-xs font-black text-slate-900 mt-1">{filteredAndSortedProducts.length} Parts Found</span>
                        </div>
                        
                        <div className="relative">
                            <button 
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-3 px-5 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-slate-300 transition-all shadow-sm active:scale-95"
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

            {/* Product Grid */}
            <section className="py-16 px-6 md:px-12 relative z-10 bg-slate-50/50 min-h-[600px]">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="py-32 flex flex-col items-center">
                            <Loader text="Searching Stock..." />
                        </div>
                    ) : (
                        <>
                            {visibleProducts.length > 0 ? (
                                <div className="space-y-12">
                                    {/* Row 1 */}
                                    <div className="flex overflow-x-auto w-full snap-x snap-mandatory pb-6 no-scrollbar px-4 scroll-smooth gap-6">
                                        {visibleProducts.filter((_, idx) => idx % 2 === 0).map((product) => (
                                            <div key={product._id} className="w-[280px] md:w-[320px] shrink-0 snap-start animate-in fade-in zoom-in-50 duration-500 fill-mode-backwards" style={{ animationDelay: `${Math.random() * 200}ms` }}>
                                                <ProductCard
                                                    product={{
                                                        id: product._id,
                                                        p_id: product.p_id,
                                                        name: product.name,
                                                        img: product.mainImage?.url,
                                                        price: product.price,
                                                        finalPrice: product.finalPrice,
                                                        discountPercent: product.discountPercent,
                                                        description: product.description,
                                                        category: product.category?.name
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        
                                        {visibleCount < filteredAndSortedProducts.length && (
                                            <div ref={observerTarget1} className="flex items-center justify-center p-4 snap-start w-[100px] h-full shrink-0">
                                                <Loader size="sm" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Row 2 */}
                                    <div className="flex overflow-x-auto w-full snap-x snap-mandatory pb-6 no-scrollbar px-4 scroll-smooth gap-6">
                                        {visibleProducts.filter((_, idx) => idx % 2 !== 0).map((product) => (
                                            <div key={product._id} className="w-[280px] md:w-[320px] shrink-0 snap-start animate-in fade-in zoom-in-50 duration-500 fill-mode-backwards" style={{ animationDelay: `${Math.random() * 200}ms` }}>
                                                <ProductCard
                                                    product={{
                                                        id: product._id,
                                                        p_id: product.p_id,
                                                        name: product.name,
                                                        img: product.mainImage?.url,
                                                        price: product.price,
                                                        finalPrice: product.finalPrice,
                                                        discountPercent: product.discountPercent,
                                                        description: product.description,
                                                        category: product.category?.name
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        
                                        {visibleCount < filteredAndSortedProducts.length && (
                                            <div ref={observerTarget2} className="flex items-center justify-center p-4 snap-start w-[100px] h-full shrink-0">
                                                <Loader size="sm" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Desktop Scroll Hint */}
                                    <div className="hidden md:flex justify-end pr-8 text-slate-400 text-xs font-bold uppercase tracking-widest gap-2 items-center opacity-60">
                                         <span>Scroll right for more</span>
                                         <ArrowUpDown className="-rotate-90" size={14} />
                                    </div>
                                </div>

                            ) : (
                                <div className="py-32 text-center space-y-6 animate-in fade-in slide-in-from-bottom-5">
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto text-slate-200 border border-slate-100">
                                        <Search size={48} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">No Parts Found</h3>
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-xs mx-auto opacity-60">
                                            We couldn't locate the part you're looking for.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                                        className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

             {/* Help Section */}
            <section className="py-16 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-black text-slate-900">Cant find what you need?</h2>
                    <p className="text-slate-500 font-medium">Our support team can help you identify the right part for your machine.</p>
                    <button onClick={() => window.location.href='/contact'} className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-xl hover:bg-blue-600 transition-all">
                        Contact Support
                    </button>
                </div>
            </section>

            <Footer />
            <style>{`
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
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default ROParts;
