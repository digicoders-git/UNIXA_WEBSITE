import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductCard = memo(({ product }) => {
    const navigate = useNavigate();
    const [added, setAdded] = useState(false);

    const name = product?.name;
    const img = product?.mainImage?.url || product?.img;
    const description = product?.description;
    const id = product?.id || product?._id;

    const displayPrice = product?.finalPrice || product?.price;
    const originalPrice = product?.price;
    const discount = product?.discountPercent;

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        setAdded(true);
        toast.success(`${name} added to tray!`, {
            position: "bottom-center",
            style: {
                borderRadius: '1rem',
                fontWeight: '800',
                fontSize: '11px',
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
            className="group bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 p-3 md:p-6 transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(14,165,233,0.15)] hover:-translate-y-2 flex flex-col h-full cursor-pointer relative overflow-hidden"
        >
            {/* Discount Badge - Smaller on Mobile */}
            {discount > 0 && (
                <div className="absolute top-3 right-3 md:top-6 md:right-6 z-20 bg-[var(--color-primary)] text-white text-[8px] md:text-[9px] font-black px-2 md:px-4 py-1 md:py-2 rounded-full shadow-lg uppercase tracking-widest">
                    {discount}% OFF
                </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-square mb-3 md:mb-6 overflow-hidden rounded-[1rem] md:rounded-[2rem] bg-slate-50 flex items-center justify-center p-4 md:p-8">
                <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col items-start px-1 md:px-2">
                <div className="flex gap-1 md:gap-1.5 mb-2 md:mb-3">
                    <div className="w-6 md:w-8 h-0.5 md:h-1 rounded-full bg-[var(--color-primary)]" />
                    <div className="w-1.5 md:w-2 h-0.5 md:h-1 rounded-full bg-[var(--color-primary)] opacity-30" />
                </div>

                <h3 className="text-sm md:text-xl font-black text-[var(--color-secondary)] mb-1 md:mb-2 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors tracking-tight">
                    {name}
                </h3>

                <p className="text-[10px] md:text-[12px] text-slate-500 font-medium mb-3 md:mb-6 line-clamp-2 leading-tight md:leading-relaxed">
                    {description || "Advanced multi-stage Japanese technology for the purest hydration."}
                </p>

                {/* Price Display */}
                <div className="mb-4 md:mb-8 flex flex-col items-start">
                    <div className="flex items-baseline gap-2 md:gap-3">
                        <span className="text-base md:text-2xl font-black text-[var(--color-secondary)]">₹{displayPrice?.toLocaleString()}</span>
                        {discount > 0 && (
                            <span className="text-[10px] md:text-sm text-slate-300 line-through font-bold">₹{originalPrice?.toLocaleString()}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons - Stacked on tight mobile, side-by-side on larger */}
            <div className="flex flex-col sm:flex-row gap-2 w-full mt-auto" onClick={e => e.stopPropagation()}>
                <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`flex-1 py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${added
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-[var(--color-secondary)] hover:bg-slate-200'
                        }`}
                >
                    {added ? (
                        <>
                            <CheckCircle size={12} className="md:w-4 md:h-4" />
                            <span>Added</span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={12} className="md:w-4 md:h-4" />
                            <span>Add</span>
                        </>
                    )}
                </button>
                <button
                    onClick={() => navigate('/shop')}
                    className="flex-[1.5] py-2.5 md:py-4 bg-[var(--color-secondary)] text-white rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-[var(--color-primary)] shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-1.5"
                >
                    Buy Now <ArrowRight size={12} className="md:w-4 md:h-4" />
                </button>
            </div>
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
