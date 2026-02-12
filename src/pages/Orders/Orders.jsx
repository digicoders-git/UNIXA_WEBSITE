import React, { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isTokenValid, getToken } from '../../utils/auth';
import { useCart } from '../../context/CartContext';
import { 
    XCircle, Package, Calendar, MapPin, CreditCard, ShoppingBag, CheckCircle2, 
    Eye, Clock, Info, Printer, Download, Search, Filter, 
    ArrowRight, ChevronRight, Truck, ShieldCheck, Star, 
    RefreshCcw, Layers, Zap, Heart
} from 'lucide-react';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Footer from '../../components/layout/Footer';

// Advanced Components
const OrderLifecycle = ({ status }) => {
    const steps = [
        { label: 'Placed', icon: <Package size={14} />, color: 'blue' },
        { label: 'Confirmed', icon: <CheckCircle2 size={14} />, color: 'indigo' },
        { label: 'Shipped', icon: <Truck size={14} />, color: 'emerald' },
        { label: 'Delivered', icon: <ShieldCheck size={14} />, color: 'green' }
    ];

    const isCancelled = status.toLowerCase() === 'cancelled';
    const currentStep = isCancelled ? -1 : steps.findIndex(s => s.label.toLowerCase() === status.toLowerCase());

    return (
        <div className="relative pt-10 pb-4 px-2">
            <div className="absolute top-14 left-0 w-full h-0.5 bg-slate-100" />
            <div 
                className="absolute top-14 left-0 h-0.5 bg-blue-500 transition-all duration-1000 ease-in-out" 
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
            <div className="relative flex justify-between">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3 relative z-10">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isCancelled ? 'bg-slate-50 border border-slate-100 text-slate-200' : (idx <= currentStep ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 scale-110' : 'bg-white border border-slate-100 text-slate-300')}`}>
                            {step.icon}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider ${idx <= currentStep ? 'text-slate-900' : 'text-slate-300'}`}>{step.label}</span>
                    </div>
                ))}
            </div>
            {isCancelled && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                    <span className="bg-red-50 text-red-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-red-100 shadow-xl shadow-red-500/10 rotate-[-5deg]">Order Terminated</span>
                </div>
            )}
        </div>
    );
};

const InvoiceModal = ({ order, isOpen, onClose }) => {
    const [show, setShow] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShow(true), 10);
        } else {
            setShow(false);
        }
    }, [isOpen]);

    if (!isOpen || !order) return null;

    const handleDownloadPdf = async () => {
        const element = document.getElementById('printable-invoice');
        if (!element) {
            toast.error("Invoice element not found!");
            return;
        }
        setIsGenerating(true);
        try {
            // Options to ensure full capture even if scrolled
            const canvas = await html2canvas(element, { 
                scale: 2, 
                useCORS: true, 
                logging: false,
                backgroundColor: '#ffffff',
                onclone: (clonedDoc) => {
                    const clonedElement = clonedDoc.getElementById('printable-invoice');
                    if (clonedElement) {
                        clonedElement.style.height = 'auto';
                        clonedElement.style.maxHeight = 'none';
                        clonedElement.style.overflow = 'visible';
                        clonedElement.style.paddingBottom = '40px'; // Extra safety margin
                    }
                }
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            // Handle multi-page if height exceeds A4 (approx 297mm)
            const pageHeight = pdf.internal.pageSize.getHeight();
            let heightLeft = pdfHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`UNIXA_INV_${order._id.slice(-6).toUpperCase()}.pdf`);
            toast.success("Security Ledger Downloaded!");
        } catch (error) {
            console.error("PDF Generation Error:", error);
            toast.error("Generation sequence failed.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className={`fixed inset-0 z-[11000] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}>
            <div className={`bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all duration-500 ${show ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-12 scale-95 opacity-0'}`} onClick={e => e.stopPropagation()}>
                <div id="printable-invoice" className="flex flex-col flex-1 overflow-y-auto p-12" style={{ backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'sans-serif' }}>
                    <div className="flex justify-between items-start mb-16">
                        <div>
                            <div className="w-16 h-16 rounded-[28px] flex items-center justify-center mb-6" style={{ backgroundColor: '#3b82f6', color: '#ffffff', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2)' }}>
                                <ShieldCheck size={32} />
                            </div>
                            <h2 className="text-2xl font-black tracking-tighter uppercase" style={{ color: '#0f172a' }}>Unixa <span style={{ color: '#3b82f6' }}>Pure</span></h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-1" style={{ color: '#94a3b8' }}>Official Proof of Authenticity</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: '#94a3b8' }}>Digital Signature</p>
                            <p className="text-lg font-black" style={{ color: '#0f172a' }}>#UX-{order._id.slice(-6).toUpperCase()}</p>
                            <p className="text-xs font-bold mt-1" style={{ color: '#94a3b8' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 mb-16">
                        <div className="space-y-3">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: 'rgba(59, 130, 246, 0.6)' }}>Issued From</p>
                            <div className="space-y-1">
                                <p className="text-sm font-black" style={{ color: '#0f172a' }}>Unixa Pure HQ</p>
                                <p className="text-[11px] font-bold leading-relaxed" style={{ color: '#94a3b8' }}>Ahirawan, Sandila, Uttar Pradesh, 241204</p>
                            </div>
                        </div>
                        <div className="text-right space-y-3">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: 'rgba(59, 130, 246, 0.6)' }}>Recipient Identity</p>
                            <div className="space-y-1">
                                <p className="text-sm font-black" style={{ color: '#0f172a' }}>{order.shippingAddress?.name}</p>
                                <p className="text-[11px] font-bold leading-relaxed" style={{ color: '#94a3b8' }}>{order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t mb-12" style={{ borderColor: '#f1f5f9' }}>
                        {order.items.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-12 py-8 border-b items-center" style={{ borderColor: '#f1f5f9' }}>
                                <div className="col-span-8">
                                    <h4 className="text-sm font-black uppercase" style={{ color: '#0f172a' }}>{item.productName}</h4>
                                    
                                    <div className="mt-2 space-y-1">
                                        <p className="text-[10px] font-bold flex items-center gap-2" style={{ color: '#3b82f6' }}>
                                            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#3b82f6' }}></span>
                                            WARRANTY ID: <span style={{ color: '#0f172a' }}>{item.warrantyId || `WAR-REG-${Math.random().toString(36).substr(2, 6).toUpperCase()}`}</span>
                                        </p>
                                        
                                        {item.amcPlan && (
                                            <p className="text-[10px] font-bold flex items-center gap-2" style={{ color: '#3b82f6' }}>
                                                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#3b82f6' }}></span>
                                                AMC PLAN: <span className="uppercase tracking-tight" style={{ color: '#0f172a' }}>{item.amcPlan}</span>
                                            </p>
                                        )}

                                        {item.amcId && (
                                            <p className="text-[10px] font-bold flex items-center gap-2" style={{ color: '#3b82f6' }}>
                                                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#3b82f6' }}></span>
                                                AMC REF: <span className="uppercase" style={{ color: '#0f172a' }}>{item.amcId}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 text-center font-black" style={{ color: '#94a3b8' }}>0{item.quantity}</div>
                                <div className="col-span-3 text-right font-black" style={{ color: '#0f172a' }}>₹{item.productPrice.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-10 border-t-4 border-double" style={{ borderColor: '#0f172a' }}>
                        <div className="flex flex-col gap-4 text-xs font-black uppercase tracking-widest">
                            <div className="flex justify-between items-center px-4">
                                <span style={{ color: '#94a3b8' }}>Total Valuation</span>
                                <span className="text-2xl font-black tracking-tighter" style={{ color: '#0f172a' }}>₹{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-10 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button onClick={onClose} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors">Abort</button>
                    <button 
                        onClick={handleDownloadPdf} 
                        disabled={isGenerating}
                        className="px-10 py-5 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center gap-4 active:scale-95"
                    >
                        {isGenerating ? 'Processing Ledger...' : <><Download size={14} strokeWidth={3} /> Secure PDF</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

const RefundRequestModal = ({ order, type, isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState('');
    const [bankDetails, setBankDetails] = useState({
        accountHolderName: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        upiId: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !order) return null;

    const needsBankDetails = order.paymentMethod !== 'COD';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reason.trim()) {
            toast.error("Please provide a reason");
            return;
        }
        if (needsBankDetails && !bankDetails.upiId && !bankDetails.accountNumber) {
            toast.error("Please provide Bank Details or UPI ID for refund");
            return;
        }
        setIsSubmitting(true);
        await onSubmit(order, type, reason, needsBankDetails ? bankDetails : null);
        setIsSubmitting(false);
        setReason('');
        setBankDetails({ accountHolderName: '', bankName: '', accountNumber: '', ifscCode: '', upiId: '' });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[11000] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 overflow-y-auto pt-20 pb-10" onClick={onClose}>
            <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-10 flex flex-col gap-6 transition-all duration-500 my-auto" onClick={e => e.stopPropagation()}>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{type} Request</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Order #UX-{order._id.slice(-6).toUpperCase()} • {needsBankDetails ? 'Refund Required' : 'No Refund Action'}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Reason for {type.toLowerCase()}</label>
                        <textarea 
                            value={reason}
                            required
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[24px] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 min-h-[100px]"
                            placeholder={`Tell us why you want to ${type.toLowerCase()} this order...`}
                        />
                    </div>

                    {needsBankDetails && (
                        <div className="space-y-4 bg-blue-50/50 p-6 rounded-[30px] border border-blue-100">
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Refund Destination Ledger</p>
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    placeholder="Account Holder"
                                    value={bankDetails.accountHolderName}
                                    onChange={(e) => setBankDetails({...bankDetails, accountHolderName: e.target.value})}
                                    className="col-span-2 p-4 bg-white border border-blue-100 rounded-2xl text-[10px] font-black uppercase"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Bank Name"
                                    value={bankDetails.bankName}
                                    onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                                    className="p-4 bg-white border border-blue-100 rounded-2xl text-[10px] font-black uppercase"
                                />
                                <input 
                                    type="text" 
                                    placeholder="IFSC Code"
                                    value={bankDetails.ifscCode}
                                    onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})}
                                    className="p-4 bg-white border border-blue-100 rounded-2xl text-[10px] font-black uppercase"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Account Number"
                                    value={bankDetails.accountNumber}
                                    onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                                    className="col-span-2 p-4 bg-white border border-blue-100 rounded-2xl text-[10px] font-black uppercase"
                                />
                                <div className="col-span-2 flex items-center gap-4">
                                    <div className="h-px bg-blue-100 flex-1" />
                                    <span className="text-[9px] font-black text-blue-300 uppercase">OR</span>
                                    <div className="h-px bg-blue-100 flex-1" />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="UPI ID (VPA)"
                                    value={bankDetails.upiId}
                                    onChange={(e) => setBankDetails({...bankDetails, upiId: e.target.value})}
                                    className="col-span-2 p-4 bg-white border border-blue-100 rounded-2xl text-[10px] font-black uppercase"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-4 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-[20px] text-[10px] font-black uppercase tracking-[0.3em] hover:text-slate-900 transition-all">Abort</button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-[2] py-4 bg-slate-900 text-white rounded-[20px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-600 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? 'Transmitting...' : `Execute ${type}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
const Orders = () => {

    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const [refundType, setRefundType] = useState('');
    const { addToCart } = useCart();

    useEffect(() => {
        if (!isTokenValid()) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
             const userId = localStorage.getItem('userId');
             if (!userId) {
                 setLoading(false);
                 return;
             }
             try {
                const { data } = await api.get(`/orders/user/${userId}`);
                
                if (data && data.orders) {
                    setOrders(data.orders);
                }
            } catch (err) {
                console.error("Fetch orders error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const handleRefundSubmit = async (order, type, reason, bankDetails) => {
        try {
            const userId = localStorage.getItem('userId');
            
            // 1. Log the Refund/Cancellation Request
            const payload = {
                orderId: order._id,
                userId,
                type,
                reason,
                amount: order.total || 0,
                bankDetails
            };
            await api.post(`/refunds`, payload);

            // 2. If it's a Cancellation, trigger the actual order status update
            if (type === 'Cancellation') {
                await api.put(`/user-orders/${order._id}/cancel`);
                
                // Instant State Update
                setOrders(prevOrders => 
                    prevOrders.map(o => 
                        o._id === order._id 
                        ? { ...o, status: 'cancelled', cancelledAt: new Date() } 
                        : o
                    )
                );
            } else if (type === 'Return') {
                await api.put(`/user-orders/${order._id}/return`);

                // Instant State Update
                setOrders(prevOrders => 
                    prevOrders.map(o => 
                        o._id === order._id 
                        ? { ...o, status: 'returned' } 
                        : o
                    )
                );
            }

            Swal.fire({
                title: 'Success!',
                text: type === 'Cancellation' 
                    ? 'Your order has been cancelled successfully.' 
                    : type === 'Return'
                    ? 'Your return request has been submitted and order status updated.'
                    : `Your ${type.toLowerCase()} request has been logged and is under review.`,
                icon: 'success',
                confirmButtonColor: '#3b82f6',
                borderRadius: '30px'
            });

        } catch (error) {
            console.error(`${type} error:`, error);
            toast.error(error.response?.data?.message || `Failed to process ${type.toLowerCase()} request`);
        }
    };
    const handleRepeatOrder = (order) => {
        try {
            order.items.forEach(item => {
                addToCart({
                    _id: item.product?._id || item.product,
                    id: item.product?._id || item.product,
                    name: item.productName,
                    price: item.productPrice,
                    img: item.product?.mainImage?.url || item.product?.img,
                    quantity: item.quantity
                });
            });
            
            Swal.fire({
                title: 'Cart Restored',
                text: 'Order items have been added to your cart.',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'View Cart',
                cancelButtonText: 'Continue Shopping',
                confirmButtonColor: '#3b82f6',
                borderRadius: '30px'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/shop');
                }
            });
        } catch (error) {
            console.error("Repeat order error:", error);
            toast.error("Failed to restore order items");
        }
    };

    const handleSupport = (order) => {
        const orderId = order._id.slice(-6).toUpperCase();
        const message = `Hello Unixa Support, I need assistance with my Order #UX-${orderId}. Date: ${new Date(order.createdAt).toLocaleDateString()}.`;
        const supportNumber = '919554746401'; 
        window.open(`https://wa.me/${supportNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const stats = useMemo(() => {
        return {
            totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
            activeOrders: orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length,
            purePoints: Math.floor(orders.reduce((sum, o) => sum + o.total, 0) / 100),
            savedCarbon: (orders.length * 24.5).toFixed(1)
        };
    }, [orders]);


    const filteredOrders = orders.filter(o => {
        const matchesFilter = filter === 'All' || o.status?.toLowerCase() === filter?.toLowerCase();
        
        const itemName = o.items?.[0]?.productName?.toLowerCase() || '';
        const orderId = o._id?.toLowerCase() || '';
        const search = searchQuery.toLowerCase();

        const matchesSearch = itemName.includes(search) || orderId.includes(search);
        
        return matchesFilter && matchesSearch;
    });

    const staticParticles = useMemo(() => [...Array(15)].map((_, i) => ({
        id: i,
        top: (i * 7) % 100 + '%',
        left: (i * 13) % 100 + '%',
        size: (i * 15) % 200 + 50,
        duration: (i * 2) % 10 + 10
    })), []);

    return (
        <div className="min-h-screen bg-[#fcfdfe] text-slate-900 font-['Outfit',sans-serif] overflow-x-hidden pt-28 relative">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {staticParticles.map(p => (
                    <div key={p.id} className="absolute bg-blue-500/5 rounded-full blur-[80px] animate-pulse" style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDuration: `${p.duration}s` }} />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 relative z-10">
                {/* Refined Advanced Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 animate-in fade-in slide-in-from-top-10 duration-700">
                    <div className="space-y-6 max-w-3xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-[20px] flex items-center justify-center shadow-2xl shadow-slate-200">
                                <Layers size={22} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 leading-none">Security Protocol</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mt-1 leading-none">Asset Management</span>
                            </div>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] py-2">
                            <span className="text-slate-900 block">Product</span>
                            <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:200%_auto] animate-gradient-text bg-clip-text text-transparent">History.</span>
                        </h1>
                        <p className="text-slate-400 font-bold max-w-xl text-[10px] md:text-xs uppercase tracking-[0.3em] leading-relaxed opacity-60">
                            A comprehensive encrypted ledger of your premium water security acquisitions and deployment logs.
                        </p>
                    </div>

                    <div className="flex items-center bg-white border border-slate-100 p-2 rounded-[32px] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 w-full lg:w-auto self-start lg:self-end">
                        <div className="relative flex-1 lg:w-[300px]">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                            <input 
                                type="text"
                                placeholder="Search archives..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-transparent text-xs font-bold focus:outline-none"
                            />
                        </div>
                        <div className="w-px h-8 bg-slate-100 mx-2" />
                        <button className="p-4 bg-slate-50 text-slate-400 hover:text-blue-500 rounded-[22px] transition-all group">
                            <Filter size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                    </div>
                </div>

                {/* Stats Dashboard */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                    {[
                        { label: 'Total Equity', value: `₹${stats.totalSpent.toLocaleString()}`, icon: <CreditCard size={18} />, color: 'blue' },
                        { label: 'Live Assets', value: stats.activeOrders, icon: <Package size={18} />, color: 'indigo' },
                        { label: 'Loyalty Rep', value: stats.purePoints, icon: <Star size={18} />, color: 'yellow' },
                        { label: 'Carbon Offset', value: `${stats.savedCarbon}kg`, icon: <Heart size={18} />, color: 'green' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/60 backdrop-blur-md border border-white p-8 rounded-[40px] shadow-sm flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-2xl bg-white border border-slate-50 flex items-center justify-center text-${stat.color}-500 shadow-sm group-hover:scale-110 transition-transform`}>
                                    {stat.icon}
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{stat.label}</p>
                                <h4 className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-4 mb-10 p-2 bg-slate-100 w-fit rounded-[32px] animate-in fade-in zoom-in duration-700 delay-300">
                    {['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled', 'Returned'].map(t => (
                        <button 
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-10 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${filter === t ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="space-y-10">
                    {loading ? (
                        <div className="py-40 text-center animate-pulse">
                            <div className="w-20 h-20 bg-slate-100 rounded-[30px] flex items-center justify-center mx-auto mb-6">
                                <Clock size={40} className="text-blue-500 animate-spin" />
                            </div>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Accessing Archives...</h2>
                        </div>
                    ) : filteredOrders.length > 0 ? (
                        filteredOrders.map((order, idx) => (
                            <div key={order._id} className="bg-white border border-slate-100 rounded-[50px] shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden group animate-in fade-in slide-in-from-bottom-20 duration-1000" style={{ animationDelay: `${idx * 150}ms` }}>
                                <div className="p-8 md:p-14 flex flex-col xl:flex-row gap-12 items-start xl:items-center">
                                    {/* Asset Identity */}
                                    <div className="relative shrink-0">
                                        <div className="w-48 h-48 bg-slate-50 rounded-[50px] overflow-hidden border border-slate-100 group-hover:rotate-3 transition-transform duration-700">
                                            <img 
                                                src={order.items[0]?.product?.mainImage?.url || order.items[0]?.product?.img || "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop"} 
                                                alt="asset" 
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                                            />
                                            {order.items.length > 1 && (
                                                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white font-black text-xl shadow-2xl">
                                                    +{order.items.length - 1}
                                                </div>
                                            )}
                                        </div>
                                    </div>


                                    {/* Asset Info */}
                                    <div className="flex-1 space-y-8 w-full">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                        order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 
                                                        order.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                                                        'bg-blue-50 text-blue-600'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">ID: {order._id.toUpperCase()}</span>
                                                </div>
                                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                                                    {order.items[0].productName}
                                                </h3>
                                                <div className="flex items-center gap-6 text-slate-400">
                                                   <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                                   <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><CreditCard size={12} /> {order.paymentMethod}</span>
                                                </div>
                                            </div>
                                            <div className="text-left md:text-right">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">Total Valuation</p>
                                                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">₹{order.total.toLocaleString()}</h2>
                                            </div>
                                        </div>

                                        {/* Dynamic Tracking Timeline */}
                                        <div className="bg-slate-50/50 rounded-[40px] p-6 border border-slate-50">
                                            <OrderLifecycle status={order.status} />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-3 w-full xl:w-72 shrink-0">
                                        <button 
                                            onClick={() => { setSelectedOrder(order); setIsInvoiceModalOpen(true); }}
                                            className="w-full py-5 bg-slate-900 text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95"
                                        >
                                            <Download size={16} /> Secure Invoice
                                        </button>
                                        <button 
                                            onClick={() => handleRepeatOrder(order)}
                                            className="w-full py-4 bg-white border border-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-95"
                                        >
                                            <RefreshCcw size={16} /> Repeat Order
                                        </button>
                                        <div className="flex gap-3">
                                            { (order.status.toLowerCase() === 'pending' || order.status.toLowerCase() === 'confirmed') ? (
                                                <button 
                                                    onClick={() => { setSelectedOrder(order); setRefundType('Cancellation'); setIsRefundModalOpen(true); }}
                                                    className="flex-1 py-4 bg-white border border-red-50 text-red-400 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center hover:text-red-600 hover:bg-red-50/50 transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            ) : order.status.toLowerCase() === 'delivered' ? (
                                                <button 
                                                    onClick={() => { setSelectedOrder(order); setRefundType('Return'); setIsRefundModalOpen(true); }}
                                                    className="flex-1 py-4 bg-white border border-blue-50 text-blue-400 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center hover:text-blue-600 hover:bg-blue-50/50 transition-all"
                                                >
                                                    Return
                                                </button>
                                            ) : (
                                                <button disabled className="flex-1 py-4 bg-slate-50 border border-slate-100 text-slate-300 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center">
                                                    Track
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleSupport(order)}
                                                className="flex-1 py-4 bg-white border border-slate-100 text-slate-400 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center hover:text-red-500 hover:bg-red-50/30 transition-all"
                                            >
                                                Support
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-40 text-center animate-in fade-in zoom-in duration-700">
                           <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-10">
                               <XCircle size={60} className="text-slate-300" />
                           </div>
                           <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">No Archives Found</h2>
                           <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-4">Your acquisition history is currently empty.</p>
                           <button onClick={() => navigate('/shop')} className="mt-10 px-10 py-5 bg-blue-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
                               Explore Inventory
                           </button>
                        </div>
                    )}
                </div>

                {/* Bottom Assistance */}
                <div className="mt-32 p-14 bg-slate-900 rounded-[60px] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] -mr-32 -mt-32 group-hover:bg-blue-500/20 transition-all duration-700" />
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-4 text-center md:text-left">
                            <h3 className="text-3xl font-black tracking-tighter uppercase leading-none">Need Priority <span className="text-blue-500">Dispatch</span> Support?</h3>
                            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Our high-response unit is available 24/7 for logistics queries.</p>
                        </div>
                        <button className="px-12 py-6 bg-white text-slate-900 rounded-[32px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center gap-4">
                            Connect To HQ <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <InvoiceModal order={selectedOrder} isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} />
            <RefundRequestModal 
                order={selectedOrder} 
                type={refundType} 
                isOpen={isRefundModalOpen} 
                onClose={() => setIsRefundModalOpen(false)} 
                onSubmit={handleRefundSubmit}
            />
            <Footer />
        </div>
    );
};

export default Orders;
