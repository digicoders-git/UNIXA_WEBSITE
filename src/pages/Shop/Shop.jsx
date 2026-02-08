import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Trash2, MapPin, CreditCard, CheckCircle2, Plus, Minus, Banknote, Smartphone, X, Home, Briefcase, User, Pencil, Tag, ChevronRight, Check, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Footer from '../../components/layout/Footer';
import { getToken, isTokenValid } from '../../utils/auth';

const Shop = () => {
    const navigate = useNavigate();
    const { cart, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Address Management State
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [isAddressSaving, setIsAddressSaving] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid());
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);

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

    const handleQuantityChange = (itemId, change) => {
        const item = cart.find(i => i.id === itemId || i._id === itemId);
        if (item) {
            updateQuantity(itemId, item.quantity + change);
        }
    };

    const fetchAddresses = async () => {
        if (!isLoggedIn) return;
        setIsLoadingAddresses(true);
        try {
            const response = await api.get('/users/addresses');
            setSavedAddresses(response.data.addresses || []);
            const defaultAddr = response.data.addresses?.find(a => a.isDefault);
            if (defaultAddr) setSelectedAddressId(defaultAddr._id);
        } catch (err) {
            console.error("Fetch addresses error:", err);
        } finally {
            setIsLoadingAddresses(false);
        }
    };

    useEffect(() => {
        setIsLoggedIn(isTokenValid());
        fetchAddresses();
    }, [isLoggedIn]);

    const handleSaveAddress = async () => {
        if (!addressForm.name || !addressForm.phone || !addressForm.pincode) {
            toast.error("Please fill required fields!");
            return;
        }
        setIsAddressSaving(true);
        try {
            if (editingAddressId) {
                const { data } = await api.put(`/users/addresses/${editingAddressId}`, addressForm);
                setSavedAddresses(data.addresses);
                toast.success("Address updated successfully!");
            } else {
                const { data } = await api.post(`/users/addresses`, addressForm);
                setSavedAddresses(data.addresses);
                toast.success("New address added!");
            }
            setShowAddressForm(false);
            setEditingAddressId(null);
            setAddressForm({ name: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', addressType: 'home' });
        } catch (err) {
            console.error("Save address error:", err);
            toast.error(err.response?.data?.message || "Failed to save address");
        } finally {
            setIsAddressSaving(false);
        }
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
        if (cart.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        const selectedAddress = savedAddresses.find(a => a._id === selectedAddressId);
        if (!selectedAddress) {
            toast.error("Please select a shipping address!");
            return;
        }

        setIsPlacingOrder(true);
        try {
            const userId = localStorage.getItem('userId');
            
            if (!userId) {
                toast.error("User ID not found. Please login again.");
                return;
            }

            const orderData = {
                userId,
                items: cart.map(item => ({
                    productId: item.id || item._id,
                    quantity: item.quantity,
                    productName: item.name,
                    productPrice: item.price
                })),
                shippingAddress: {
                    name: selectedAddress.name,
                    phone: selectedAddress.phone,
                    addressLine1: selectedAddress.addressLine1,
                    city: selectedAddress.city,
                    state: selectedAddress.state,
                    pincode: selectedAddress.pincode,
                    country: 'India'
                },
                paymentMethod: paymentMethod.toUpperCase(),
                subtotal: totalAmount,
                total: totalAmount
            };

            const { data } = await api.post(`/orders`, orderData);
            
            if (data) {
                Swal.fire({
                    title: 'Order Placed!',
                    text: 'Your pure water journey begins soon.',
                    icon: 'success',
                    confirmButtonColor: 'var(--color-primary)'
                }).then(() => {
                    clearCart();
                    navigate('/orders');
                });
            }
        } catch (err) {
            console.error("Order error:", err);
            toast.error(err.response?.data?.message || "Failed to place order");
        } finally {
            setIsPlacingOrder(false);
        }
    };




    return (
        <div className="min-h-screen bg-(--color-surface) text-(--color-text) font-(--font-body) overflow-x-hidden">

            {/* Hero Section - Matching Theme */}
            <section className="relative pt-20 pb-10 md:pt-28 md:pb-14 px-6 text-center bg-slate-50 border-b border-slate-200 rounded-b-4xl md:rounded-b-8xl overflow-hidden">
                {/* Water Bubbles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-blue-300/40 border border-white/40 blur-[0.5px] animate-float-bubble"
                            style={{
                                width: `${(i * 7) % 30 + 10}px`,
                                height: `${(i * 7) % 30 + 10}px`,
                                left: `${(i * 13) % 100}%`,
                                bottom: `-${(i * 5) % 20 + 10}%`,
                                animationDuration: `${(i * 2) % 4 + 4}s`,
                                animationDelay: `${(i * i) % 3}s`
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
                        <ShoppingBag size={16} className="text-(--color-primary)" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Secure Checkout
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                        Order <span className="text-(--color-primary)">Summary</span>
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
                                    <ShoppingBag size={20} className="text-(--color-primary)" /> Cart Items
                                </h2>
                                {cart.length === 0 ? (
                                    <div className="p-20 text-center bg-white rounded-[40px] border border-slate-100">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <ShoppingBag size={32} className="text-slate-300" />
                                        </div>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Your tray is empty</p>
                                        <Link to="/purifiers" className="text-(--color-primary) font-black text-[10px] uppercase tracking-widest mt-4 inline-block hover:underline">Explore Purifiers</Link>
                                    </div>
                                ) : cart.map(item => (
                                    <div key={item.id || item._id} className="flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm items-center transition-all hover:border-blue-100">
                                        <img src={item.img} className="w-24 h-24 object-contain rounded-2xl bg-slate-50 p-2" alt={item.name} />
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="font-bold text-xl text-slate-900">{item.name}</h3>
                                            <p className="text-slate-400 text-sm mb-3 font-medium">{item.filtration || 'Elite Purification'}</p>
                                            <div className="flex items-center justify-center sm:justify-start gap-4">
                                                <button onClick={() => handleQuantityChange(item.id || item._id, -1)} className="w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"><Minus size={14} /></button>
                                                <span className="font-bold text-slate-800">{item.quantity}</span>
                                                <button onClick={() => handleQuantityChange(item.id || item._id, 1)} className="w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"><Plus size={14} /></button>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-center sm:items-end gap-1">
                                            <p className="text-2xl font-black text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            <button onClick={() => removeFromCart(item.id || item._id)} className="text-red-400 text-xs font-bold flex items-center gap-1 hover:text-red-500 transition-colors"><Trash2 size={12} /> Remove</button>
                                        </div>
                                    </div>
                                ))}
                                    {/* Items rendering ends */}
                                </div>

                                {/* Login Required Placeholder or Address Section */}
                                {!isLoggedIn ? (
                                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 text-center mt-8 relative overflow-hidden group">
                                         {/* Background decoration */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-16 -mt-16 group-hover:bg-cyan-50 transition-colors" />
                                        
                                        <div className="relative z-10 space-y-6">
                                            <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-2 text-(--color-primary) ring-8 ring-blue-50/30">
                                                <User size={36} strokeWidth={2.5} />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Login Required</h3>
                                                <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto leading-relaxed">Please sign in to your account to provide delivery details and complete your purchase.</p>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                                                <Link 
                                                    to="/login" 
                                                    className="px-8 py-4 bg-(--color-primary) text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                                                >
                                                    Login Now <ChevronRight size={14} />
                                                </Link>
                                                <Link 
                                                    to="/register" 
                                                    className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-blue-100 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                                >
                                                    Create Account
                                                </Link>
                                            </div>
                                            
                                            <div className="pt-6 flex items-center justify-center gap-4 text-slate-300">
                                                <div className="h-px w-8 bg-slate-100" />
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Safe & Secure</span>
                                                <div className="h-px w-8 bg-slate-100" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm mt-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                                                <MapPin size={20} className="text-(--color-primary)" /> Shipping Address
                                            </h2>
                                            <button
                                                onClick={() => {
                                                    setEditingAddressId(null);
                                                    setAddressForm({ name: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', addressType: 'home' });
                                                    setShowAddressForm(true);
                                                }}
                                                className="text-xs font-bold text-(--color-primary) flex items-center gap-1 hover:underline"
                                            >
                                                <Plus size={14} /> {savedAddresses.length > 0 ? 'New Address' : 'Add First Address'}
                                            </button>
                                        </div>
                                        
                                        {isLoadingAddresses ? (
                                            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
                                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                                <p className="text-[10px] font-black uppercase tracking-widest">Finding your addresses...</p>
                                            </div>
                                        ) : savedAddresses.length === 0 ? (
                                            <div 
                                                onClick={() => setShowAddressForm(true)}
                                                className="p-10 border-2 border-dashed border-slate-100 rounded-[2rem] text-center cursor-pointer hover:border-blue-200 hover:bg-slate-50/50 transition-all group"
                                            >
                                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-slate-300 group-hover:text-blue-400 group-hover:bg-white transition-colors">
                                                    <Plus size={24} />
                                                </div>
                                                <p className="text-slate-400 font-bold text-sm">No saved addresses found.</p>
                                                <p className="text-slate-300 text-xs mt-1">Click to add your delivery location.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {savedAddresses.map(addr => (
                                                    <div 
                                                        key={addr._id} 
                                                        onClick={() => setSelectedAddressId(addr._id)}
                                                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative group ${selectedAddressId === addr._id ? 'border-(--color-primary) bg-blue-50/20' : 'border-slate-50 hover:border-slate-200 bg-white'}`}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2">
                                                                    <p className="font-bold text-slate-900">{addr.name}</p>
                                                                    <span className="px-2 py-0.5 bg-white border border-slate-200 text-[8px] font-black uppercase rounded text-slate-400 tracking-widest">{addr.addressType}</span>
                                                                    {addr.isDefault && <span className="text-[8px] font-black uppercase text-emerald-500">Default</span>}
                                                                </div>
                                                                <p className="text-slate-500 text-sm font-medium">{addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}, {addr.city}</p>
                                                                <p className="text-slate-500 text-sm font-medium">{addr.state} - {addr.pincode}</p>
                                                                <p className="text-slate-800 text-sm font-bold mt-2">Mobile: {addr.phone}</p>
                                                            </div>
                                                            <div className="flex flex-col items-end gap-3">
                                                                <div className="pointer-events-none">
                                                                    <CheckCircle2 className={selectedAddressId === addr._id ? "text-(--color-primary)" : "text-slate-200"} size={24} />
                                                                </div>
                                                                <button 
                                                                    onClick={(e) => { e.stopPropagation(); handleEditAddress(addr); }} 
                                                                    className="text-slate-400 hover:text-slate-900 transition-colors p-2"
                                                                >
                                                                    <Pencil size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                        {/* Summary Section */}
                        <div className="lg:col-span-1">
                            <div className="bg-white text-slate-900 p-8 rounded-[40px] sticky top-32 border border-slate-100 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold mb-8 tracking-tight">Order Details</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-slate-900 font-bold">₹{totalAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Shipping</span>
                                        <span className="text-emerald-500 font-bold">FREE</span>
                                    </div>
                                    <div className="h-px bg-slate-100 my-6" />
                                    <div className="flex justify-between items-end">
                                        <span className="font-bold text-slate-500">Total Payable</span>
                                        <span className="text-3xl font-black text-(--color-primary) tracking-tighter">₹{totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>


                                {isLoggedIn ? (
                                    <>
                                        <div className="space-y-4 mb-10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Payment Selection</p>
                                            <div className="grid grid-cols-1 gap-3">
                                                <div onClick={() => setPaymentMethod('cod')} className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${paymentMethod === 'cod' ? 'border-(--color-primary) bg-blue-50 text-(--color-primary)' : 'border-slate-100 text-slate-600 hover:border-slate-200'}`}>
                                                    <Banknote size={20} />
                                                    <span className="font-bold text-sm">Cash on Delivery</span>
                                                    {paymentMethod === 'cod' && <Check size={16} className="ml-auto" />}
                                                </div>
                                                <div onClick={() => setPaymentMethod('online')} className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${paymentMethod === 'online' ? 'border-(--color-primary) bg-blue-50 text-(--color-primary)' : 'border-slate-100 text-slate-600 hover:border-slate-200'}`}>
                                                    <Smartphone size={20} />
                                                    <span className="font-bold text-sm">Online (Razorpay)</span>
                                                    {paymentMethod === 'online' && <Check size={16} className="ml-auto" />}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleConfirmOrder}
                                            disabled={isPlacingOrder || cart.length === 0}
                                            className="w-full py-5 bg-(--color-primary) text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {isPlacingOrder ? 'Processing...' : 'Place Order'}
                                        </button>
                                    </>
                                ) : (
                                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                                        <Lock size={24} className="mx-auto text-slate-300 mb-3" />
                                        <p className="text-xs font-bold text-slate-500 mb-4 px-2">Complete login to unlock payment & order features.</p>
                                        <Link to="/login" className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] inline-block">Sign In</Link>
                                    </div>
                                )}
                                <p className="text-[10px] text-center text-slate-500 mt-6 font-medium italic">Secure SSL Encrypted Transaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Address Modal - Premium & Refined (Decreased Size) */}
            <div className={`fixed inset-0 z-[2000] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 ${showAddressForm ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div 
                    className={`bg-white w-full max-w-md rounded-[32px] p-6 md:p-8 shadow-2xl relative transition-all duration-500 ease-out ${showAddressForm ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}
                >
                    <button 
                        onClick={() => setShowAddressForm(false)} 
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 rounded-full hover:bg-slate-100"
                    >
                        <X size={18} />
                    </button>

                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                                <MapPin size={18} className="text-(--color-primary)" />
                            </div>
                            <h2 className="text-xl font-black text-slate-900">Add <span className="text-(--color-primary)">Address</span></h2>
                        </div>
                        <p className="text-slate-400 font-medium text-[10px] ml-12">Delivery details for your units.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 col-span-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                            <input value={addressForm.name} onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })} className="w-full p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-(--color-primary) focus:bg-white transition-all shadow-inner" placeholder="E.g. Ricky Singh" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                            <input value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} className="w-full p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-(--color-primary) focus:bg-white transition-all shadow-inner" placeholder="Mobile no." />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Pincode</label>
                            <input value={addressForm.pincode} onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })} className="w-full p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-(--color-primary) focus:bg-white transition-all shadow-inner" placeholder="6-digits" />
                        </div>
                        <div className="space-y-1.5 col-span-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Address Detail</label>
                            <input value={addressForm.addressLine1} onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })} className="w-full p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-(--color-primary) focus:bg-white transition-all shadow-inner" placeholder="House/Flat No, Apartment, Street" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">City</label>
                            <input value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-(--color-primary) focus:bg-white transition-all shadow-inner" placeholder="City" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">State</label>
                            <input value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} className="w-full p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-(--color-primary) focus:bg-white transition-all shadow-inner" placeholder="State" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <button 
                            onClick={handleSaveAddress} 
                            disabled={isAddressSaving} 
                            className="w-full py-4 bg-(--color-primary) text-white rounded-[18px] font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isAddressSaving ? 'Saving...' : <><Check size={16} strokeWidth={3} /> Save Address</>}
                        </button>
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    );
};

export default Shop;
