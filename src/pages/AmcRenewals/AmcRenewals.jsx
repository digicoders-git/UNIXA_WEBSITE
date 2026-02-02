import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import { ShieldCheck, Zap, RefreshCw, Clock, Calendar, Info, ChevronRight, ArrowRight, X, Check, Star, Shield, Smartphone, Activity, Wrench, History, FileText, Droplets, Target, Cpu, HardDrive, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../components/layout/Footer';
import Swal from 'sweetalert2';
import { createPortal } from 'react-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


// Advanced Components
const DeviceHealthWidget = ({ health, onScan, isScanning }) => (
    <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-[40px] shadow-xl relative overflow-hidden group h-full">
        <div className="absolute top-0 right-0 p-4">
            <Activity className={`${isScanning ? 'text-blue-500 animate-pulse' : 'text-blue-500/20'} group-hover:text-blue-500/40 transition-colors`} size={60} />
        </div>
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Neural Health Monitor</h3>
            <button 
                onClick={onScan}
                disabled={isScanning}
                className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${isScanning ? 'bg-blue-500 text-white animate-pulse' : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white'}`}
            >
                {isScanning ? 'Scanning System...' : 'Initiate Deep Scan'}
            </button>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="72" cy="72" r="66" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100/50" />
                    <circle cx="72" cy="72" r="66" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={414.69} strokeDashoffset={414.69 - (414.69 * health) / 100} className={`${health > 80 ? 'text-blue-500' : 'text-yellow-500'} transition-all duration-1000 ease-out`} strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">{health}%</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{health > 80 ? 'Optimal' : 'Needs Check'}</span>
                </div>
                {isScanning && (
                   <div className="absolute inset-0 border-2 border-blue-400 rounded-full animate-ping opacity-20" />
                )}
            </div>
            <div className="flex-1 w-full space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                        <span className="text-slate-400 flex items-center gap-2"><Cpu size={10} /> Filter Capacity</span>
                        <span className="text-blue-600">85% Residual</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-blue-500 transition-all duration-1000 ${isScanning ? 'w-full' : 'w-[85%]'}`} />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                        <span className="text-slate-400 flex items-center gap-2"><HardDrive size={10} /> Membrane Purity</span>
                        <span className="text-green-500">92% Index</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-green-500 transition-all duration-1000 ${isScanning ? 'w-full' : 'w-[92%]'}`} />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                        <span className="text-slate-400 flex items-center gap-2"><Target size={10} /> TDS Level</span>
                        <span className="text-indigo-600">38 PPM</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-indigo-500 transition-all duration-1000 ${isScanning ? 'w-full' : 'w-[75%]'}`} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ServiceTimeline = ({ steps }) => (
    <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px]" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-10 flex items-center gap-3">
            <Clock size={14} /> Deployment Lifecycle
        </h3>
        <div className="relative space-y-10 before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-white/5 before:my-4">
            {steps.map((step, i) => (
                <div key={i} className="relative pl-12 group">
                    <div className={`absolute left-0 top-1 w-8 h-8 rounded-2xl border-4 border-slate-900 flex items-center justify-center transition-all ${step.completed ? 'bg-green-500 scale-110 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : step.current ? 'bg-blue-500 animate-pulse' : 'bg-slate-800'}`}>
                        {step.completed ? <Check size={14} strokeWidth={4} /> : <div className="w-2 h-2 rounded-full bg-slate-600" />}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h4 className={`text-xs font-black uppercase tracking-wider ${step.completed ? 'text-white' : 'text-slate-400'}`}>{step.title}</h4>
                            {step.current && <span className="px-2 py-0.5 bg-blue-500 text-[8px] font-black uppercase rounded-md tracking-tighter">Live Status</span>}
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{step.desc}</p>
                        {step.date && <p className="text-[9px] font-black text-slate-600 mt-2 uppercase tracking-widest">{step.date}</p>}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ServiceRequestModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ type: 'General Maintenance', date: '', notes: '' });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1400] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <div className="bg-white w-full max-w-lg rounded-[50px] p-10 shadow-2xl animate-in fade-in zoom-in duration-500">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Request <span className="text-blue-500">Expert</span> Service</h2>
                    <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors"><X size={24} className="text-slate-400" /></button>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Service Category</label>
                        <select 
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option>General Maintenance</option>
                            <option>Filter Replacement</option>
                            <option>Repair / Leakage</option>
                            <option>Water Quality Test</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Preferred Date</label>
                        <input 
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Additional Observations</label>
                        <textarea 
                            placeholder="Describe any issues..."
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                    <button 
                        onClick={() => onSubmit(formData)}
                        className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95"
                    >
                        Dispatch Request
                    </button>
                </div>
            </div>
        </div>
    );
};

