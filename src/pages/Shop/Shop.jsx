import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, MapPin, CreditCard, CheckCircle2, Plus, Minus, Banknote, Smartphone, X, Home, Briefcase, User, Pencil, Tag, ChevronRight, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Footer from '../../components/layout/Footer';
import { getAddressesApi, addAddressApi, updateAddressApi } from '../../api/address';
import { getCartApi, updateCartItemApi, removeFromCartApi, clearCartApi } from '../../api/cart';
import { createPaymentOrderApi, verifyPaymentApi, handlePaymentFailureApi, placeOrderApi } from '../../api/payment';
import { getProfileApi } from '../../api/user';

const Shop = () => {
    const navigate = useNavigate();
    const sectionRefs = useRef([]);
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Cart Data State
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loadingCart, setLoadingCart] = useState(true);

    // Address Management State
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [isAddressSaving, setIsAddressSaving] = useState(false);

    // Address Form State
    const [addressForm, setAddressForm] = useState({
        name: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        addressType: 'home'
    });

    const [userId, setUserId] = useState(null);

    // Fetch User Profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfileApi();
                if (data && data.user) {
                    setUserId(data.user._id);
                }
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        };
        fetchProfile();
    }, []);

    // Fetch Cart Data
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        setLoadingCart(true);
        try {
            const data = await getCartApi();
            if (data && data.items) {
                // Map backend items to UI structure
                const mappedItems = data.items.map(item => ({
                    uniqueId: item.product._id, // Using product ID as unique ID
                    cartItemId: item._id, // Store the cart item ID for updates and removal
                    productId: item.product._id,
                    name: item.product.name,
                    img: item.product.mainImage?.url,
                    price: item.product.finalPrice, // Use finalPrice as the effective price
                    originalPrice: item.product.price, // Original price for display
                    discountPercent: item.product.discountPercent, // Discount info
                    ingredients: item.product.about?.ingredients, // Extract ingredients
                    netWeight: item.product.about?.netWeight, // Net weight from about
                    quantity: item.quantity,
                    description: item.product.description
                }));
                setCartItems(mappedItems);

                // Use backend totalAmount directly as requested
                if (data.totalAmount !== undefined && data.totalAmount !== null) {
                    setCartTotal(data.totalAmount);
                } else {
                    const total = mappedItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
                    setCartTotal(total);
                }
            } else {
                setCartItems([]);
                setCartTotal(0);
            }
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            setCartItems([]);
        } finally {
            setLoadingCart(false);
        }
    };

    const handleQuantityChange = async (itemId, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity < 1) return;

        try {
            await updateCartItemApi(itemId, newQuantity);
            fetchCart();
            window.dispatchEvent(new Event('cart-updated')); // Notify Navbar
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        const result = await Swal.fire({
            title: 'Remove Item?',
            text: "Are you sure you want to remove this item from your cart?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-secondary)',
            cancelButtonColor: 'var(--color-text-muted)',
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'Cancel',
            background: 'var(--color-surface)',
            color: 'var(--color-text)'
        });

        if (!result.isConfirmed) return;

        try {
            await removeFromCartApi(itemId);
            fetchCart();
            window.dispatchEvent(new Event('cart-updated'));
            toast.success("Item removed from cart!", { position: "top-right" });
        } catch (error) {
            console.error("Failed to remove item:", error);
            toast.error("Failed to remove item. Please try again.", { position: "top-right" });
        }
    };

    const handleClearCart = async () => {
        const result = await Swal.fire({
            title: 'Clear Cart?',
            text: "Are you sure you want to remove all items from your tray?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-secondary)',
            cancelButtonColor: 'var(--color-text-muted)',
            confirmButtonText: 'Yes, clear it!',
            cancelButtonText: 'Cancel',
            background: 'var(--color-surface)',
            color: 'var(--color-text)'
        });

        if (!result.isConfirmed) return;

        try {
            await clearCartApi();
            fetchCart();
            window.dispatchEvent(new Event('cart-updated'));
            toast.success("Cart cleared!", { position: "top-right" });
        } catch (error) {
            console.error("Failed to clear cart:", error);
            toast.error("Failed to clear cart. Please try again.", { position: "top-right" });
        }
    };

    // Fetch addresses on mount
    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        setLoadingAddresses(true);
        try {
            const data = await getAddressesApi();
            if (data && data.addresses && data.addresses.length > 0) {
                setSavedAddresses(data.addresses);
                // Pre-fill/Select the default or first address IF none selected
                if (!selectedAddressId) {
                    const defaultAddr = data.addresses.find(addr => addr.isDefault) || data.addresses[0];
                    setSelectedAddressId(defaultAddr._id);
                }
            } else {
                setShowAddressForm(true); // Show form if no addresses found
            }
        } catch (error) {
            console.error("Failed to fetch addresses:", error);
        } finally {
            setLoadingAddresses(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el);
        }
    };

    const handleEditAddress = (addr) => {
        setAddressForm({
            name: addr.name || '',
            phone: addr.phone || '',
            addressLine1: addr.addressLine1 || '',
            addressLine2: addr.addressLine2 || '',
            city: addr.city || '',
            state: addr.state || '',
            pincode: addr.pincode || '',
            addressType: (addr.addressType?.toLowerCase() === 'work' || addr.addressType?.toLowerCase() === 'office') ? 'office' : (addr.addressType?.toLowerCase() || 'home')
        });
        setEditingAddressId(addr._id);
        setShowAddressForm(true);
        // Scroll to form location
        const section = document.getElementById('delivery-address-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleSaveAddress = async () => {
        if (!addressForm.name || !addressForm.phone || !addressForm.addressLine1 || !addressForm.city || !addressForm.state || !addressForm.pincode) {
            toast.error("Please fill in all required fields.", { position: "top-right" });
            return;
        }

        if (addressForm.pincode.length !== 6) {
            toast.error("Pincode must be exactly 6 digits.", { position: "top-right" });
            return;
        }

        setIsAddressSaving(true);
        try {
            if (editingAddressId) {
                await updateAddressApi(editingAddressId, addressForm);
            } else {
                await addAddressApi(addressForm);
            }

            setShowAddressForm(false);
            setEditingAddressId(null);
            setAddressForm({
                name: '',
                phone: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                pincode: '',
                addressType: 'home'
            });
            fetchAddresses();
            toast.success("Address saved successfully!", { position: "top-right" });
        } catch (error) {
            console.error("Failed to save address:", error);
            toast.error("Failed to save address. Please try again.", { position: "top-right" });
        } finally {
            setIsAddressSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setShowAddressForm(false);
        setEditingAddressId(null);
        setAddressForm({
            name: '',
            phone: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            pincode: '',
            addressType: 'home'
        });
    }

    // Helper to load Razorpay script
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handleConfirmOrder = async () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty!", { position: "top-right" });
            return;
        }
        if (!selectedAddressId) {
            toast.error("Please select a delivery address!", { position: "top-right" });
            // Scroll to address section
            const addressSection = document.getElementById('delivery-address-section');
            if (addressSection) addressSection.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const result = await Swal.fire({
            title: 'Confirm Order?',
            text: `Place order for ₹${cartTotal + 70}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-secondary)',
            cancelButtonColor: 'var(--color-text-muted)',
            confirmButtonText: 'Yes, place it!',
            background: 'var(--color-surface)',
            color: 'var(--color-text)'
        });

        if (!result.isConfirmed) return;

        // Get selected address object
        const selectedAddress = savedAddresses.find(addr => addr._id === selectedAddressId);
        const finalAmount = cartTotal + 70; // Including shipping and handling

        setIsPlacingOrder(true);
        if (paymentMethod === 'cod') {
            try {
                // Prepare address object from savedAddresses
                const selectedAddress = savedAddresses.find(addr => addr._id === selectedAddressId);

                const orderData = {
                    userId: userId, // Added userId to satisfy backend requirement
                    addressId: selectedAddressId,
                    paymentMethod: "COD",
                    notes: "Direct Order (COD)",
                    // Including items and full address as per user's "example" structure
                    items: cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        size: "Standard", // Default values as per example structure
                        color: "Default"
                    })),
                    shippingAddress: {
                        name: selectedAddress.name,
                        phone: selectedAddress.phone,
                        addressLine1: selectedAddress.addressLine1,
                        addressLine2: selectedAddress.addressLine2 || "",
                        city: selectedAddress.city,
                        state: selectedAddress.state,
                        pincode: selectedAddress.pincode,
                        country: "India"
                    },
                    handlingFee: 20,
                    shippingCharges: 50
                };

                const response = await placeOrderApi(orderData);

                if (response && (response.order || response.message === "Order placed successfully")) {
                    toast.success(response.message || "Order placed successfully!", { position: "top-right" });
                    try { await clearCartApi(); } catch (e) { console.error("Manual clear failed", e); } // Force clear cart on backend
                    setCartItems([]); // Explicitly clear cart state
                    setCartTotal(0);
                    window.dispatchEvent(new Event('cart-updated')); // Notify Navbar
                    navigate('/orders'); // Navigate to orders page
                } else {
                    toast.error(response.message || "Failed to place order.", { position: "top-right" });
                }
            } catch (error) {
                console.error("COD placement error:", error);
                const errorMsg = error.response?.data?.message || "Failed to place order. Please try again.";
                toast.error(errorMsg, { position: "top-right" });
            } finally {
                setIsPlacingOrder(false);
            }
            return;
        }

        if (paymentMethod === 'upi') {
            const res = await loadRazorpay();
            if (!res) {
                toast.error("Razorpay SDK failed to load. Please check your internet connection.", { position: "top-right" });
                return;
            }

            try {
                // 1. Create Order
                const orderData = await createPaymentOrderApi({
                    shippingCharges: 50,
                    handlingFee: 20,
                    shippingCharge: 50, // Variation
                    handling_fee: 20,   // Variation
                    subtotal: Number(cartTotal),
                    total: Number(finalAmount),
                    amount: finalAmount,
                    currency: "INR",
                    receipt: `receipt_${Date.now()}`,
                    userId: userId,
                    addressId: selectedAddressId,
                    paymentMethod: "Online",
                    items: cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        size: "Standard",
                        color: "Default"
                    })),
                    notes: {
                        shippingCharges: 50,
                        handlingFee: 20,
                        userId: userId,
                        paymentMethod: "Online"
                    }
                });

                if (!orderData || !orderData.success) {
                    toast.error("Could not create order. Please try again.", { position: "top-right" });
                    return;
                }

                // 2. Open Razorpay
                const options = {
                    key: orderData.key_id,
                    amount: orderData.order.amount,
                    currency: orderData.order.currency,
                    name: "SKS Laddu",
                    description: "Order for Delicious Laddus",
                    order_id: orderData.order.id,
                    handler: async function (response) {
                        try {
                            const orderData = {
                                userId: userId,
                                addressId: selectedAddressId,
                                paymentMethod: "Online",
                                subtotal: Number(cartTotal),
                                shippingCharges: 50,
                                handlingFee: 20,
                                total: Number(finalAmount),
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                                items: cartItems.map(item => ({
                                    productId: item.productId,
                                    quantity: item.quantity,
                                    size: "Standard",
                                    color: "Default"
                                })),
                                shippingAddress: {
                                    name: selectedAddress.name,
                                    phone: selectedAddress.phone,
                                    addressLine1: selectedAddress.addressLine1,
                                    addressLine2: selectedAddress.addressLine2 || "",
                                    city: selectedAddress.city,
                                    state: selectedAddress.state,
                                    pincode: selectedAddress.pincode,
                                    country: "India"
                                },
                                notes: "Online Order"
                            };

                            const orderRes = await placeOrderApi(orderData);

                            if (orderRes && (orderRes.order || orderRes.message === "Order placed successfully")) {
                                toast.success("Payment Successful! Order Placed.", { position: "top-right" });
                                try { await clearCartApi(); } catch (e) { console.error("Manual clear failed", e); }
                                setCartItems([]);
                                setCartTotal(0);
                                window.dispatchEvent(new Event('cart-updated'));
                                navigate('/orders');
                            } else {
                                toast.error(orderRes.message || "Payment verification failed.", { position: "top-right" });
                            }
                        } catch (error) {
                            console.error("Online placement error:", error);
                            toast.error("Failed to sync order after payment.", { position: "top-right" });
                        }
                    },
                    prefill: {
                        name: selectedAddress.name,
                        contact: selectedAddress.phone,
                    },
                    notes: {
                        address: `${selectedAddress.addressLine1}, ${selectedAddress.city}`,
                        shippingCharges: 50,
                        handlingFee: 20,
                        totalAmount: finalAmount
                    },
                    theme: {
                        color: "#FFD700"
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.on('payment.failed', function (response) {
                    handlePaymentFailureApi({
                        razorpay_order_id: orderData.order.id,
                        error: response.error
                    });
                    toast.error(`Payment Failed: ${response.error.description}`, { position: "top-right" });
                });
                paymentObject.open();

            } catch (error) {
                console.error(error);
                toast.error("Something went wrong during payment initialization.", { position: "top-right" });
            } finally {
                setIsPlacingOrder(false);
            }
        }
    };

    const handleItemClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="min-h-screen relative overflow-hidden -mt-12" style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-text)`, fontFamily: `var(--font-body)` }}>
            <style>{`
                .shop-bubble {
                    position: absolute;
                    background: var(--color-primary);
                    border-radius: 50%;
                    opacity: 0.03;
                    animation: float-shop 25s infinite ease-in-out;
                    z-index: 0;
                }
                .shop-bubble-1 { width: 150px; height: 150px; left: -50px; top: 15%; }
                .shop-bubble-2 { width: 250px; height: 250px; right: -100px; top: 45%; animation-delay: 5s; }
                .shop-bubble-3 { width: 100px; height: 100px; left: 30%; bottom: 10%; animation-delay: 2s; }
                @keyframes float-shop {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(40px, -50px) scale(1.1); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(10, 40, 106, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(6, 182, 212, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(6, 182, 212, 0.5);
                }
            `}</style>

            {/* Background Bubbles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="shop-bubble shop-bubble-1"></div>
                <div className="shop-bubble shop-bubble-2"></div>
                <div className="shop-bubble shop-bubble-3"></div>
            </div>

            {/* Title Section */}
            <div className="py-8 md:py-12 px-6 md:px-24 mb-6 md:mb-10 shadow-sm relative z-10 pt-20" style={{ backgroundColor: `var(--color-surface)`, borderBottom: `1px solid var(--color-border)` }}>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>Review Your Order</h1>
                        <p className="text-xs md:text-base mt-1 md:mt-2" style={{ color: `var(--color-text-muted)` }}>Check your items and provide delivery details.</p>
                    </div>
                    <div className="px-4 py-2 md:px-6 md:py-3 rounded-2xl flex items-center gap-3 w-fit" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <ShoppingBag size={18} style={{ color: `var(--color-secondary)` }} />
                        <div>
                            <span className="text-[9px] md:text-xs uppercase font-bold tracking-wider" style={{ color: `var(--color-text-muted)` }}>Total Items: </span>
                            <span className="text-base md:text-xl font-bold" style={{ color: `var(--color-secondary)` }}>{cartItems.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-8">
                {cartItems.length === 0 && !loadingCart ? (
                    <div className="p-12 md:p-20 rounded-3xl text-center border border-dashed shadow-sm" style={{ backgroundColor: `var(--color-surface)`, borderColor: `var(--color-border)` }}>
                        <div className="text-5xl md:text-6xl mb-6">🛒</div>
                        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>Your cart is empty!</h2>
                        <p className="text-sm md:text-base mb-8 max-w-md mx-auto italic" style={{ color: `var(--color-text-muted)` }}>It seems you haven't added any products to your cart yet. Head over to our products to pick your favorites.</p>
                        <a
                            href="/laddus"
                            className="inline-block px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold transition-all no-underline shadow-lg text-sm md:text-base"
                            style={{ backgroundColor: `var(--color-secondary)`, color: `var(--color-surface)` }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#0891b2'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
                        >
                            Browse Our Products
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

                        <div className="lg:col-span-2 space-y-6 lg:space-y-10">
                            {/* Selected Items List */}
                            <div ref={addToRefs} className="scroll-section space-y-6 relative">
                                <div className="flex flex-row justify-between items-center mb-6 gap-2">
                                    <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 whitespace-nowrap" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
                                        Selected Items
                                    </h2>
                                    {cartItems.length > 0 && (
                                        <button
                                            onClick={handleClearCart}
                                            className="text-red-400 hover:text-red-300 text-[10px] md:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 px-2 py-1.5 md:px-3 md:py-2 rounded-lg transition-all flex-shrink-0"
                                            style={{ backgroundColor: 'transparent' }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                        >
                                            <Trash2 size={14} />
                                            <span className="hidden sm:inline">Clear Cart</span>
                                            <span className="sm:hidden">Clear</span>
                                        </button>
                                    )}
                                </div>
                                {/* Scroll wrap approx height of 3 items (3 * 130px + gaps) */}
                                <div className="max-h-[420px] overflow-y-auto custom-scrollbar pr-2 space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.uniqueId} className="p-2.5 md:p-4 rounded-2xl md:rounded-3xl shadow-sm transition-all overflow-hidden" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }} onMouseEnter={(e) => e.target.style.borderColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.borderColor = 'var(--color-border)'}>
                                            <div className="flex flex-row items-center gap-2.5 md:gap-4 text-left">
                                                {/* Image - More compact on mobile */}
                                                <div
                                                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-24 md:h-24 rounded-lg md:rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer"
                                                    style={{ border: `1px solid var(--color-border)` }}
                                                    onClick={() => handleItemClick(item.productId)}
                                                >
                                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                                </div>

                                                {/* Content Component */}
                                                <div className="flex-grow min-w-0">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <div className="min-w-0 flex-1">
                                                            <h3
                                                                className="font-bold text-[11px] sm:text-[13px] md:text-base cursor-pointer transition-colors line-clamp-1"
                                                                style={{ color: `var(--color-text)` }}
                                                                onClick={() => handleItemClick(item.productId)}
                                                                onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'}
                                                                onMouseLeave={(e) => e.target.style.color = 'var(--color-text)'}
                                                            >{item.name}</h3>
                                                            <p className="text-[10px] md:text-xs font-medium line-clamp-1" style={{ color: `var(--color-text-muted)` }}>
                                                                {item.ingredients || 'Fresh Ingredients'}
                                                            </p>
                                                        </div>
                                                        <div className="text-right flex-shrink-0">
                                                            <p className="font-bold text-[11px] sm:text-[13px] md:text-lg" style={{ color: `var(--color-secondary)` }}>
                                                                ₹{(item.price || 0) * (item.quantity || 1)}
                                                            </p>
                                                            <button
                                                                onClick={() => removeFromCart(item.cartItemId)}
                                                                className="mt-3 text-red-400/80 hover:text-red-300 font-bold text-xs uppercase hidden md:block"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Controls */}
                                                    <div className="mt-2 md:mt-4 flex items-center justify-between">
                                                        <div className="flex items-center gap-1.5 md:gap-3 rounded-lg p-0.5 md:p-1" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                                                            <button
                                                                onClick={() => handleQuantityChange(item.cartItemId, item.quantity, -1)}
                                                                className="w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded transition-colors font-bold"
                                                                style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-text)`, border: `1px solid var(--color-border)` }}
                                                                onMouseEnter={(e) => {
                                                                    e.target.style.backgroundColor = 'var(--color-secondary)';
                                                                    e.target.style.color = 'var(--color-surface)';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.target.style.backgroundColor = 'var(--color-surface)';
                                                                    e.target.style.color = 'var(--color-text)';
                                                                }}
                                                            >
                                                                −
                                                            </button>
                                                            <span className="text-[11px] md:text-sm font-bold min-w-[1rem] text-center" style={{ color: `var(--color-text)` }}>{item.quantity || 1}</span>
                                                            <button
                                                                onClick={() => handleQuantityChange(item.cartItemId, item.quantity, 1)}
                                                                className="w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded transition-colors font-bold"
                                                                style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-text)`, border: `1px solid var(--color-border)` }}
                                                                onMouseEnter={(e) => {
                                                                    e.target.style.backgroundColor = 'var(--color-secondary)';
                                                                    e.target.style.color = 'var(--color-surface)';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.target.style.backgroundColor = 'var(--color-surface)';
                                                                    e.target.style.color = 'var(--color-text)';
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.cartItemId)}
                                                            className="text-red-500 hover:text-red-600 font-semibold text-xs uppercase md:hidden ml-8"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {cartItems.length > 3 && (
                                    <div className="text-center mt-2">
                                        <p className="text-[10px] text-gray-500 italic">Scroll for more items ↓</p>
                                    </div>
                                )}
                            </div>

                            {/* Delivery Location Section */}
                            <div ref={addToRefs} id="delivery-address-section" className="scroll-section space-y-6">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 px-1 gap-3">
                                    <h2 className="text-sm md:text-xl font-bold flex items-center gap-2 whitespace-nowrap" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
                                        <MapPin size={18} className="md:w-5 md:h-5 flex-shrink-0" style={{ color: `var(--color-secondary)` }} />
                                        Delivery Address
                                    </h2>
                                    {savedAddresses.length > 0 && !showAddressForm && (
                                        <button
                                            onClick={() => {
                                                setEditingAddressId(null);
                                                setAddressForm({
                                                    name: '',
                                                    phone: '',
                                                    addressLine1: '',
                                                    addressLine2: '',
                                                    city: '',
                                                    state: '',
                                                    pincode: '',
                                                    addressType: 'home'
                                                });
                                                setShowAddressForm(true);
                                                const section = document.getElementById('delivery-address-section');
                                                if (section) {
                                                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }
                                            }}
                                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs md:text-xs font-bold transition-all shadow-sm w-full md:w-auto"
                                            style={{ backgroundColor: `var(--color-secondary)/10`, color: `var(--color-secondary)`, border: `1px solid var(--color-border)` }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(6, 182, 212, 0.2)'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(6, 182, 212, 0.1)'}
                                        >
                                            <Plus size={16} className="md:w-3.5 md:h-3.5" />
                                            Add New Address
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {/* Saved Addresses List */}
                                    {!showAddressForm && savedAddresses.length > 0 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {savedAddresses.map((addr) => (
                                                <div
                                                    key={addr._id}
                                                    onClick={() => setSelectedAddressId(addr._id)}
                                                    className={`p-5 rounded-[25px] border cursor-pointer transition-all relative group ${
                                                        selectedAddressId === addr._id
                                                            ? 'border-2'
                                                            : 'shadow-sm'
                                                    }`}
                                                    style={{
                                                        backgroundColor: selectedAddressId === addr._id ? 'rgba(6, 182, 212, 0.1)' : `var(--color-surface)`,
                                                        borderColor: selectedAddressId === addr._id ? `var(--color-secondary)` : `var(--color-border)`
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (selectedAddressId !== addr._id) {
                                                            e.target.style.borderColor = 'var(--color-secondary)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (selectedAddressId !== addr._id) {
                                                            e.target.style.borderColor = 'var(--color-border)';
                                                        }
                                                    }}
                                                >
                                                    {selectedAddressId === addr._id && (
                                                        <div className="absolute top-4 right-4">
                                                            <CheckCircle2 size={20} style={{ color: `var(--color-secondary)` }} />
                                                        </div>
                                                    )}

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditAddress(addr);
                                                        }}
                                                        className="absolute top-4 right-12 p-1 rounded-full transition-colors z-10"
                                                        style={{ color: `var(--color-text-muted)` }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.color = 'var(--color-secondary)';
                                                            e.target.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.color = 'var(--color-text-muted)';
                                                            e.target.style.backgroundColor = 'transparent';
                                                        }}
                                                        title="Edit Address"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>

                                                    <div className="flex items-center gap-2 mb-2">
                                                        {(addr.addressType === 'work' || addr.addressType === 'office') && <Briefcase size={16} style={{ color: `var(--color-text-muted)` }} />}
                                                        {addr.addressType === 'home' && <Home size={16} style={{ color: `var(--color-text-muted)` }} />}
                                                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: `var(--color-text-muted)` }}>
                                                            {addr.addressType === 'work' ? 'Office' : addr.addressType || 'Home'}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-bold mb-1" style={{ color: `var(--color-text)` }}>{addr.name}</h3>
                                                    <p className="text-sm leading-relaxed mb-2" style={{ color: `var(--color-text-muted)` }}>
                                                        {addr.addressLine1}, {addr.addressLine2 && `${addr.addressLine2}, `}
                                                        {addr.city}, {addr.state} - {addr.pincode}
                                                    </p>
                                                    <p className="text-sm font-medium" style={{ color: `var(--color-secondary)` }}>{addr.phone}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Add/Edit Address Form */}
                                    {(showAddressForm || savedAddresses.length === 0) && (
                                        <div className="bg-[var(--color-muted)] p-6 md:p-8 rounded-[35px] shadow-lg border border-[var(--color-secondary)]/10 space-y-5">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-bold text-white text-lg">
                                                    {editingAddressId ? 'Edit Address' : 'Add New Address'}
                                                </h3>
                                                {savedAddresses.length > 0 && (
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="text-[var(--color-text-muted)] hover:text-[var(--color-secondary)]"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Full Name"
                                                        className="w-full px-5 py-3.5 bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-secondary)]/10 rounded-2xl focus:border-[var(--color-secondary)] outline-none text-sm font-medium transition-colors placeholder-gray-400"
                                                        value={addressForm.name}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/[0-9]/g, '');
                                                            setAddressForm({ ...addressForm, name: value });
                                                        }}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        placeholder="Your Number"
                                                        className="w-full px-5 py-3.5 bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-secondary)]/10 rounded-2xl focus:border-[var(--color-secondary)] outline-none text-sm font-medium transition-colors placeholder-gray-400"
                                                        value={addressForm.phone}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                                                            setAddressForm({ ...addressForm, phone: value });
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Address Line 1</label>
                                                <input
                                                    type="text"
                                                    placeholder="House No, Building, Street"
                                                    className="w-full px-5 py-3.5 bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-secondary)]/10 rounded-2xl focus:border-[var(--color-secondary)] outline-none text-sm font-medium transition-colors placeholder-gray-400"
                                                    value={addressForm.addressLine1}
                                                    onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Address Line 2 (Optional)</label>
                                                <input
                                                    type="text"
                                                    placeholder="Area, Landmark"
                                                    className="w-full px-5 py-3.5 bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-secondary)]/10 rounded-2xl focus:border-[var(--color-secondary)] outline-none text-sm font-medium transition-colors placeholder-gray-400"
                                                    value={addressForm.addressLine2}
                                                    onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                                <div className="col-span-1 space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase">City</label>
                                                    <input
                                                        type="text"
                                                        placeholder="City"
                                                        className="w-full px-5 py-3.5 bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-secondary)]/10 rounded-2xl focus:border-[var(--color-secondary)] outline-none text-sm font-medium transition-colors placeholder-gray-400"
                                                        value={addressForm.city}
                                                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-span-1 space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase">State</label>
                                                    <input
                                                        type="text"
                                                        placeholder="State"
                                                        className="w-full px-5 py-3.5 bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-secondary)]/10 rounded-2xl focus:border-[var(--color-secondary)] outline-none text-sm font-medium transition-colors placeholder-gray-400"
                                                        value={addressForm.state}
                                                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-span-2 md:col-span-1 space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Pincode</label>
                                                    <input
                                                        type="text"
                                                        min={6}
                                                        max={6}
                                                        placeholder="Pin Code"
                                                        className="w-full px-5 py-3.5 bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-secondary)]/10 rounded-2xl focus:border-[var(--color-secondary)] outline-none text-sm font-medium transition-colors placeholder-gray-400"
                                                        value={addressForm.pincode}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                                                            setAddressForm({ ...addressForm, pincode: value });
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4 pt-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase block">Address Type</label>
                                                <div className="flex gap-4">
                                                    {['home', 'office', 'other'].map((type) => (
                                                        <label key={type} className="flex items-center cursor-pointer gap-2 group">
                                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${addressForm.addressType === type ? 'border-[var(--color-secondary)]' : 'border-gray-500 group-hover:border-[var(--color-secondary)]'}`}>
                                                                {addressForm.addressType === type && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)]" />}
                                                            </div>
                                                            <span className={`text-sm font-medium capitalize ${addressForm.addressType === type ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{type}</span>
                                                            <input
                                                                type="radio"
                                                                name="addressType"
                                                                value={type}
                                                                checked={addressForm.addressType === type}
                                                                onChange={() => setAddressForm({ ...addressForm, addressType: type })}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleSaveAddress}
                                                disabled={isAddressSaving}
                                                className="w-full py-3.5 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-2xl font-bold transform transition duration-300 hover:scale-105 transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
                                            >
                                                {isAddressSaving ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span>Saving Address...</span>
                                                    </>
                                                ) : (
                                                    editingAddressId ? 'Update Address' : 'Save Address'
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payment Methods Section */}
                            <div ref={addToRefs} className="scroll-section space-y-6">
                                <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
                                    <CreditCard size={20} style={{ color: `var(--color-secondary)` }} />
                                    Payment Method
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                                    <div
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`p-3 md:p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3`}
                                        style={{
                                            borderColor: paymentMethod === 'cod' ? `var(--color-secondary)` : `var(--color-border)`,
                                            backgroundColor: paymentMethod === 'cod' ? 'rgba(6, 182, 212, 0.05)' : `var(--color-surface)`,
                                            boxShadow: paymentMethod === 'cod' ? '0 0 15px rgba(6, 182, 212, 0.1)' : 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (paymentMethod !== 'cod') {
                                                e.target.style.borderColor = 'var(--color-secondary)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (paymentMethod !== 'cod') {
                                                e.target.style.borderColor = 'var(--color-border)';
                                            }
                                        }}
                                    >
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: paymentMethod === 'cod' ? `var(--color-secondary)` : `var(--color-surface)`, color: paymentMethod === 'cod' ? `var(--color-surface)` : `var(--color-text-muted)`, border: paymentMethod === 'cod' ? 'none' : `1px solid var(--color-border)` }}>
                                            <Banknote size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className={`font-bold text-[11px] md:text-sm whitespace-nowrap`} style={{ color: paymentMethod === 'cod' ? `var(--color-text)` : `var(--color-text-muted)` }}>Cash On Delivery</h4>
                                        </div>
                                        {paymentMethod === 'cod' && <Check size={14} className="ml-auto" style={{ color: `var(--color-secondary)` }} />}
                                    </div>

                                    <div
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`p-3 md:p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3`}
                                        style={{
                                            borderColor: paymentMethod === 'upi' ? `var(--color-secondary)` : `var(--color-border)`,
                                            backgroundColor: paymentMethod === 'upi' ? 'rgba(6, 182, 212, 0.05)' : `var(--color-surface)`,
                                            boxShadow: paymentMethod === 'upi' ? '0 0 15px rgba(6, 182, 212, 0.1)' : 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (paymentMethod !== 'upi') {
                                                e.target.style.borderColor = 'var(--color-secondary)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (paymentMethod !== 'upi') {
                                                e.target.style.borderColor = 'var(--color-border)';
                                            }
                                        }}
                                    >
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: paymentMethod === 'upi' ? `var(--color-secondary)` : `var(--color-surface)`, color: paymentMethod === 'upi' ? `var(--color-surface)` : `var(--color-text-muted)`, border: paymentMethod === 'upi' ? 'none' : `1px solid var(--color-border)` }}>
                                            <Smartphone size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className={`font-bold text-[11px] md:text-sm whitespace-nowrap`} style={{ color: paymentMethod === 'upi' ? `var(--color-text)` : `var(--color-text-muted)` }}>Online Payment</h4>
                                        </div>
                                        {paymentMethod === 'upi' && <Check size={14} className="ml-auto" style={{ color: `var(--color-secondary)` }} />}
                                    </div>
                                </div>
                                <button
                                    onClick={handleConfirmOrder}
                                    disabled={isPlacingOrder}
                                    className="w-full py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg mt-8 md:mt-10 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                    style={{
                                        backgroundColor: `var(--color-secondary)`,
                                        color: `var(--color-surface)`,
                                        boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isPlacingOrder) {
                                            e.target.style.backgroundColor = '#0891b2';
                                            e.target.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.4)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isPlacingOrder) {
                                            e.target.style.backgroundColor = 'var(--color-secondary)';
                                            e.target.style.boxShadow = '0 4px 15px rgba(6, 182, 212, 0.3)';
                                        }
                                    }}
                                >
                                    {isPlacingOrder ? (
                                        <>
                                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Placing Order...</span>
                                        </>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Order Summary Summary */}
                        <div className="lg:col-span-1">
                            <div ref={addToRefs} className="scroll-section lg:sticky lg:top-24">
                                <h2 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
                                    Final Bill
                                </h2>
                                <div className="p-4 lg:p-6 xl:p-8 rounded-[40px] shadow-xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-sm md:text-base" style={{ color: `var(--color-text-muted)` }}>
                                            <span>Items Total</span>
                                            <span className="font-bold" style={{ color: `var(--color-text)` }}>₹{cartTotal}</span>
                                        </div>
                                        <div className="flex justify-between text-sm md:text-base" style={{ color: `var(--color-text-muted)` }}>
                                            <span>Shipping Charges</span>
                                            <span className="font-bold text-green-600">₹50</span>
                                        </div>
                                        <div className="flex justify-between text-sm md:text-base" style={{ color: `var(--color-text-muted)` }}>
                                            <span>Handling Fee</span>
                                            <span className="font-bold" style={{ color: `var(--color-text)` }}>₹20</span>
                                        </div>
                                    </div>

                                    <div className="pt-6" style={{ borderTop: `1px dashed var(--color-border)` }}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-base md:text-lg font-bold" style={{ color: `var(--color-text)` }}>Grand Total</span>
                                            <span className="text-2xl md:text-3xl font-extrabold" style={{ color: `var(--color-secondary)` }}>₹{cartTotal + 70}</span>
                                        </div>
                                        <p className="text-[10px] text-right italic" style={{ color: `var(--color-text-muted)` }}>Inclusive of all taxes</p>
                                    </div>

                                    <button
                                        onClick={handleConfirmOrder}
                                        disabled={isPlacingOrder}
                                        className="w-full py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg mt-8 md:mt-10 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                        style={{
                                            backgroundColor: `var(--color-secondary)`,
                                            color: `var(--color-surface)`,
                                            boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isPlacingOrder) {
                                                e.target.style.backgroundColor = '#0891b2';
                                                e.target.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.4)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isPlacingOrder) {
                                                e.target.style.backgroundColor = 'var(--color-secondary)';
                                                e.target.style.boxShadow = '0 4px 15px rgba(6, 182, 212, 0.3)';
                                            }
                                        }}
                                    >
                                        {isPlacingOrder ? (
                                            <>
                                                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Placing Order...</span>
                                            </>
                                        ) : (
                                            'Place Order'
                                        )}
                                    </button>

                                    <p className="text-center text-[9px] md:text-[10px] mt-6 leading-relaxed px-2" style={{ color: `var(--color-text-muted)` }}>
                                        By clicking place order, you agree to our Terms of Service and Privacy Policy. Our delivery partner will contact you for location verification.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-16">
                <Footer />
            </div>
        </div>
    );
};

export default Shop;