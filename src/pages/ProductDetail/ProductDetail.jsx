import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, Package, Truck, Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { getProductApi } from '../../api/product';
import { addToCartApi } from '../../api/cart';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';


const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductApi(id);
                // Map API response to component structure
                const p = data.product;
                setProduct({
                    id: p._id,
                    name: p.name,
                    img: p.mainImage?.url,
                    price: p.price,
                    finalPrice: p.finalPrice,
                    discountPercent: p.discountPercent,
                    priceStr: `₹${p.finalPrice} / kg`,
                    description: p.description,
                    category: p.category?.name || 'Special',
                    ingredients: p.about?.ingredients || 'N/A',
                    shelfLife: p.about?.shelfLife || 'N/A',
                    netWeight: p.about?.netWeight || '1kg'
                });
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError(true);
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: `var(--color-surface)` }}>
                <Loader text="Loading delicious details..." />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: `var(--color-surface)` }}>
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>Product Not Found</h2>
                    <Link to="/laddus" className="transition-colors" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
                        ← Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const checkAuth = async () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            const result = await Swal.fire({
                title: 'Ready for a Treat?',
                text: 'Please login to proceed with your purchase.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#F2B705',
                cancelButtonColor: '#2E2E2E',
                confirmButtonText: 'Login Now',
                cancelButtonText: 'Maybe Later',
                background: '#FFFFFF',
                color: '#2E2E2E',
                iconColor: '#F2B705'
            });

            if (result.isConfirmed) {
                navigate('/login');
            }
            return false;
        }
        return true;
    };

    const handleAddToCart = async () => {
        const isAuth = await checkAuth();
        if (!isAuth) return;

        try {
            await addToCartApi({ productId: product.id, quantity: 1 });
            window.dispatchEvent(new Event('cart-updated')); // Notify Navbar
            toast.success(`${product.name} added to cart!`, { position: "top-right" });
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    return (
        <div style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-text)`, fontFamily: `var(--font-body)` }} className="min-h-screen -mt-12">
            <div className="pb-8 pt-16 px-6 md:px-24 relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                    <div className="detail-bubble detail-bubble-1"></div>
                    <div className="detail-bubble detail-bubble-2"></div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    .detail-bubble {
                        position: absolute;
                        background: var(--color-primary);
                        border-radius: 50%;
                        opacity: 0.05;
                        animation: float-detail 20s infinite ease-in-out;
                    }
                    .detail-bubble-1 { width: 200px; height: 200px; left: -50px; top: 10%; }
                    .detail-bubble-2 { width: 300px; height: 300px; right: -80px; bottom: 10%; animation-delay: 4s; }
                    @keyframes float-detail {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(30px, -40px) scale(1.05); }
                    }
                `
                }} />

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-8 font-semibold transition-colors relative z-10"
                    style={{ color: `var(--color-primary)` }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-primary)'}
                >
                    <ArrowLeft size={20} />
                    Back
                </button>

                <div className="max-w-6xl mx-auto rounded-[40px] shadow-2xl overflow-hidden relative z-10" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Product Image */}
                        <div className="p-8 md:p-16 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, var(--color-primary)/5, var(--color-secondary)/5)` }}>
                            <div className="absolute inset-0 opacity-10" style={{ backgroundSize: 'cover', filter: 'blur(20px)' }}></div>
                            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, rgba(10, 40, 106, 0.1) 0%, transparent 70%)` }}></div>
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-full max-w-sm rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-transform duration-500 relative z-10"
                                style={{ border: `1px solid var(--color-border)` }}
                            />
                        </div>

                        {/* Product Details */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            {/* <div className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 w-fit" style={{ backgroundColor: `var(--color-secondary)`, color: `var(--color-surface)` }}>
                                {product.category}
                            </div> */}

                            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: `var(--color-text)`, fontFamily: `var(--font-heading)` }}>
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-2 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-current" style={{ color: `var(--color-secondary)` }} />
                                ))}
                                <span className="text-sm ml-2" style={{ color: `var(--color-text-muted)` }}>(4.9/5 from 120 reviews)</span>
                            </div>

                            <p className="text-lg leading-relaxed mb-6" style={{ color: `var(--color-text)`, opacity: 0.8 }}>
                                {product.description}
                            </p>

                            <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                                <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: `var(--color-primary)` }}>
                                    <Package size={20} />
                                    Product Details
                                </h3>
                                <div className="space-y-2 text-sm" style={{ color: `var(--color-text-muted)` }}>
                                    <p><span className="font-semibold" style={{ color: `var(--color-text)` }}>Ingredients:</span> {product.ingredients}</p>
                                    <p><span className="font-semibold" style={{ color: `var(--color-text)` }}>Shelf Life:</span> {product.shelfLife}</p>
                                    <p><span className="font-semibold" style={{ color: `var(--color-text)` }}>Net Weight:</span> {product.netWeight}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-sm mb-1" style={{ color: `var(--color-text-muted)` }}>Price per kg</p>
                                    <div className="flex items-center gap-3">
                                        <p className="text-4xl font-bold" style={{ color: `var(--color-secondary)` }}>₹{product.finalPrice}</p>
                                        {product.discountPercent > 0 && (
                                            <>
                                                <p className="text-xl line-through" style={{ color: `var(--color-text-muted)` }}>₹{product.price}</p>
                                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                                    {product.discountPercent}% OFF
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mb-8">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 py-2 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all flex items-center justify-center gap-2"
                                    style={{
                                        backgroundColor: `var(--color-secondary)`,
                                        color: `var(--color-surface)`,
                                        boxShadow: `0 4px 15px rgba(6, 182, 212, 0.3)`
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#0891b2';
                                        e.target.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'var(--color-secondary)';
                                        e.target.style.boxShadow = '0 4px 15px rgba(6, 182, 212, 0.3)';
                                    }}
                                >
                                    <ShoppingCart size={18} className="md:w-[22px] md:h-[22px]" />
                                    <span className="text-xs md:text-base">Add to Cart</span>
                                </button>
                                <button
                                    onClick={async () => {
                                        const isAuth = await checkAuth();
                                        if (!isAuth) return;

                                        try {
                                            await addToCartApi({ productId: product.id, quantity: 1 });
                                            window.dispatchEvent(new Event('cart-updated'));
                                            navigate('/shop');
                                        } catch (error) {
                                            console.error("Buy now failed:", error);
                                        }
                                    }}
                                    className="px-4 md:px-8 py-2 md:py-4 border-2 rounded-xl font-bold transition-all flex items-center justify-center no-underline text-xs md:text-base cursor-pointer"
                                    style={{
                                        borderColor: `var(--color-secondary)`,
                                        color: `var(--color-secondary)`,
                                        backgroundColor: 'transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'var(--color-secondary)';
                                        e.target.style.color = 'var(--color-surface)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = 'var(--color-secondary)';
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Truck size={20} style={{ color: `var(--color-secondary)` }} />
                                    <span style={{ color: `var(--color-text-muted)` }}>Fast Delivery</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Shield size={20} style={{ color: `var(--color-secondary)` }} />
                                    <span style={{ color: `var(--color-text-muted)` }}>100% Authentic</span>
                                </div>
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
