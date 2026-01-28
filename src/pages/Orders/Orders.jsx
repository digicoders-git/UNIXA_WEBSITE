import React, { useState, useEffect } from 'react';
import { getUserOrdersApi, cancelOrderApi } from '../../api/order';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { XCircle, Package, Calendar, MapPin, CreditCard, ShoppingBag, CheckCircle2, Eye, X, Clock, Info, Printer, Download } from 'lucide-react';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';

const InvoiceModal = ({ order, isOpen, onClose }) => {
    if (!isOpen || !order) return null;

    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownloadPdf = async () => {
        const element = document.getElementById('printable-invoice');
        if (!element) return;

        setIsGenerating(true);

        const styleElements = Array.from(document.querySelectorAll('style'));
        const originalStyles = styleElements.map(el => el.innerHTML);

        try {
            styleElements.forEach(el => {
                el.innerHTML = el.innerHTML.replace(/oklch\([^)]+\)/g, '#000000');
            });

            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: 800,
                onclone: (clonedDoc) => {
                    const content = clonedDoc.querySelector('.printable-content');
                    const wrapper = clonedDoc.getElementById('printable-invoice');
                    if (content && wrapper) {
                        wrapper.style.height = 'auto';
                        wrapper.style.maxHeight = 'none';
                        wrapper.style.overflow = 'visible';
                        content.style.height = 'auto';
                        content.style.maxHeight = 'none';
                        content.style.overflow = 'visible';
                    }
                }
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Invoice_${order._id.slice(-6).toUpperCase()}.pdf`);
        } catch (error) {
            console.error("PDF generation failed:", error);
            toast.error("Failed to download PDF. Try again.");
        } finally {
            styleElements.forEach((el, i) => {
                el.innerHTML = originalStyles[i];
            });
            setIsGenerating(false);
        }
    };

    const today = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div className="bg-[#ffffff] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] animate-in zoom-in-95 relative border border-gray-100">
                <div id="printable-invoice" className="flex flex-col flex-1 overflow-hidden bg-white">
                    <div className="flex flex-row justify-between items-start p-6 pb-4 border-b border-gray-50 bg-white relative">
                        <div className="w-16">
                            <img src="/sks-logo.png" alt="SKS Logo" className="w-full h-auto" />
                        </div>
                        <div className="text-right text-[11px] leading-tight mt-4">
                            {/* <p className="font-black uppercase tracking-wider text-gray-400 mb-1">Tax Invoice</p> */}
                            <p className="font-bold text-gray-700">Date: {today}</p>
                            <p className="font-bold text-gray-700">OrderId: #{order._id.slice(-6).toUpperCase()}</p>
                        </div>
                        <button
                            onClick={onClose}
                            data-html2canvas-ignore
                            className="absolute -top-1 -right-1 md:top-2 md:right-2 p-2 hover:bg-gray-100 rounded-full transition-colors z-20"
                        >
                            <X size={20} className="text-gray-400" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar printable-content">
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-6 gap-4">
                                <div>
                                    <p className="text-[8px] sm:text-[10px] font-black uppercase text-gray-400 mb-1.5">Bill From:</p>
                                    <div className="text-[9px] sm:text-xs leading-tight">
                                        <p className="font-bold text-gray-900">SKS Laddu</p>
                                        <p className="text-gray-500">Ahirawan, Sandila, UP</p>
                                        <p className="text-gray-500 mt-0.5">8467831372, 6307736698</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] sm:text-[10px] font-black uppercase text-gray-400 mb-1.5">Bill To:</p>
                                    <div className="text-[9px] sm:text-xs leading-tight">
                                        <p className="font-bold text-gray-900">{order.shippingAddress?.name}</p>
                                        <p className="text-gray-500 break-words max-w-[120px] sm:max-w-none ml-auto">{order.shippingAddress?.addressLine1}</p>
                                        <p className="text-gray-500">{order.shippingAddress?.city}</p>
                                        <p className="text-gray-500 mt-0.5">{order.shippingAddress?.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 mb-6" />

                            <div className="mb-6">
                                <table className="w-full text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-[9px] text-gray-400 uppercase">
                                            <th className="text-left py-3 font-black">Item Description</th>
                                            <th className="text-center py-3 font-black">Qty</th>
                                            <th className="text-right py-3 font-black">Rate</th>
                                            <th className="text-right py-3 font-black">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-50 last:border-0">
                                                <td className="py-3 text-left font-bold text-gray-700">{item.productName}</td>
                                                <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                                                <td className="py-3 text-right text-gray-600">₹{item.productPrice}</td>
                                                <td className="py-3 text-right font-black text-gray-900">₹{item.productPrice * item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex flex-col items-end gap-1.5 border-t border-gray-100 pt-6">
                                <div className="flex justify-between w-full md:w-52 text-[10px]">
                                    <span className="text-gray-400 font-bold uppercase tracking-wider">Subtotal</span>
                                    <span className="text-gray-900 font-bold">₹{order.subtotal}</span>
                                </div>
                                {order.shippingCharges > 0 && (
                                    <div className="flex justify-between w-full md:w-52 text-[10px]">
                                        <span className="text-gray-400 font-bold uppercase tracking-wider">Shipping</span>
                                        <span className="text-gray-900 font-bold">₹{order.shippingCharges}</span>
                                    </div>
                                )}
                                {order.handlingFee > 0 && (
                                    <div className="flex justify-between w-full md:w-52 text-[10px]">
                                        <span className="text-gray-400 font-bold uppercase tracking-wider">Handling</span>
                                        <span className="text-gray-900 font-bold">₹{order.handlingFee}</span>
                                    </div>
                                )}
                                {order.discount > 0 && (
                                    <div className="flex justify-between w-full md:w-52 text-[10px]">
                                        <span className="text-red-400 font-bold uppercase tracking-wider">Discount</span>
                                        <span className="text-red-500 font-bold">-₹{order.discount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between w-full md:w-52 mt-2 pt-2 border-t-2 border-gray-900">
                                    <span className="text-xs font-black text-gray-900 uppercase">Grand Total</span>
                                    <span className="text-base font-black text-[var(--color-secondary)]">₹{order.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-center" data-html2canvas-ignore>
                    <button
                        onClick={handleDownloadPdf}
                        disabled={isGenerating}
                        className={`bg-gray-900 text-white px-8 py-3 rounded-xl text-xs font-black flex items-center gap-3 hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/10 w-full md:w-auto justify-center ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isGenerating ? <>GENERATING...</> : <><Download size={16} /> DOWNLOAD INVOICE</>}
                    </button>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
            ` }} />
        </div>
    );
};

const OrderDetailsModal = ({ order, isOpen, onClose, onCancel, getStatusColor, formatDate }) => {
    if (!isOpen || !order) return null;

    const handleCancelClick = () => {
        const status = order.status?.toLowerCase();
        const method = order.paymentMethod?.toLowerCase();

        if (status === 'pending' && method === 'cod') {
            onCancel(order._id);
        } else {
            Swal.fire({
                title: 'Cancellation Policy',
                text: 'This order cannot be cancelled as per our policy. Once an order is paid or processed, cancellation is not available.',
                icon: 'info',
                confirmButtonColor: 'var(--color-secondary)',
                background: '#fff',
                color: '#000',
                customClass: { popup: 'rounded-[2rem]' }
            });
        }
    };

    return (
        <div className="fixed inset-0 z-[50] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] animate-in zoom-in-95 relative">
                <div className="bg-gray-50/50 border-t border-gray-100 flex justify-between items-center" style={{ backgroundColor: `var(--color-surface)`, borderTop: `1px solid var(--color-border)` }}>
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl" style={{ backgroundColor: `var(--color-secondary)/10`, padding: '8px' }}>
                            <Package style={{ color: `var(--color-secondary)` }} size={20} />
                        </div>
                        <div>
                            <h2 className="text-base font-black leading-none" style={{ color: `var(--color-text)` }}>Order Information</h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: `var(--color-text-muted)` }}>#{order._id.slice(-6).toUpperCase()}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full transition-all active:scale-90" style={{ backgroundColor: `var(--color-surface)` }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-muted)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-surface)'}>
                        <X style={{ color: `var(--color-text-muted)` }} size={22} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar flex-grow space-y-8" style={{ backgroundColor: `var(--color-surface)` }}>
                    <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-wider font-black" style={{ color: `var(--color-text-muted)` }}>Status</p>
                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black border ${getStatusColor(order.status)} uppercase tracking-wider block w-fit shadow-sm`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[10px] uppercase tracking-wider font-black" style={{ color: `var(--color-text-muted)` }}>Order Date</p>
                            <p className="text-sm font-bold" style={{ color: `var(--color-text)` }}>{formatDate(order.createdAt)}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-black mb-4 px-1 uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: `var(--color-text-muted)` }}>
                            <ShoppingBag size={14} style={{ color: `var(--color-secondary)` }} /> Items Summary
                        </h3>
                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 rounded-2xl transition-all" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }} onMouseEnter={(e) => e.target.style.borderColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.borderColor = 'var(--color-border)'}>
                                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                                        <img src={item.product?.mainImage?.url} alt={item.productName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h4 className="font-bold text-sm truncate" style={{ color: `var(--color-text)` }}>{item.productName}</h4>
                                        <p className="text-[10px] font-bold uppercase" style={{ color: `var(--color-text-muted)` }}>{item.quantity} Unit × ₹{item.productPrice}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-sm leading-none" style={{ color: `var(--color-text)` }}>₹{item.productPrice * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-5 rounded-2xl space-y-3" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                            <h4 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2" style={{ color: `var(--color-text-muted)` }}>
                                <MapPin size={12} style={{ color: `var(--color-secondary)` }} /> Shipping Address
                            </h4>
                            <div className="text-xs space-y-1.5 font-bold leading-relaxed" style={{ color: `var(--color-text-muted)` }}>
                                <p className="font-black text-sm mb-2" style={{ color: `var(--color-text)` }}>{order.shippingAddress?.name}</p>
                                <p>{order.shippingAddress?.addressLine1}</p>
                                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                                <p className="pt-2" style={{ color: `var(--color-secondary)` }}>{order.shippingAddress?.phone}</p>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl space-y-4" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                            <h4 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2" style={{ color: `var(--color-text-muted)` }}>
                                <CreditCard size={12} style={{ color: `var(--color-secondary)` }} /> Billing Summary
                            </h4>
                            <div className="space-y-3">
                                <div className="space-y-1.5 text-[10px] pb-3" style={{ borderBottom: `1px solid var(--color-border)` }}>
                                    <div className="flex justify-between items-center font-bold" style={{ color: `var(--color-text-muted)` }}>
                                        <span>SUBTOTAL</span>
                                        <span style={{ color: `var(--color-text)` }}>₹{order.subtotal}</span>
                                    </div>
                                    {order.shippingCharges > 0 && (
                                        <div className="flex justify-between items-center font-bold" style={{ color: `var(--color-text-muted)` }}>
                                            <span>SHIPPING</span>
                                            <span style={{ color: `var(--color-text)` }}>₹{order.shippingCharges}</span>
                                        </div>
                                    )}
                                    {order.handlingFee > 0 && (
                                        <div className="flex justify-between items-center font-bold" style={{ color: `var(--color-text-muted)` }}>
                                            <span>HANDLING</span>
                                            <span style={{ color: `var(--color-text)` }}>₹{order.handlingFee}</span>
                                        </div>
                                    )}
                                    {order.discount > 0 && (
                                        <div className="flex justify-between items-center text-red-400 font-bold">
                                            <span>DISCOUNT</span>
                                            <span className="text-red-500">-₹{order.discount}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-black text-xs" style={{ color: `var(--color-text)` }}>GRAND TOTAL</span>
                                    <span className="text-xl font-black" style={{ color: `var(--color-text)` }}>₹{order.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-5 border-t flex gap-3 justify-end items-center" style={{ backgroundColor: `var(--color-surface)`, borderTop: `1px solid var(--color-border)` }}>
                    {order.status?.toLowerCase() !== 'delivered' && (
                        <button
                            onClick={handleCancelClick}
                            className="px-5 py-2.5 text-[10px] font-black text-red-500 rounded-xl transition-all mr-auto uppercase tracking-wider"
                            style={{ backgroundColor: 'transparent' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            Cancel Order
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-10 py-3 text-[10px] font-black rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider"
                        style={{ backgroundColor: `var(--color-primary)`, color: `var(--color-surface)` }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#083344'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
                    >
                        Close Details
                    </button>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
            `}} />
        </div>
    );
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoiceOrder, setInvoiceOrder] = useState(null);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await getUserOrdersApi();
            if (data && data.orders) {
                const sortedOrders = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        const result = await Swal.fire({
            title: 'Cancel Order?',
            text: "Do you want to cancel this order from your history?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#111',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Cancel it',
            background: '#fff',
            color: '#000',
            borderRadius: '1.5rem'
        });

        if (!result.isConfirmed) return;

        try {
            const res = await cancelOrderApi(orderId);
            if (res.success || res.message === "Order cancelled successfully") {
                toast.success("Order cancelled successfully");
                setIsModalOpen(false);
                fetchOrders();
            } else {
                toast.error(res.message || "Failed to cancel order");
            }
        } catch (error) {
            console.error("Cancel order error:", error);
            toast.error("Something went wrong");
        }
    };

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const openInvoice = (order) => {
        setInvoiceOrder(order);
        setIsInvoiceModalOpen(true);
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'text-green-600 bg-green-50 border-green-100';
            case 'processing': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'shipped': return 'text-orange-600 bg-orange-50 border-orange-100';
            case 'delivered': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'cancelled': return 'text-red-600 bg-red-50 border-red-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: `var(--color-surface)` }}>
                <Loader text="Fetching your orders..." />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen -mt-12" style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-text)`, fontFamily: `var(--font-body)` }}>
            <div className="flex-grow pt-20 pb-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 pb-10" style={{ borderBottom: `1px solid var(--color-border)` }}>
                        <div>
                            <h1 className="text-4xl font-black mb-2 leading-none uppercase tracking-tight" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>Orders History</h1>
                            <p className="text-sm font-medium" style={{ color: `var(--color-text-muted)` }}>Track and manage your water purifier orders</p>
                        </div>
                        <div className="px-8 py-4 rounded-3xl shadow-inner" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: `var(--color-text-muted)` }}>Total Placed</p>
                            <p className="text-2xl font-black leading-none" style={{ color: `var(--color-text)` }}>{orders.length} <span className="text-xs font-bold" style={{ color: `var(--color-text-muted)` }}>Records</span></p>
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="rounded-3xl p-20 text-center" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                                <ShoppingBag size={32} style={{ color: `var(--color-text-muted)` }} />
                            </div>
                            <h2 className="text-2xl font-bold mb-4" style={{ color: `var(--color-text)` }}>No records found</h2>
                            <p className="text-sm mb-10 max-w-xs mx-auto" style={{ color: `var(--color-text-muted)` }}>Start your journey with UNIXA water purifiers today!</p>
                            <button
                                onClick={() => navigate('/laddus')}
                                className="px-10 py-4 font-black rounded-2xl hover:scale-105 transition-all shadow-lg"
                                style={{ backgroundColor: `var(--color-secondary)`, color: `var(--color-surface)` }}
                            >
                                Shop Products
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="hidden md:grid grid-cols-7 gap-4 px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: `var(--color-text-muted)` }}>
                                <div className="col-span-2">Order Identification</div>
                                <div>Placement Date</div>
                                <div>Order Total</div>
                                <div>Status</div>
                                <div>Invoice</div>
                                <div className="text-right">Manage</div>
                            </div>

                            {orders.map((order) => (
                                <div key={order._id} className="rounded-[2rem] p-5 md:px-10 md:py-6 transition-all group shadow-sm" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }} onMouseEnter={(e) => e.target.style.borderColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.borderColor = 'var(--color-border)'}>
                                    <div className="flex flex-col md:grid md:grid-cols-7 items-start md:items-center gap-4">
                                        <div className="w-full md:col-span-2 flex items-center gap-5">
                                            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                                                <Package size={20} style={{ color: `var(--color-secondary)` }} />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-base font-bold leading-tight" style={{ color: `var(--color-text)` }}>Order #{order._id.slice(-6).toUpperCase()}</p>
                                                <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: `var(--color-text-muted)` }}>
                                                    {order.items.length} {order.items.length > 1 ? 'items' : 'item'}
                                                    <span className="md:hidden opacity-50"> • {formatDate(order.createdAt)}</span>
                                                </p>
                                            </div>
                                            <div className="md:hidden shrink-0">
                                                <p className="text-lg font-black" style={{ color: `var(--color-text)` }}>₹{order.total}</p>
                                            </div>
                                        </div>

                                        <div className="hidden md:block">
                                            <p className="text-sm font-bold" style={{ color: `var(--color-text-muted)` }}>{formatDate(order.createdAt)}</p>
                                        </div>

                                        <div className="hidden md:block">
                                            <p className="text-lg font-black" style={{ color: `var(--color-text)` }}>₹{order.total}</p>
                                        </div>

                                        <div className="w-full md:w-auto shrink-0">
                                            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border ${getStatusColor(order.status)} uppercase tracking-wider block w-fit shadow-inner`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="w-full md:w-auto">
                                            <button
                                                onClick={() => openInvoice(order)}
                                                className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 rounded-xl font-bold text-[10px] transition-all active:scale-95 uppercase tracking-wider"
                                                style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-text-muted)`, border: `1px solid var(--color-border)` }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-muted)'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-surface)'}
                                            >
                                                Invoice
                                            </button>
                                        </div>

                                        <div className="w-full md:block md:text-right">
                                            <button
                                                onClick={() => openOrderDetails(order)}
                                                className="flex items-center justify-center gap-2 w-full md:w-auto md:ml-auto px-6 py-3 rounded-[1.2rem] font-black text-xs transition-all shadow-md active:scale-95"
                                                style={{ backgroundColor: `var(--color-secondary)`, color: `var(--color-surface)` }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#0891b2'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <OrderDetailsModal
                order={selectedOrder}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCancel={handleCancelOrder}
                getStatusColor={getStatusColor}
                formatDate={formatDate}
            />

            <InvoiceModal
                order={invoiceOrder}
                isOpen={isInvoiceModalOpen}
                onClose={() => setIsInvoiceModalOpen(false)}
            />

            <Footer />
        </div>
    );
};

export default Orders;