const ReceiptModal = ({ amc, isOpen, onClose }) => {
    const [show, setShow] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShow(true), 10);
            // Try to get user data from localStorage
            try {
                const storedUser = localStorage.getItem('userData');
                if (storedUser) setUserData(JSON.parse(storedUser));
            } catch (e) {
                console.error("Error parsing user data", e);
            }
        } else {
            setShow(false);
        }
    }, [isOpen]);

    if (!isOpen || !amc) return null;

    const handleDownloadPdf = async () => {
        const element = document.getElementById('printable-receipt');
        if (!element) {
            toast.error("Receipt element not found!");
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
                windowHeight: element.scrollHeight,
                onclone: (clonedDoc) => {
                    const el = clonedDoc.getElementById('printable-receipt');
                    if (el) el.style.fontFamily = "Arial, sans-serif";
                }
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Receipt_AMC_${amc._id.slice(-6).toUpperCase()}.pdf`);
            toast.success("Receipt downloaded successfully!");
        } catch (error) {
            console.error("PDF Generation Error:", error);
            toast.error("Failed to download PDF.");
        } finally {
            setIsGenerating(false);
        }
    };

    const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    const receiptDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

    return createPortal(
        <div 
            className={`fixed inset-0 z-[11000] flex items-center justify-center px-4 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
            onClick={onClose}
        >
            <div 
                className={`bg-[#ffffff] w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative border border-white/20 transition-all duration-500 ease-out ${show ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-12 scale-95 opacity-0'}`}
                onClick={e => e.stopPropagation()}
            >
                <div id="printable-receipt" className="flex flex-col flex-1 overflow-y-auto bg-white p-8 md:p-12" style={{ color: '#1e293b' }}>
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-10">
                        <div className="flex flex-col gap-1">
                            <div className="w-12 h-12 flex items-center justify-center rounded-2xl mb-2" style={{ backgroundColor: '#eff6ff' }}>
                                <img src="/sks-logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                            </div>
                            <h2 className="text-xl font-black tracking-tighter" style={{ color: '#0f172a' }}>UNIXA <span style={{ color: '#0ea5e9' }}>PURE</span></h2>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>AMC Receipt</p>
                            <p className="text-sm font-bold" style={{ color: '#0f172a' }}>#AMC-{amc._id.slice(-6).toUpperCase()}</p>
                            <p className="text-xs font-medium mt-1" style={{ color: '#64748b' }}>{receiptDate}</p>
                        </div>
                    </div>

                    {/* Parties */}
                    <div className="grid grid-cols-2 gap-8 mb-10">
                        <div>
                            <p className="text-[10px] uppercase font-black mb-2 tracking-widest" style={{ color: '#94a3b8' }}>From</p>
                            <p className="font-bold" style={{ color: '#0f172a' }}>UNIXA PURE WATER</p>
                            <p className="text-xs leading-relaxed mt-1" style={{ color: '#64748b' }}>Ahirawan, Sandila,<br />Hardoi, Uttar Pradesh</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase font-black mb-2 tracking-widest" style={{ color: '#94a3b8' }}>Bill To</p>
                            <p className="font-bold" style={{ color: '#0f172a' }}>{userData?.firstName || 'Valued'} {userData?.lastName || 'Customer'}</p>
                            <p className="text-xs leading-relaxed mt-1" style={{ color: '#64748b' }}>
                                {userData?.phone || ''}<br />
                                {userData?.email || ''}
                            </p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="mb-10">
                        <div className="grid grid-cols-12 border-b pb-3 mb-3 text-[10px] font-black uppercase tracking-widest" style={{ color: '#94a3b8', borderColor: '#f1f5f9' }}>
                            <div className="col-span-8">Description</div>
                            <div className="col-span-4 text-right">Amount</div>
                        </div>
                        
                        <div className="grid grid-cols-12 py-3 items-center border-b" style={{ borderColor: '#f8fafc' }}>
                            <div className="col-span-8">
                                <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{amc.planName} Plan</p>
                                <p className="text-[10px] mt-1 font-medium" style={{ color: '#64748b' }}>Product: {amc.productName}</p>
                                <p className="text-[10px] mt-0.5 font-medium" style={{ color: '#64748b' }}>
                                    Validity: {formatDate(amc.startDate)} - {formatDate(amc.expiryDate)}
                                </p>
                            </div>
                            <div className="col-span-4 text-right text-sm font-bold" style={{ color: '#0f172a' }}>₹{amc.price}</div>
                        </div>
                    </div>

                    {/* Footer Totals */}
                    <div className="mt-auto border-t pt-8" style={{ borderColor: '#f1f5f9' }}>
                        <div className="flex flex-col items-end gap-3 text-sm">
                            <div className="flex justify-between w-48 font-medium" style={{ color: '#64748b' }}>
                                <span>Subtotal</span>
                                <span className="font-bold" style={{ color: '#0f172a' }}>₹{amc.price}</span>
                            </div>
                            <div className="flex justify-between w-48 font-medium" style={{ color: '#64748b' }}>
                                <span>Tax (18% GST)</span>
                                <span className="font-bold text-[10px]" style={{ color: '#64748b' }}>Included</span>
                            </div>
                            <div className="flex justify-between w-48 items-center mt-2 pt-4 border-t" style={{ borderColor: '#f1f5f9' }}>
                                <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#0f172a' }}>Total Paid</span>
                                <span className="text-2xl font-black" style={{ color: '#0ea5e9' }}>₹{amc.price}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12 text-center border-2 border-dashed rounded-2xl p-4 bg-slate-50/50" style={{ borderColor: '#f1f5f9' }}>
                        <div className="flex justify-center mb-2">
                             <ShieldCheck size={20} className="text-blue-500" />
                        </div>
                        <p className="text-[9px] font-medium uppercase tracking-widest" style={{ color: '#94a3b8' }}>
                            Official AMC Document • {amc._id}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 bg-[#f8fafc] flex items-center justify-between border-t" style={{ borderColor: '#f1f5f9' }}>
                    <button onClick={onClose} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-[#94a3b8] hover:text-[#475569] transition-colors">
                        Close
                    </button>
                    <button 
                        onClick={handleDownloadPdf} 
                        disabled={isGenerating} 
                        className="bg-[#0f172a] hover:bg-[#0ea5e9] text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-500/10 disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <span className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </span>
                        ) : (
                            <><Download size={14} strokeWidth={3} /> Download PDF</>
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

// ... existing PlanSelectorModal, etc ...
const PlanSelectorModal = ({ isOpen, onClose, onSelect }) => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const { data } = await axios.get(`${url}/amc-plans?activeOnly=true`);
                if (data.success) {
                    setPlans(data.plans);
                }
            } catch (error) {
                console.error("Failed to fetch AMC plans", error);
                // Fallback or show error
            }
        };

        if (isOpen) fetchPlans();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Select <span className="text-blue-500">Protection</span> Plan</h2>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Global Standard Water Care</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                        <X size={24} className="text-slate-400" />
                    </button>
                </div>
                
                <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`relative flex flex-col p-8 rounded-[32px] border-2 transition-all cursor-pointer group ${plan.popular ? 'border-blue-500 bg-blue-50/20 shadow-xl shadow-blue-500/5' : 'border-slate-50 hover:border-blue-100 hover:bg-slate-50/50'}`}>
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/20">
                                    Best Value
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2 uppercase">{plan.name}</h3>
                                <div className="flex items-end gap-1">
                                    <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{plan.price}</span>
                                    <span className="text-slate-400 text-[9px] font-black uppercase pb-1.5 tracking-widest">/ Year</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-10 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                            <Check size={10} className="text-blue-600" strokeWidth={5} />
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-600 leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button 
                                onClick={() => onSelect(plan)}
                                className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${plan.popular ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 text-white'}`}
                            >
                                Secure Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SuccessModal = ({ isOpen, onClose, plan, transactionId }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <div className="bg-white w-full max-w-md rounded-[50px] p-12 text-center shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-10 duration-700">
                <div className="w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-10 relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-10" />
                    <div className="absolute inset-2 border-4 border-dashed border-blue-200 rounded-full animate-spin-slow" />
                    <ShieldCheck size={56} className="text-blue-500" strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter uppercase">Contract Active</h2>
                <p className="text-slate-500 font-medium text-xs leading-relaxed mb-10 tracking-wide uppercase opacity-80">
                    Your {plan?.name} premium protection is now live. Complete digital agreement sent to your dashboard.
                </p>
                <div className="bg-slate-50 rounded-3xl p-6 mb-10 border border-slate-100">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest mb-2">
                        <span className="text-slate-400">Transaction ID</span>
                        <span className="text-slate-900">#{transactionId || 'UX_PENDING'}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">Total Paid</span>
                        <span className="text-blue-500">₹{plan?.price}</span>
                    </div>
                </div>
                <button onClick={onClose} className="w-full py-5 bg-blue-500 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-blue-500/30 hover:scale-[1.02] transition-all active:scale-95">
                    View My Dashboard
                </button>
            </div>
        </div>
    );
};

const AmcRenewals = () => {
    const navigate = useNavigate();
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [purifierHealth, setPurifierHealth] = useState(88);
    const [isScanning, setIsScanning] = useState(false);

    const [amcData, setAmcData] = useState([]);
    const [serviceLogs, setServiceLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Receipt Modal State
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [selectedReceiptAmc, setSelectedReceiptAmc] = useState(null);

    const [serviceSteps, setServiceSteps] = useState([
        { title: 'Activation Check', desc: 'Device audit pending', completed: false },
        { title: 'Bi-Annual Service', desc: 'Scheduled maintenance', completed: false },
        { title: 'Deep Cleaning', desc: 'Performance optimization', completed: false },
        { title: 'Renewal Audit', desc: 'Pre-renewal checkup', completed: false }
    ]);

    const fetchAmcData = async () => {
        try {
            setLoading(true);
            const token = getToken(); 
            
            if (!token) {
                 setLoading(false);
                 return; // Or show empty state
            }

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const { data } = await axios.get(`${apiUrl}/amc-user/my-subscriptions`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setAmcData(data.amc);
                // Transform service history if available
                if (data.serviceHistory) {
                    const logs = data.serviceHistory.map((log, i) => ({
                        id: i,
                        type: log.type,
                        date: new Date(log.date).toLocaleDateString(),
                        engineer: log.technicianName || 'Pending',
                        note: log.notes || log.description || 'Service record',
                        icon: log.type === 'Installation' ? <Check size={14} /> : <RefreshCw size={14} />
                    }));
                    setServiceLogs(logs);
                }

                // Update Timeline based on first active AMC
                if (data.amc && data.amc.length > 0) {
                    const latest = data.amc[0];
                    const start = new Date(latest.startDate);
                    const end = new Date(latest.expiryDate);
                    const now = new Date();
                    const midYear = new Date(start);
                    midYear.setMonth(midYear.getMonth() + 6);

                    setServiceSteps([
                        { 
                            title: 'Activation Check', 
                            desc: 'Initial device audit and registration', 
                            completed: true, 
                            date: new Date(latest.startDate).toLocaleDateString('en-IN', {day: 'numeric', month: 'short'})
                        },
                        { 
                            title: 'Bi-Annual Service', 
                            desc: 'Primary filter replacement', 
                            completed: now > midYear, 
                            current: now <= midYear && now > start,
                            date: midYear.toLocaleDateString('en-IN', {day: 'numeric', month: 'short'}) 
                        },
                        { 
                            title: 'Deep Cleaning', 
                            desc: 'Internal tank and membrane flushing', 
                            current: now > midYear && now < end 
                        },
                        { 
                            title: 'Renewal Audit', 
                            desc: 'Pre-renewal performance checkup', 
                            completed: false,
                            date: new Date(latest.expiryDate).toLocaleDateString('en-IN', {day: 'numeric', month: 'short'})
                        }
                    ]);
                    
                    // Update validity days in UI (Widget)
                    // Note: Health widget is simulated, but we could update "Days Left" text if it was state.
                    // The days widget is hardcoded in JSX "342 Days Left". 
                    // I should check if I can make that dynamic too. 
                }
            }
        } catch (error) {
            console.error("Failed to fetch AMC data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAmcData();
    }, []);

    const particles = useMemo(() => [...Array(20)].map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 300 + 100,
        opacity: Math.random() * 0.1,
        duration: Math.random() * 20 + 20
    })), []);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const handleBuyNewPlan = () => setIsPlanModalOpen(true);

    const handleSelectPlan = async (plan) => {
        setIsPlanModalOpen(false);
        setSelectedPlan(plan);
        
        // Authenticating simulation
        Swal.fire({
            title: 'Verifying Coverage...',
            html: '<div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Authenticating Device Signature</div>',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
            timer: 2000,
            background: '#ffffff',
            customClass: { popup: 'rounded-[32px]' }
        }).then(async () => {
             try {
                const token = getToken();
                if (!token) {
                    toast.error("Please login to purchase a plan");
                    navigate('/login');
                    return;
                }

                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                await axios.post(`${apiUrl}/amc-user/subscribe`, {
                    planName: plan.name,
                    price: plan.price
                }, {
                     headers: { Authorization: `Bearer ${token}` }
                });

                const tid = `UX_${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
                setTransactionId(tid);
                setIsSuccessModalOpen(true);
                toast.success("Security contract established!");
                fetchAmcData(); // Refresh list
             } catch (error) {
                console.error("Purchase failed", error);
                toast.error("Failed to purchase plan. Please try again.");
             }
        });
    };

    const handleRenewAmc = async (amc) => {
        const result = await Swal.fire({
            title: 'Secure Extension?',
            text: `Renew ${amc.planName} for ₹${amc.price} and extend pure water guarantee by 365 days.`,
            icon: 'shield',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            confirmButtonText: 'PROCEED TO RENEW',
            cancelButtonText: 'DEFER RENEWAL',
            background: '#ffffff',
            customClass: {
                popup: 'rounded-[40px] p-8',
                confirmButton: 'rounded-2xl px-10 py-4 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-500/20',
                cancelButton: 'rounded-2xl px-10 py-4 font-black uppercase text-[10px] tracking-widest'
            }
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Updating Protection...',
                timer: 1500,
                didOpen: () => Swal.showLoading()
            }).then(async () => {
                try {
                    const token = getToken();
                    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                    await axios.post(`${apiUrl}/amc-user/renew`, {
                        amcId: amc._id
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    setSelectedPlan({ name: amc.planName, price: amc.price });
                    setIsSuccessModalOpen(true);
                    fetchAmcData(); // Refresh
                } catch (error) {
                    console.error("Renewal failed", error);
                    toast.error("Failed to renew plan");
                }
            });
        }
    };

    const handleDeepScan = () => {
        setIsScanning(true);
        setPurifierHealth(prev => Math.min(100, prev + 2));
        setTimeout(() => {
            setIsScanning(false);
            toast.info("System integrity verified. Filter performance optimal.");
        }, 3000);
    };

    const handleServiceSubmit = async (data) => {
        setIsServiceModalOpen(false);
        
        try {
            const token = getToken();
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            
            if (!token) {
                toast.error("Authentication failed. Please login again.");
                navigate('/login');
                return;
            }

            await axios.post(`${apiUrl}/amc-user/request-service`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });

            Swal.fire({
                icon: 'success',
                title: 'Request Dispatched',
                text: `We've scheduled a ${data.type} request. Our engineer will contact you soon.`,
                confirmButtonColor: '#1e293b',
                customClass: { popup: 'rounded-[32px]' }
            });
        } catch (error) {
            console.error("Service Request failed", error);
            toast.error("Failed to submit service request");
        }
    };

    const handleSupportChat = () => {
        window.open(`https://wa.me/919455325606?text=${encodeURIComponent("Priority AMC Support Request: ")}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-['Outfit',sans-serif] overflow-x-hidden pt-24 relative">
            <div className="fixed inset-0 pointer-events-none z-0">
                {particles.map(p => (
                    <div 
                        key={p.id}
                        className="absolute bg-blue-500/5 rounded-full blur-[100px] animate-pulse"
                        style={{ 
                            top: p.top, 
                            left: p.left, 
                            width: p.size, 
                            height: p.size, 
                            animationDuration: `${p.duration}s` 
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 mt-10 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 animate-in fade-in slide-in-from-top-10 duration-700">
                    <div className="space-y-6 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/20">
                                <ShieldCheck size={18} strokeWidth={3} />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-500">Enterprise Security</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                            Pure <span className="text-blue-500">Water</span><br/>Guaranteed.
                        </h1>
                        <p className="text-slate-500 font-bold max-w-lg text-sm md:text-lg leading-relaxed opacity-80 uppercase tracking-tighter">
                            Advanced maintenance tracking for your home health infrastructure.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Current Protocol</p>
                            <p className="text-3xl font-black text-green-500">ACTIVE</p>
                        </div>
                        <button 
                            onClick={handleBuyNewPlan}
                            className="group w-full sm:w-auto px-10 py-6 bg-slate-900 text-white rounded-[32px] text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95"
                        >
                            <Droplets size={20} /> Secure New Device
                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 overflow-hidden">
                    <div className="animate-in fade-in slide-in-from-left-10 duration-700 delay-200">
                        <DeviceHealthWidget health={purifierHealth} onScan={handleDeepScan} isScanning={isScanning} />
                    </div>
                    <div className="grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-10 duration-700 delay-300">
                        <div className="bg-white/60 backdrop-blur-md border border-white p-8 rounded-[40px] shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-all hover:shadow-xl">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                <Calendar size={20} strokeWidth={3} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Contract Validity</p>
                                <h4 className="text-2xl font-black text-slate-900 leading-none">342<span className="text-xs ml-1">Days Left</span></h4>
                            </div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-md border border-white p-8 rounded-[40px] shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-all hover:shadow-xl">
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                                <Star size={20} strokeWidth={3} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Membership</p>
                                <h4 className="text-2xl font-black text-slate-900 leading-none">ELITE GUARD</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                                <Shield size={24} className="text-blue-500" strokeWidth={3} /> Active Subscriptions
                            </h2>
                            <div className="space-y-8">
                                {amcData.map((amc) => (
                                    <div key={amc._id} className="relative group overflow-hidden rounded-[50px] bg-white border border-slate-100 shadow-xl p-1 md:p-2 transition-all hover:shadow-2xl hover:-translate-y-1">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 opacity-0 group-hover:opacity-40 rounded-full -mr-32 -mt-32 transition-opacity duration-700" />
                                        <div className="relative p-10 flex flex-col md:flex-row gap-10 items-center">
                                            <div className="w-40 h-40 bg-slate-900 rounded-[40px] flex flex-col items-center justify-center text-white shrink-0 shadow-2xl relative overflow-hidden group-hover:rotate-3 transition-transform">
                                                <Droplets className="absolute top-0 left-0 text-white/5" size={120} />
                                                <h4 className="text-5xl font-black tracking-tighter">UX</h4>
                                                <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-50 mt-2">Certified</p>
                                            </div>
                                            <div className="flex-1 space-y-6 text-center md:text-left">
                                                <div>
                                                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-3">
                                                        <span className="px-5 py-1.5 bg-green-500/10 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Active Protection
                                                        </span>
                                                        <span className="px-5 py-1.5 bg-blue-500/10 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">ID: UX_{amc._id.slice(-6).toUpperCase()}</span>
                                                    </div>
                                                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">{amc.planName}</h3>
                                                    <p className="text-sm font-bold text-slate-400 mt-2">{amc.productName} Standard Edition</p>
                                                </div>
                                                <div className="flex flex-wrap justify-center md:justify-start gap-8 border-t border-slate-50 pt-6">
                                                    <div>
                                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Renewal Due</p>
                                                        <p className="text-sm font-black text-slate-900">{formatDate(amc.expiryDate)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Annual Value</p>
                                                        <p className="text-sm font-black text-blue-500">₹{amc.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3 w-full md:w-auto">
                                                <button 
                                                    onClick={() => handleRenewAmc(amc)}
                                                    className="px-10 py-5 bg-blue-500 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all text-center"
                                                >
                                                    Renew Plan
                                                </button>
                                                <button 
                                                    onClick={() => { setSelectedReceiptAmc(amc); setIsReceiptModalOpen(true); }}
                                                    className="px-10 py-5 bg-slate-50 text-slate-600 border border-slate-100 rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all text-center flex items-center justify-center gap-2"
                                                >
                                                    <Download size={14} /> Download Receipt
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/60 backdrop-blur-md rounded-[50px] border border-white p-10 shadow-sm overflow-hidden relative group animate-in fade-in slide-in-from-bottom-10 duration-700 delay-700">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20" />
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-3">
                                <History size={24} className="text-slate-400" /> Interaction Vault
                            </h2>
                            <div className="space-y-6">
                                {serviceLogs.map(log => (
                                    <div key={log.id} className="flex gap-6 group/log">
                                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-blue-500 shadow-sm shrink-0 group-hover/log:bg-blue-500 group-hover/log:text-white transition-all duration-300">
                                            {log.icon}
                                        </div>
                                        <div className="flex-1 border-b border-slate-100 pb-6 group-last/log:border-none">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">{log.type}</h4>
                                                <span className="text-[10px] font-bold text-slate-400">{log.date}</span>
                                            </div>
                                            <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-3">{log.note}</p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-slate-100" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Engaged: <span className="text-slate-900">{log.engineer}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-10 py-5 bg-white border border-slate-100 rounded-3xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center gap-3 group">
                                <FileText size={16} className="text-slate-300 group-hover:text-blue-500" /> Access Full Archives
                            </button>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="animate-in fade-in slide-in-from-right-10 duration-700 delay-800">
                            <ServiceTimeline steps={serviceSteps} />
                        </div>

                        <div className="bg-white border border-slate-100 rounded-[50px] p-10 text-center relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-right-10 duration-700 delay-900">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform">
                                <Wrench size={100} />
                            </div>
                            <div className="w-20 h-20 bg-blue-50 rounded-[30px] flex items-center justify-center mb-8 mx-auto relative z-10 group-hover:scale-110 transition-transform">
                                <Smartphone size={32} className="text-blue-500" strokeWidth={2.5} />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full animate-ping" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 relative z-10">Instant Support</h3>
                            <div className="flex flex-col gap-3 relative z-10">
                                <button 
                                    onClick={() => setIsServiceModalOpen(true)}
                                    className="w-full py-5 bg-slate-900 text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-100"
                                >
                                    Book Service
                                </button>
                                <button 
                                    onClick={handleSupportChat}
                                    className="w-full py-5 border-2 border-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-50 transition-all active:scale-95"
                                >
                                    WhatsApp Chat
                                </button>
                            </div>
                        </div>

                        <div className="p-10 bg-blue-50/50 rounded-[50px] border border-blue-100/50 animate-in fade-in slide-in-from-right-10 duration-700 delay-1000">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-6 flex items-center gap-2">
                                <Info size={14} /> Security Disclosure
                            </h4>
                            <p className="text-[10px] font-semibold text-slate-500 leading-loose uppercase tracking-[0.05em]">
                                All plans include full coverage for electrical components, filters, and membranes. Periodic audits are mandatory for warranty persistence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <PlanSelectorModal 
                isOpen={isPlanModalOpen} 
                onClose={() => setIsPlanModalOpen(false)} 
                onSelect={handleSelectPlan}
            />
            <SuccessModal 
                isOpen={isSuccessModalOpen} 
                onClose={() => setIsSuccessModalOpen(false)} 
                plan={selectedPlan}
                transactionId={transactionId}
            />
            <ServiceRequestModal 
                isOpen={isServiceModalOpen} 
                onClose={() => setIsServiceModalOpen(false)} 
                onSubmit={handleServiceSubmit}
            />
            <ReceiptModal 
                isOpen={isReceiptModalOpen}
                onClose={() => setIsReceiptModalOpen(false)}
                amc={selectedReceiptAmc}
            />

            <style>{`
                .animate-spin-slow {
                    animation: spin 15s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            
            <Footer />
        </div>
    );
};

export default AmcRenewals;
