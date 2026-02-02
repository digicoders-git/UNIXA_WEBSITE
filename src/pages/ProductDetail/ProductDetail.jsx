import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';


import { ShoppingCart, ArrowLeft, Star, Package, Truck, ShieldCheck, Droplets, Zap, Activity, Info } from 'lucide-react';
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
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const { data } = await axios.get(`${apiUrl}/products/${id}`);
                
                if (data && data.product) {
                    setProduct(data.product);
                    setError(false);
                } else if (data) {
                    // In case the API returns the product directly
                    setProduct(data);
                    setError(false);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Fetch product error:", err);
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
            <div className="pb-12 px-6 md:px-12 max-w-7xl mx-auto">

                {/* Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-8 font-bold text-slate-400 hover:text-(--color-secondary) transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Catalog
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Image Section */}
                    <div className="relative group rounded-[4rem] bg-gradient-to-br from-slate-50 to-blue-50/30 p-12 lg:p-24 flex items-center justify-center overflow-hidden border border-blue-100/50 shadow-2xl shadow-blue-500/5">
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
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col h-full pt-4">
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

                    </div>
                </div>

                {/* Review Section */}
                <ReviewSection productId={product?._id || product?.id} />

                
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
