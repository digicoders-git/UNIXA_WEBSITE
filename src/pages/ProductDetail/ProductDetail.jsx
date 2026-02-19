import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';


import { ShoppingCart, ArrowLeft, Star, Package, Truck, ShieldCheck, CheckCircle, Droplets, Zap, Activity, Info, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';
import UnixaBrand from '../../components/common/UnixaBrand';
import ReviewSection from '../../components/product/ReviewSection';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // First try standard products
                try {
                    const { data } = await api.get(`/products/${id}`);
                    if (data && (data.product || data)) {
                        setProduct(data.product || data);
                        setError(false);
                        setLoading(false);
                        return;
                    }
                } catch (e) {
                    console.log("Not a standard product, checking RO Parts...");
                }

                // If not found, check RO Parts
                const { data: roData } = await api.get(`/ro-parts/${id}`);
                if (roData && (roData.roPart || roData)) {
                    const foundPart = roData.roPart || roData;
                    setProduct(foundPart);
                    setError(false);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Fetch item error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader text="Initializing product details..." />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-black text-slate-800">Product Not Found</h2>
                    <Link to="/purifiers" className="inline-block text-(--color-primary) font-bold hover:underline">
                        ← Back to Purifiers
                    </Link>
                </div>
            </div>
        );
    }

    const checkAuth = async () => {
        return true; // Skipping auth check for static version
    };

    const handleAddToCart = async () => {
        if (!product) return;
        
        addToCart({
            _id: product._id || product.id,
            id: product._id || product.id,
            name: product.name,
            price: product.finalPrice || product.price,
            img: product.mainImage?.url || product.img,
            quantity: 1
        });

        toast.success(`${product.name} added to cart!`, {
            position: "bottom-center",
            style: { borderRadius: '1rem', fontWeight: 'bold' }
        });
    };


    return (
        <div className="min-h-screen bg-white font-(--font-body) pt-24">
            <div className="pb-12 px-4 md:px-12 max-w-7xl mx-auto">

                {/* Back Link */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-8 font-bold text-slate-400 hover:text-(--color-secondary) transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Catalog
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Image Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="relative group rounded-[4rem] bg-gradient-to-br from-slate-50 to-blue-50/30 p-12 lg:p-24 flex items-center justify-center overflow-hidden border border-blue-100/50 shadow-2xl shadow-blue-500/5"
                    >
                        <img
                            src={product?.mainImage?.url || product?.img}
                            alt={product?.name}
                            className="w-full max-w-md h-auto object-contain relative z-10 transition-transform duration-1000 group-hover:scale-110"
                        />

                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-(--color-primary)/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                        <div className="absolute bottom-12 right-12 z-20 hidden md:flex items-center gap-3 bg-white/40 backdrop-blur-2xl border border-white/50 px-6 py-3 rounded-2xl shadow-xl text-xs font-black text-(--color-secondary) uppercase tracking-widest">
                            <ShieldCheck size={18} className="text-(--color-primary)" />
                            Certified Authentic
                        </div>
                    </motion.div>

                    {/* Details Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex flex-col h-full pt-4"
                    >
                        <div className="mb-2">
                            <span className="bg-(--color-primary)/10 text-(--color-secondary) text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full inline-block mb-4">
                                {product?.category?.name || product?.category || "Purifier"}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-(--color-secondary) leading-[1.1] mb-6">
                            {product?.name}
                        </h1>


                        <button 
                            onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex items-center gap-4 mb-8 hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-slate-400">(4.9/5 Excellent)</span>
                        </button>

                        <div className="flex items-baseline gap-4 mb-8 border-b border-slate-100 pb-8">
                            <span className="text-4xl font-black text-(--color-primary)">
                                ₹{product.finalPrice?.toLocaleString()}
                            </span>
                            {product.discountPercent > 0 && (
                                <>
                                    <span className="text-lg text-slate-400 line-through font-bold">
                                        ₹{product.price?.toLocaleString()}
                                    </span>
                                    <span className="text-xs font-black text-red-500 bg-red-50 px-2 py-1 rounded-full uppercase tracking-wider">
                                        Save {product.discountPercent}%
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="text-slate-500 leading-relaxed mb-8 text-lg font-medium">
                            {product.description}
                        </p>

                        {/* Tech Specs Grid */}
                        {product?.specifications && (
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                {Object.entries(product.specifications)
                                    .filter(([, value]) => value && value !== "")
                                    .map(([key, value]) => (

                                    <div key={key} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{key}</p>
                                        <p className="font-bold text-(--color-secondary)">{value}</p>
                                    </div>
                                ))}
                            </div>
                        )}


                        {/* Features */}
                        {product?.features && product.features.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-xs font-black text-(--color-secondary) uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Zap size={14} className="text-(--color-primary)" /> Key Features
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                            <Droplets size={12} className="text-(--color-primary)" /> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* About / Long Description */}
                        {product?.about && (
                            <div className="mb-10 p-6 bg-slate-50 rounded-4xl border border-slate-100">
                                <h3 className="text-xs font-black text-(--color-secondary) uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                    <Info size={14} className="text-(--color-primary)" /> About this System
                                </h3>
                                <div className="text-sm text-slate-500 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: product.about }} />
                            </div>
                        )}


                        {/* Show Associated AMC Plans */}
                        {(() => {
                            // Get AMC plans from various possible locations
                            const amcPlans = product.amcPlans || product.amcPlansData || [];
                            
                            // Filter out non-object entries (in case IDs are present)
                            const validPlans = amcPlans.filter(plan => 
                                plan && typeof plan === 'object' && plan.name
                            );
                            
                            console.log('AMC Plans Debug:', { 
                                raw: amcPlans, 
                                valid: validPlans,
                                count: validPlans.length 
                            });
                            
                            if (validPlans.length === 0) return null;
                            
                            return (
                                <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xs font-black text-(--color-secondary) uppercase tracking-[0.2em] flex items-center gap-2">
                                            <ShieldCheck size={14} className="text-(--color-primary)" /> Annual Maintenance Plans
                                        </h3>
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Protect Your Investment</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {validPlans.map((plan) => (
                                            <div key={plan._id || plan.id} className="relative p-6 rounded-[2.5rem] border-2 border-slate-100 bg-white hover:border-(--color-primary)/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all group overflow-hidden">
                                                {/* Glow Effect */}
                                                <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors" />
                                                
                                                <div className="relative z-10">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div>
                                                            <h4 className="font-black text-slate-800 text-xl tracking-tight mb-2">{plan.name}</h4>
                                                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                                                                <Clock size={10} strokeWidth={3} />
                                                                <span className="text-[9px] font-black uppercase tracking-widest">{plan.durationMonths || 12} Months</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-black text-(--color-secondary) leading-none">₹{(plan.price || 0).toLocaleString()}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Inc. GST</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3 mb-8">
                                                        {plan.features && plan.features.length > 0 ? (
                                                            plan.features.slice(0, 4).map((f, i) => (
                                                                <div key={i} className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                                                                    <div className="w-5 h-5 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                                                                        <CheckCircle size={10} strokeWidth={3} />
                                                                    </div>
                                                                    <span className="leading-tight">{f}</span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <>
                                                                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                                                                    <div className="w-5 h-5 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                                                                        <CheckCircle size={10} strokeWidth={3} />
                                                                    </div>
                                                                    <span className="leading-tight">{plan.servicesIncluded || 4} Free Service Visits</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                                                                    <div className="w-5 h-5 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                                                                        <CheckCircle size={10} strokeWidth={3} />
                                                                    </div>
                                                                    <span className="leading-tight">Priority Support</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                                                                    <div className="w-5 h-5 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                                                                        <CheckCircle size={10} strokeWidth={3} />
                                                                    </div>
                                                                    <span className="leading-tight">Genuine Parts Replacement</span>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                                        <div className="flex items-center gap-2">
                                                            <Activity size={12} className="text-blue-400 animate-pulse" />
                                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">24/7 Support</span>
                                                        </div>
                                                        {plan.isActive !== false && (
                                                            <span className="text-[10px] font-black text-(--color-primary) uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                                                Available Now
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                        <p className="text-xs text-slate-500 text-center font-medium">
                                            <ShieldCheck size={12} className="inline mr-1 text-(--color-primary)" />
                                            AMC plans ensure optimal performance and extend the life of your water purifier
                                        </p>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Actions */}
                        <div className="flex gap-4 mt-auto">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 py-4 rounded-2xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-3 bg-[var(--color-secondary)] text-white hover:bg-[var(--color-primary)] transition-all shadow-[0_10px_30px_rgba(15,23,42,0.15)] active:scale-95"
                            >
                                <ShoppingCart size={18} />
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    handleAddToCart();
                                    navigate('/shop');
                                }}
                                className="flex-1 py-4 rounded-2xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-3 border-2 border-(--color-secondary) text-(--color-secondary) hover:bg-(--color-secondary) hover:text-white transition-all active:scale-95"
                            >
                                Buy Now
                            </button>

                        </div>

                        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <Truck size={14} className="text-(--color-primary)" /> Free Shipping
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={14} className="text-(--color-primary)" /> 1 Year Warranty
                            </div>
                        </div>

                    </motion.div>
                </div>

                {/* Review Section */}
                <ReviewSection productId={product?._id || product?.id} />

                
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
