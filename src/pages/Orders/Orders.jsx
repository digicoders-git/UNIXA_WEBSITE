import React, { useState, useEffect } from 'react';
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
        try {
            const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Invoice_${order._id.slice(-6).toUpperCase()}.pdf`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to download PDF.");
        } finally {
            setIsGenerating(false);
        }
    };

    const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div className="bg-[#ffffff] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative border border-gray-100">
                <div id="printable-invoice" className="flex flex-col flex-1 overflow-hidden bg-white p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-16">
                            <img src="/sks-logo.png" alt="Logo" className="w-full h-auto" />
                        </div>
                        <div className="text-right text-[11px]">
                            <p className="font-bold">INVOICE #{order._id.slice(-6).toUpperCase()}</p>
                            <p className="text-gray-500">{today}</p>
                        </div>
                    </div>
                    <div className="flex justify-between mb-8 text-xs">
                        <div>
                            <p className="text-gray-400 uppercase font-black mb-1">From</p>
                            <p className="font-bold">UNIXA PURE WATER</p>
                            <p className="text-gray-500">Ahirawan, Sandila, UP</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-400 uppercase font-black mb-1">Bill To</p>
                            <p className="font-bold">{order.shippingAddress?.name}</p>
                            <p className="text-gray-500">{order.shippingAddress?.addressLine1}</p>
                        </div>
                    </div>
                    <table className="w-full text-xs mb-8">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-400 uppercase">
                                <th className="text-left py-3">Item</th>
                                <th className="text-center py-3">Qty</th>
                                <th className="text-right py-3">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-50">
                                    <td className="py-3 font-bold">{item.productName}</td>
                                    <td className="py-3 text-center">{item.quantity}</td>
                                    <td className="py-3 text-right">₹{item.productPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex flex-col items-end gap-2 text-xs border-t border-gray-100 pt-6">
                        <div className="flex justify-between w-40 text-gray-400">
                            <span>Subtotal</span>
                            <span className="text-black font-bold">₹{order.subtotal}</span>
                        </div>
                        <div className="flex justify-between w-40 text-gray-400">
                            <span>Shipping</span>
                            <span className="text-black font-bold">FREE</span>
                        </div>
                        <div className="flex justify-between w-40 text-lg font-black mt-4 border-t-2 border-black pt-2">
                            <span>Total</span>
                            <span className="text-[var(--color-primary)]">₹{order.total}</span>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 flex justify-center border-t">
                    <button onClick={handleDownloadPdf} disabled={isGenerating} className="bg-black text-white px-8 py-3 rounded-xl text-xs font-black flex items-center gap-2">
                        {isGenerating ? 'GENERATING...' : <><Download size={16} /> DOWNLOAD</>}
                    </button>
                    <button onClick={onClose} className="ml-4 text-xs font-bold text-gray-400 p-2">CLOSE</button>
                </div>
            </div>
        </div>
    );
};

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([
        {
            _id: 'ord_hyp_001',
            createdAt: new Date().toISOString(),
            status: 'Confirmed',
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
            shippingAddress: {
                name: 'Ricky Singh',
                addressLine1: '123, Purity Lane',
                city: 'New Delhi',
                phone: '9876543210',
                pincode: '110001'
            },
            paymentMethod: 'COD'
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [invoiceOrder, setInvoiceOrder] = useState(null);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'text-green-600 bg-green-50 border-green-100';
            case 'processing': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'delivered': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-surface)] pt-24 pb-16 px-6 md:px-24">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12 pb-8 border-b border-slate-100">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-[var(--color-secondary)] tracking-tighter">My <span className="text-[var(--color-primary)]">Orders</span></h1>
                        <p className="text-slate-500 font-medium">Tracking your pure water journey.</p>
                    </div>
                </div>

                {orders.map(order => (
                    <div key={order._id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center relative">
                            <Package className="text-[var(--color-primary)]" size={32} />
                            <div className="absolute -top-2 -right-2 bg-[var(--color-secondary)] text-white text-[10px] font-black px-2 py-1 rounded-full">{order.items.length}</div>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Order ID: #{order._id.slice(-6).toUpperCase()}</p>
                            <h3 className="text-xl font-bold mb-4">{order.items[0].productName} {order.items.length > 1 && `+ ${order.items.length - 1} more`}</h3>
                            <div className="flex gap-6">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(order.status)}`}>{order.status}</span>
                                <span className="text-slate-400 text-sm font-bold">{formatDate(order.createdAt)}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-[var(--color-secondary)] mb-4">₹{order.total.toLocaleString()}</p>
                            <button onClick={() => { setInvoiceOrder(order); setIsInvoiceModalOpen(true); }} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--color-primary)] hover:underline">
                                <Download size={14} /> Download Invoice
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <InvoiceModal order={invoiceOrder} isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} />
            <Footer />
        </div>
    );
};

export default Orders;
