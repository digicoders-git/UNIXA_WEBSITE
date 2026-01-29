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

    const handleSaveAddress = () => {
        setIsAddressSaving(true);
        setTimeout(() => {
            if (editingAddressId) {
                setSavedAddresses(prev => prev.map(addr => addr._id === editingAddressId ? { ...addressForm, _id: editingAddressId } : addr));
                toast.success("Address updated successfully!");
            } else {
                const newId = `addr${Date.now()}`;
                setSavedAddresses(prev => [...prev, { ...addressForm, _id: newId }]);
                toast.success("New address added!");
            }
            setIsAddressSaving(false);
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
        }, 1000);
    };

    const handleEditAddress = (addr) => {
        setEditingAddressId(addr._id);
        setAddressForm({
            name: addr.name,
            phone: addr.phone,
            addressLine1: addr.addressLine1,
            addressLine2: addr.addressLine2,
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode,
            addressType: addr.addressType
        });
        setShowAddressForm(true);
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
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden">

            {/* Hero Section - Matching Theme */}
            <section className="relative pt-20 pb-10 md:pt-28 md:pb-14 px-6 text-center bg-slate-50 border-b border-slate-200 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden">
                {/* Water Bubbles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-blue-300/40 border border-white/40 blur-[0.5px] animate-float-bubble"
                            style={{
                                width: `${Math.random() * 30 + 10}px`,
                                height: `${Math.random() * 30 + 10}px`,
                                left: `${Math.random() * 100}%`,
                                bottom: `-${Math.random() * 20 + 10}%`,
                                animationDuration: `${Math.random() * 4 + 4}s`,
                                animationDelay: `${Math.random() * 3}s`
                            }}
                        />
                    ))}
                </div>

                <style>{`
                    @keyframes float-bubble {
                        0% { transform: translateY(0) scale(1); opacity: 0; }
                        20% { opacity: 0.4; }
                        80% { opacity: 0.4; }
                        100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
                    }
                    .animate-float-bubble {
                        animation: float-bubble linear infinite;
                    }
                `}</style>

                <div className="relative z-10 max-w-4xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mx-auto shadow-sm">
                        <ShoppingBag size={16} className="text-[var(--color-primary)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Secure Checkout
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                        Order <span className="text-[var(--color-primary)]">Summary</span>
                    </h1>

                    <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        Complete your purchase for authentic water purification excellence.
                    </p>
                </div>
            </section>

            <div className="relative z-10 py-10 md:py-16 px-4 md:px-8 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Items Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 px-2">
                                    <ShoppingBag size={20} className="text-[var(--color-primary)]" /> Cart Items
                                </h2>
                                {cartItems.map(item => (
                                    <div key={item.uniqueId} className="flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm items-center transition-all hover:border-blue-100">
                                        <img src={item.img} className="w-24 h-24 object-contain rounded-2xl bg-slate-50 p-2" alt={item.name} />
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="font-bold text-xl text-slate-900">{item.name}</h3>
                                            <p className="text-slate-400 text-sm mb-3 font-medium">{item.filtration}</p>
                                            <div className="flex items-center justify-center sm:justify-start gap-4">
                                                <button onClick={() => handleQuantityChange(item.cartItemId, -1)} className="w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"><Minus size={14} /></button>
                                                <span className="font-bold text-slate-800">{item.quantity}</span>
                                                <button onClick={() => handleQuantityChange(item.cartItemId, 1)} className="w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"><Plus size={14} /></button>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-center sm:items-end gap-1">
                                            <p className="text-2xl font-black text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            <button onClick={() => removeFromCart(item.cartItemId)} className="text-red-400 text-xs font-bold flex items-center gap-1 hover:text-red-500 transition-colors"><Trash2 size={12} /> Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Address Section */}
                            <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm mt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                                        <MapPin size={20} className="text-[var(--color-primary)]" /> Shipping Address
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setEditingAddressId(null);
                                            setAddressForm({ name: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', addressType: 'home' });
                                            setShowAddressForm(true);
                                        }}
                                        className="text-xs font-bold text-[var(--color-primary)] flex items-center gap-1 hover:underline"
                                    >
                                        <Plus size={14} /> New Address
                                    </button>
                                </div>
                                {savedAddresses.map(addr => (
                                    <div key={addr._id} className="p-5 rounded-2xl border-2 border-[var(--color-primary)] bg-blue-50/20 relative group">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-slate-900">{addr.name}</p>
                                                    <span className="px-2 py-0.5 bg-white border border-slate-200 text-[8px] font-black uppercase rounded text-slate-400 tracking-widest">{addr.addressType}</span>
                                                </div>
                                                <p className="text-slate-500 text-sm font-medium">{addr.addressLine1}, {addr.city}</p>
                                                <p className="text-slate-500 text-sm font-medium">{addr.state} - {addr.pincode}</p>
                                                <p className="text-slate-800 text-sm font-bold mt-2">Mobile: {addr.phone}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-3">
                                                <div onClick={() => setSelectedAddressId(addr._id)} className="cursor-pointer">
                                                    <CheckCircle2 className={selectedAddressId === addr._id ? "text-[var(--color-primary)]" : "text-slate-200"} size={24} />
                                                </div>
                                                <button onClick={() => handleEditAddress(addr)} className="text-slate-400 hover:text-slate-900 transition-colors"><Pencil size={14} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="lg:col-span-1">
                            <div className="bg-white text-slate-900 p-8 rounded-[40px] sticky top-32 border border-slate-100 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold mb-8 tracking-tight">Order Details</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-slate-900 font-bold">₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Shipping</span>
                                        <span className="text-emerald-500 font-bold">FREE</span>
                                    </div>
                                    <div className="h-px bg-slate-100 my-6" />
                                    <div className="flex justify-between items-end">
                                        <span className="font-bold text-slate-500">Total Payable</span>
                                        <span className="text-3xl font-black text-[var(--color-primary)] tracking-tighter">₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Payment Selection</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div onClick={() => setPaymentMethod('cod')} className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${paymentMethod === 'cod' ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-slate-100 text-slate-600 hover:border-slate-200'}`}>
                                            <Banknote size={20} />
                                            <span className="font-bold text-sm">Cash on Delivery</span>
                                            {paymentMethod === 'cod' && <Check size={16} className="ml-auto" />}
                                        </div>
                                        <div onClick={() => setPaymentMethod('online')} className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${paymentMethod === 'online' ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-slate-100 text-slate-600 hover:border-slate-200'}`}>
                                            <Smartphone size={20} />
                                            <span className="font-bold text-sm">Online (Razorpay)</span>
                                            {paymentMethod === 'online' && <Check size={16} className="ml-auto" />}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleConfirmOrder}
                                    disabled={isPlacingOrder}
                                    className="w-full py-5 bg-[var(--color-primary)] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isPlacingOrder ? 'Processing...' : 'Place Order'}
                                </button>
                                <p className="text-[10px] text-center text-slate-500 mt-6 font-medium italic">Secure SSL Encrypted Transaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Address Modal - Compact & Refined */}
            {showAddressForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                        <button onClick={() => setShowAddressForm(false)} className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-slate-900">{editingAddressId ? 'Edit' : 'Add'} <span className="text-[var(--color-primary)]">Address</span></h2>
                            <p className="text-slate-400 font-medium text-xs mt-1">Provide delivery details for your order.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1 col-span-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                <input value={addressForm.name} onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-[var(--color-primary)] transition-all" placeholder="Enter name" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                                <input value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-[var(--color-primary)] transition-all" placeholder="Mobile no." />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Pincode</label>
                                <input value={addressForm.pincode} onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-[var(--color-primary)] transition-all" placeholder="6-digits" />
                            </div>
                            <div className="space-y-1 col-span-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Address Detail</label>
                                <input value={addressForm.addressLine1} onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-[var(--color-primary)] transition-all" placeholder="House/Flat No, Street" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">City</label>
                                <input value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-[var(--color-primary)] transition-all" placeholder="City" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">State</label>
                                <input value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-[var(--color-primary)] transition-all" placeholder="State" />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button onClick={handleSaveAddress} disabled={isAddressSaving} className="flex-1 py-3.5 bg-[var(--color-primary)] text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50">
                                {isAddressSaving ? 'Saving...' : 'Save & Continue'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Shop;
