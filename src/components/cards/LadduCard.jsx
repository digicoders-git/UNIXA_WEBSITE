import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCartApi } from '../../api/cart';
import { ShoppingCart, CheckCircle, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const LadduCard = memo(({ product }) => {
    const navigate = useNavigate();
    const [added, setAdded] = useState(false);

    const name = product?.name;
    const img = product?.img;
    // Fallback price string logic if needed, but we rely on numeric prices mostly
    const description = product?.description;
    const category = product?.category;
    const id = product?.id || product?._id;

    // Price display logic
    const displayPrice = product?.finalPrice || product?.price;
    const originalPrice = product?.price;
    const discount = product?.discountPercent;

    const checkAuth = async () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            const result = await Swal.fire({
                title: 'Pure Water Awaits!',
                text: 'Please login to add these water purifiers to your cart.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: 'var(--color-secondary)',
                cancelButtonColor: 'var(--color-text-muted)',
                confirmButtonText: 'Login Now',
                cancelButtonText: 'Later',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                iconColor: 'var(--color-secondary)'
            });

            if (result.isConfirmed) {
                navigate('/login');
            }
            return false;
        }
        return true;
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        const isAuth = await checkAuth();
        if (!isAuth) return;

        try {
            await addToCartApi({ productId: id, quantity: 1 });
            window.dispatchEvent(new Event('cart-updated')); // Notify Navbar
            setAdded(true);
            toast.success(`${name} added to cart!`, { position: "top-right" });
            setTimeout(() => setAdded(false), 2000);
        } catch (error) {
            console.error("Failed to add to cart:", error);
            // Optional: toast.error("Log in to add items!"); 
        }
    };

    const handleViewDetails = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div
            onClick={handleViewDetails}
            className="bg-[var(--color-surface)] p-4 md:p-5 rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[var(--color-secondary)]/5 flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(242,183,5,0.12)] hover:border-[var(--color-secondary)]/30 group relative overflow-hidden h-full cursor-pointer"
        >



            <div
                className="w-full aspect-square overflow-hidden rounded-[20px] mb-3 bg-[var(--color-primary)]/20 relative shadow-inner"
            >
                <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <h3
                className="text-lg md:text-xl font-bold text-[var(--color-text)] mb-0.5 font-[var(--font-heading)] group-hover:text-[var(--color-secondary)] transition-colors line-clamp-1 px-1"
            >
                {name}
            </h3>

            <p className="text-[10px] md:text-xs text-[var(--color-text-muted)] mb-3 line-clamp-2 px-1 leading-tight opacity-80">
                {description}
            </p>

            <div className="flex flex-col items-center mb-4">
                <div className="text-xl font-bold text-[var(--color-secondary)] font-[var(--font-body)]">
                    ₹{displayPrice}
                </div>
                {discount > 0 && (
                    <div className="flex items-center gap-1.5 mt-0.5 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-100">
                        <span className="text-[10px] text-[var(--color-text-muted)] line-through">₹{originalPrice}</span>
                        <span className="text-[9px] text-green-600 font-bold">{discount}% OFF</span>
                    </div>
                )}
            </div>

            <div className="flex gap-2 w-full mt-auto" onClick={(e) => e.stopPropagation()}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                        @media (max-width: 374px) {
                            .laddu-btn-container {
                                flex-direction: column !important;
                            }
                            .laddu-btn {
                                padding-top: 0.375rem !important;
                                padding-bottom: 0.375rem !important;
                                font-size: 8px !important;
                                gap: 0.25rem !important;
                            }
                            .laddu-btn svg {
                                width: 10px !important;
                                height: 10px !important;
                            }
                        }
                    `
                }} />
                <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`laddu-btn flex-1 py-2 md:py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-1.5 text-[10px] md:text-xs ${added
                        ? 'bg-green-600 text-white shadow-inner scale-95'
                        : 'bg-white text-[var(--color-secondary)] border-2 border-[var(--color-secondary)]/20 hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/5 active:scale-95'
                        }`}
                >
                    {added ? (
                        <>
                            <CheckCircle size={14} />
                            <span>Added</span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={14} />
                            <span>Cart</span>
                        </>
                    )}
                </button>
                <button
                    onClick={async (e) => {
                        e.stopPropagation();
                        const isAuth = await checkAuth();
                        if (!isAuth) return;
                        try {
                            await addToCartApi({ productId: id, quantity: 1 });
                            window.dispatchEvent(new Event('cart-updated'));
                            navigate('/shop');
                        } catch (error) {
                            console.error("Buy now failed:", error);
                        }
                    }}
                    className="laddu-btn flex-1 py-2 md:py-2.5 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-xl font-bold hover:opacity-90 hover:shadow-xl transition-all active:scale-95 text-[10px] md:text-xs shadow-[0_8px_20px_rgba(242,183,5,0.25)]"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
});

LadduCard.displayName = 'LadduCard';

export default LadduCard;

