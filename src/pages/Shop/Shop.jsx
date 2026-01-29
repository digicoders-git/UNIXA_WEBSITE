import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Trash2, MapPin, CreditCard, CheckCircle2, Plus, Minus, Banknote, Smartphone, X, Home, Briefcase, User, Pencil, Tag, ChevronRight, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Footer from '../../components/layout/Footer';

const Shop = () => {
    const navigate = useNavigate();
    const sectionRefs = useRef([]);
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Cart Data State (Static)
    const [cartItems, setCartItems] = useState([
        {
            uniqueId: '1',
            cartItemId: 'c1',
            productId: '1',
            name: 'HydroLife Alkaline Pro',
            img: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop',
            price: 39999,
            originalPrice: 45000,
            discountPercent: 11,
            filtration: '11-Stage RO+UV',
            warranty: '1 Year',
            quantity: 1,
            description: 'Advanced 11-stage ionization with Platinum plates.'
        }
    ]);
    const [cartTotal, setCartTotal] = useState(39999);
    const [loadingCart, setLoadingCart] = useState(false);

    // Address Management State (Static)
    const [savedAddresses, setSavedAddresses] = useState([
        {
            _id: 'addr1',
            name: 'Ricky Singh',
            phone: '9876543210',
            addressLine1: '123, Purity Lane',
            addressLine2: 'Tech Park Area',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110001',
            addressType: 'home',
            isDefault: true
        }
    ]);
    const [selectedAddressId, setSelectedAddressId] = useState('addr1');
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

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setCartTotal(total);
    }, [cartItems]);

    const handleQuantityChange = (itemId, change) => {
        setCartItems(prev => prev.map(item => {
            if (item.cartItemId === itemId) {
                const newQty = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => prev.filter(item => item.cartItemId !== itemId));
        toast.success("Item removed from cart!");
    };

    const handleConfirmOrder = async () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }
        setIsPlacingOrder(true);
        setTimeout(() => {
            setIsPlacingOrder(false);
            Swal.fire({
                title: 'Order Placed!',
                text: 'Your pure water journey begins soon.',
                icon: 'success',
                confirmButtonColor: 'var(--color-primary)'
            }).then(() => {
                navigate('/orders');
            });
        }, 1500);
    };

    const handleItemClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[var(--color-surface)] pt-24" style={{ fontFamily: `var(--font-body)` }}>
            {/* Background Bubbles (simplified) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-secondary)] rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 py-12 px-6 md:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-black text-[var(--color-secondary)] tracking-tighter">
                                Checkout <span className="text-[var(--color-primary)]">Details</span>
                            </h1>
                            <p className="text-slate-500 font-medium max-w-lg">Complete your order for premium purification.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Items Section */}
                        <div className="lg:col-span-2 space-y-8">
                            {cartItems.map(item => (
                                <div key={item.uniqueId} className="flex gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm items-center">
                                    <img src={item.img} className="w-24 h-24 object-contain rounded-2xl bg-slate-50" alt={item.name} />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-xl">{item.name}</h3>
                                        <p className="text-slate-400 text-sm mb-4">{item.filtration}</p>
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => handleQuantityChange(item.cartItemId, -1)} className="p-2 bg-slate-100 rounded-lg"><Minus size={16} /></button>
                                            <span className="font-bold">{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item.cartItemId, 1)} className="p-2 bg-slate-100 rounded-lg"><Plus size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-[var(--color-primary)]">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        <button onClick={() => removeFromCart(item.cartItemId)} className="text-red-400 mt-2 text-sm font-bold flex items-center gap-1"><Trash2 size={14} /> Remove</button>
                                    </div>
                                </div>
                            ))}

                            {/* Address Section */}
                            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm mt-10">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <MapPin className="text-[var(--color-primary)]" /> Delivery Address
                                </h2>
                                {savedAddresses.map(addr => (
                                    <div key={addr._id} className="p-6 rounded-2xl border-2 border-[var(--color-primary)] bg-blue-50/50">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-lg">{addr.name}</p>
                                                <p className="text-slate-500">{addr.addressLine1}, {addr.city}</p>
                                                <p className="text-slate-500">{addr.state} - {addr.pincode}</p>
                                                <p className="font-bold mt-2">Mobile: {addr.phone}</p>
                                            </div>
                                            <CheckCircle2 className="text-[var(--color-primary)]" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="lg:col-span-1">
                            <div className="bg-[var(--color-secondary)] text-white p-8 rounded-[40px] sticky top-32">
                                <h3 className="text-2xl font-bold mb-8 italic">Order Summary</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-slate-400">
                                        <span>Subtotal</span>
                                        <span className="text-white font-bold">₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Shipping</span>
                                        <span className="text-green-400 font-bold">FREE</span>
                                    </div>
                                    <div className="h-px bg-white/10 my-6" />
                                    <div className="flex justify-between text-xl">
                                        <span className="font-bold">Total Amount</span>
                                        <span className="font-black text-[var(--color-primary)]">₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Payment Method</p>
                                    <div onClick={() => setPaymentMethod('cod')} className={`p-4 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[var(--color-primary)] bg-white/10' : 'border-white/10'}`}>
                                        <Banknote size={20} />
                                        <span className="font-bold">Cash on Delivery</span>
                                    </div>
                                    <div onClick={() => setPaymentMethod('online')} className={`p-4 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-[var(--color-primary)] bg-white/10' : 'border-white/10'}`}>
                                        <Smartphone size={20} />
                                        <span className="font-bold">Online Payment</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleConfirmOrder}
                                    disabled={isPlacingOrder}
                                    className="w-full py-5 bg-[var(--color-primary)] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isPlacingOrder ? 'Processing...' : 'Confirm Order'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;