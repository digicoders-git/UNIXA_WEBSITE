import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, Package, Truck, ShieldCheck, Droplets, Zap, Activity, Info } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Static Data for Products (Japanese Hybrid Technology Models)
    const staticProducts = [
        {
            _id: '1',
            name: 'HydroLife Alkaline Pro',
            img: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop',
            price: 45000,
            finalPrice: 39999,
            discountPercent: 11,
            description: 'The HydroLife Alkaline Pro is our flagship model, featuring advanced 11-stage ionization with Platinum plates. It goes beyond simple purification to deliver mineral-rich alkaline water that helps balance your bodys pH and provides powerful antioxidants.',
            category: 'Premium',
            techSpecs: {
                filtration: "11-Stage RO + UV + UF + Ionization",
                storage: "10 Liters",
                power: "75 Watts",
                warranty: "1 Year Comprehensive"
            }
        },
        {
            _id: '2',
            name: 'NanoPure Smart',
            img: 'https://images.unsplash.com/photo-1544006659-f0b21884cb1d?q=80&w=2070&auto=format&fit=crop',
            price: 25000,
            finalPrice: 19999,
            discountPercent: 20,
            description: 'Perfect for modern kitchens with limited space, the NanoPure Smart offers a compact under-sink design without compromising on power. It features advanced RO and UV technology to ensure your water is always pure and safe.',
            category: 'Smart',
            techSpecs: {
                filtration: "RO + UV + MTDS Control",
                storage: "8 Liters",
                power: "45 Watts",
                warranty: "1 Year Comprehensive"
            }
        },
        {
            _id: '3',
            name: 'SilverStream RO+',
            img: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2070&auto=format&fit=crop',
            price: 15000,
            finalPrice: 12999,
            discountPercent: 13,
            description: 'The SilverStream RO+ is designed for high TDS water sources, providing superior RO purification with an added mineral boost. It ensures that while impurities are removed, the essential minerals your body needs are retained.',
            category: 'Standard',
            techSpecs: {
                filtration: "RO + Copper + Mineralizer",
                storage: "12 Liters",
                power: "60 Watts",
                warranty: "1 Year Comprehensive"
            }
        },
        {
            _id: '4',
            name: 'AquaZen Elite',
            img: 'https://images.unsplash.com/photo-1517646288020-0be1574cc9e5?q=80&w=2070&auto=format&fit=crop',
            price: 55000,
            finalPrice: 49999,
            discountPercent: 9,
            description: 'Experience the ultimate in luxury and technology with the AquaZen Elite. Featuring our most advanced ionization tech and a sleek touchscreen interface, it allows you to precisely control the pH level of your water for various uses.',
            category: 'Luxury',
            techSpecs: {
                filtration: "13-Stage Hybrid Purification",
                storage: "15 Liters",
                power: "100 Watts",
                warranty: "2 Years Premium"
            }
        }
    ];

    useEffect(() => {
        const fetchProduct = () => {
            setLoading(true);
            const foundProduct = staticProducts.find(p => p._id === id);
            if (foundProduct) {
                setProduct({
                    ...foundProduct,
                    id: foundProduct._id
                });
                setError(false);
            } else {
                setError(true);
            }
            setLoading(false);
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
                    <Link to="/purifiers" className="inline-block text-[var(--color-primary)] font-bold hover:underline">
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
        toast.success(`${product.name} added to cart!`, {
            position: "bottom-center",
            style: { borderRadius: '1rem', fontWeight: 'bold' }
        });
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <div className="min-h-screen bg-white font-[var(--font-body)] pt-24">
            <div className="pb-12 px-6 md:px-12 max-w-7xl mx-auto">

                {/* Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-8 font-bold text-slate-400 hover:text-[var(--color-secondary)] transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Catalog
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Image Section */}
                    <div className="relative group rounded-[4rem] bg-gradient-to-br from-slate-50 to-blue-50/30 p-12 lg:p-24 flex items-center justify-center overflow-hidden border border-blue-100/50 shadow-2xl shadow-blue-500/5">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="w-full max-w-md h-auto object-contain relative z-10 transition-transform duration-1000 group-hover:scale-110"
                        />
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                        <div className="absolute bottom-12 right-12 z-20 hidden md:flex items-center gap-3 bg-white/40 backdrop-blur-2xl border border-white/50 px-6 py-3 rounded-2xl shadow-xl text-xs font-black text-[var(--color-secondary)] uppercase tracking-widest">
                            <ShieldCheck size={18} className="text-[var(--color-primary)]" />
                            Certified Authentic
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col h-full pt-4">
                        <div className="mb-2">
                            <span className="bg-[var(--color-primary)]/10 text-[var(--color-secondary)] text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full inline-block mb-4">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-[var(--color-secondary)] leading-[1.1] mb-6">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-slate-400">(4.9/5 Excellent)</span>
                        </div>

                        <div className="flex items-baseline gap-4 mb-8 border-b border-slate-100 pb-8">
                            <span className="text-4xl font-black text-[var(--color-primary)]">
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
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {Object.entries(product.techSpecs).map(([key, value]) => (
                                <div key={key} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{key}</p>
                                    <p className="font-bold text-[var(--color-secondary)]">{value}</p>
                                </div>
                            ))}
                        </div>

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
                                className="flex-1 py-4 rounded-2xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-3 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white transition-all active:scale-95"
                            >
                                Buy Now
                            </button>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <Truck size={14} className="text-[var(--color-primary)]" /> Free Shipping
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={14} className="text-[var(--color-primary)]" /> 1 Year Warranty
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
