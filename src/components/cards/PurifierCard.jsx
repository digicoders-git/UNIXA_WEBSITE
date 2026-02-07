import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

import { ShoppingCart, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductCard = memo(({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);


    const name = product?.name;
    const img = product?.mainImage?.url || product?.img;
    const description = product?.description;
    const id = product?.p_id || product?.slug || product?.id || product?._id;
    const techId = product?._id || product?.id;
    const stock = product?.stock ?? 10; // Default to 10 if not provided

    const displayPrice = product?.finalPrice || product?.price;
    const originalPrice = product?.price;
    const discount = product?.discountPercent;

    const isOutOfStock = stock <= 0;
    const isLowStock = stock > 0 && stock <= 5;

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (isOutOfStock) return;
        
        addToCart({
            _id: techId,
            id: techId,
            name,
            price: displayPrice,
            img,
            quantity: 1
        });

        setAdded(true);
        toast.success(`${name} added!`, {
            position: "bottom-center",
            style: {
                borderRadius: '0.75rem',
                fontWeight: '800',
                fontSize: '10px',
                background: 'var(--color-secondary)',
                color: 'white'
            }
        });
        setTimeout(() => setAdded(false), 2000);
    };


    const handleViewDetails = () => navigate(`/product/${id}`);

    return (
        <div
            onClick={handleViewDetails}
            className={`group bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-300/50 p-3 md:p-5 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full cursor-pointer relative overflow-hidden ${isOutOfStock ? 'opacity-75 grayscale-[0.5]' : ''}`}
        >
            {/* Discount Badge */}
            {discount > 0 && !isOutOfStock && (
                <div className="absolute top-3 right-3 z-20 bg-[var(--color-primary)] text-white text-[8px] md:text-[9px] font-black px-2 md:px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
                    {discount}% OFF
                </div>
            )}

            {/* Stock Badge */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
                {isOutOfStock ? (
                    <div className="bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded-full shadow-lg uppercase tracking-widest">
                        Out of Stock
                    </div>
                ) : isLowStock ? (
                    <div className="bg-amber-500 text-white text-[8px] font-black px-2 py-1 rounded-full shadow-lg uppercase tracking-widest animate-pulse">
                        Only {stock} Left
                    </div>
                ) : null}
            </div>

            {/* Image Container */}
            <div className="relative aspect-[4/3] mb-3 md:mb-4 overflow-hidden rounded-[1rem] md:rounded-[1.5rem] bg-slate-50 flex items-center justify-center p-3 md:p-4">
                <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 border-2 border-slate-900 px-4 py-2 rotate-[-10deg]">Sold Out</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col items-start px-1 md:px-2">
                <h3 className="text-sm md:text-lg font-black text-[var(--color-secondary)] mb-1 md:mb-1.5 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors tracking-tight uppercase">
                    {name}
                </h3>

                <p className="text-[9px] md:text-[11px] text-slate-400 font-bold mb-3 line-clamp-2 leading-tight uppercase tracking-wide">
                    {description || "Advanced multi-stage technology for pure hydration."}
                </p>

                {/* Price Display */}
                <div className="mb-4 flex flex-col items-start">
                    <div className="flex items-baseline gap-2">
                        <span className="text-base md:text-xl font-black text-[var(--color-secondary)] tracking-tighter">₹{displayPrice?.toLocaleString()}</span>
                        {discount > 0 && (
                            <span className="text-[9px] md:text-xs text-slate-300 line-through font-bold">₹{originalPrice?.toLocaleString()}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full mt-auto" onClick={e => e.stopPropagation()}>
                <button
                    onClick={handleAddToCart}
                    disabled={added || isOutOfStock}
                    className={`flex-1 py-2 md:py-3 rounded-xl font-black text-[8px] md:text-[9px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 ${added
                        ? 'bg-emerald-500 text-white shadow-inner'
                        : isOutOfStock 
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                            : 'bg-slate-100 text-[var(--color-secondary)] hover:bg-slate-200'
                        }`}
                >
                    {added ? (
                        <>
                            <CheckCircle size={10} className="md:w-3 md:h-3" />
                            <span>In Cart</span>
                        </>
                    ) : isOutOfStock ? (
                        <span>Unavailable</span>
                    ) : (
                        <>
                            <ShoppingCart size={10} className="md:w-3 md:h-3" />
                            <span>Add</span>
                        </>
                    )}
                </button>
                <button
                    onClick={() => {
                        if (!isOutOfStock) {
                            addToCart({
                                _id: techId,
                                id: techId,
                                name,
                                price: displayPrice,
                                img,
                                quantity: 1
                            });
                            // Navigating to /shop after "Buy Now" as per current flow,
                            // instead of a direct checkout page.
                            navigate('/shop'); 
                        }
                    }}
                    disabled={isOutOfStock}

                    className={`flex-[1.5] py-2 md:py-3 rounded-xl font-black text-[8px] md:text-[9px] uppercase tracking-widest shadow-md transition-all active:scale-95 flex items-center justify-center gap-1 ${isOutOfStock 
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                        : 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-primary)]'}`}
                >
                    {isOutOfStock ? 'Sold Out' : <>Buy Now <ArrowRight size={10} className="md:w-3 md:h-3" /></>}
                </button>
            </div>
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
