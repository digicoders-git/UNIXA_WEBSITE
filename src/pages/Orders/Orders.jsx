import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
    XCircle, Package, Calendar, MapPin, CreditCard, ShoppingBag, CheckCircle2, 
    Eye, X, Clock, Info, Printer, Download, Search, Filter, 
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

    const currentStep = steps.findIndex(s => s.label.toLowerCase() === status.toLowerCase());

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
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${idx <= currentStep ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 scale-110' : 'bg-white border border-slate-100 text-slate-300'}`}>
                            {step.icon}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider ${idx <= currentStep ? 'text-slate-900' : 'text-slate-300'}`}>{step.label}</span>
                    </div>
                ))}
            </div>
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
            const canvas = await html2canvas(element, { 
                scale: 2, 
                useCORS: true, 
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
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
                <div id="printable-invoice" className="flex flex-col flex-1 overflow-y-auto p-12 bg-white">
                    <div className="flex justify-between items-start mb-16">
                        <div>
                            <div className="w-16 h-16 bg-blue-500 rounded-[28px] flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-500/20">
                                <ShieldCheck size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Unixa <span className="text-blue-500">Pure</span></h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">Official Proof of Authenticity</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Digital Signature</p>
                            <p className="text-lg font-black text-slate-900">#UX-{order._id.slice(-6).toUpperCase()}</p>
                            <p className="text-xs font-bold text-slate-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 mb-16">
                        <div className="space-y-3">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500/60">Issued From</p>
                            <div className="space-y-1">
                                <p className="text-sm font-black text-slate-900">Unixa Pure HQ</p>
                                <p className="text-[11px] font-bold text-slate-400 leading-relaxed">Ahirawan, Sandila, Uttar Pradesh, 241204</p>
                            </div>
                        </div>
                        <div className="text-right space-y-3">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500/60">Recipient Identity</p>
                            <div className="space-y-1">
                                <p className="text-sm font-black text-slate-900">{order.shippingAddress?.name}</p>
                                <p className="text-[11px] font-bold text-slate-400 leading-relaxed">{order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-50 mb-12">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-12 py-8 border-b border-slate-50 items-center">
                                <div className="col-span-8">
                                    <h4 className="text-sm font-black text-slate-900 uppercase">{item.productName}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 mt-1">S/N: UX-PRD-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                                </div>
                                <div className="col-span-1 text-center font-black text-slate-400">0{item.quantity}</div>
                                <div className="col-span-3 text-right font-black text-slate-900">₹{item.productPrice.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-10 border-t-4 border-slate-900 border-double">
                        <div className="flex flex-col gap-4 text-xs font-black uppercase tracking-widest">
                            <div className="flex justify-between items-center px-4">
                                <span className="text-slate-400">Total Valuation</span>
                                <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{order.total.toLocaleString()}</span>
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

// Mock data moved outside to avoid impurity during render
const INITIAL_ORDERS = [
    {
        _id: 'ord_ux_001',
        createdAt: new Date().toISOString(),
        status: 'Delivered',
        total: 39999,
        subtotal: 39999,
        items: [
            {
                productName: 'HydroLife Alkaline Pro',
                productPrice: 39999,
                quantity: 1,
                product: { mainImage: { url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop' } }
            }
        ],
        shippingAddress: { name: 'Ricky Singh', addressLine1: '123, Purity Lane', city: 'New Delhi', phone: '9876543210', pincode: '110001' },
        paymentMethod: 'Prepaid'
    },
    {
        _id: 'ord_ux_002',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        status: 'Shipped',
        total: 12499,
        subtotal: 12499,
        items: [
            {
                productName: 'NexGen Carbon Block',
                productPrice: 12499,
                quantity: 1,
                product: { mainImage: { url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop' } }
            }
        ],
        shippingAddress: { name: 'Ricky Singh', addressLine1: '123, Purity Lane', city: 'New Delhi', phone: '9876543210', pincode: '110001' },
        paymentMethod: 'COD'
    }
];

const Orders = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders] = useState(INITIAL_ORDERS);

    const stats = useMemo(() => {
        return {
            totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
            activeOrders: orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length,
            purePoints: Math.floor(orders.reduce((sum, o) => sum + o.total, 0) / 100),
            savedCarbon: (orders.length * 24.5).toFixed(1)
        };
    }, [orders]);

    const filteredOrders = orders.filter(o => {
        const matchesFilter = filter === 'All' || o.status === filter;
        const matchesSearch = o.productName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            o._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            o.items[0].productName.toLowerCase().includes(searchQuery.toLowerCase());
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
                <div className="flex gap-4 mb-10 p-2 bg-slate-100 w-fit rounded-[32px] animate-in fade-in zoom-in duration-700 delay-300">
                    {['All', 'Shipped', 'Delivered', 'Cancelled'].map(t => (
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
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order, idx) => (
                            <div key={order._id} className="bg-white border border-slate-100 rounded-[50px] shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden group animate-in fade-in slide-in-from-bottom-20 duration-1000" style={{ animationDelay: `${idx * 150}ms` }}>
                                <div className="p-8 md:p-14 flex flex-col xl:flex-row gap-12 items-start xl:items-center">
                                    {/* Asset Identity */}
                                    <div className="relative shrink-0">
                                        <div className="w-48 h-48 bg-slate-50 rounded-[50px] overflow-hidden border border-slate-100 group-hover:rotate-3 transition-transform duration-700">
                                            <img src={order.items[0].product.mainImage.url} alt="asset" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
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
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
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
                                        <button className="w-full py-4 bg-white border border-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-95">
                                            <RefreshCcw size={16} /> Repeat Order
                                        </button>
                                        <div className="flex gap-3">
                                            <button className="flex-1 py-4 bg-white border border-slate-100 text-slate-400 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center hover:text-blue-500 hover:bg-blue-50/30 transition-all">
                                                Track
                                            </button>
                                            <button className="flex-1 py-4 bg-white border border-slate-100 text-slate-400 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center hover:text-red-500 hover:bg-red-50/30 transition-all">
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
            <Footer />
        </div>
    );
};

export default Orders;
