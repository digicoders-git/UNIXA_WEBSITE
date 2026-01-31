import React, { useState, useMemo } from 'react';
import { 
    CreditCard, 
    ArrowUpRight, 
    ArrowDownLeft, 
    Filter, 
    Search, 
    Download, 
    Calendar, 
    ShieldCheck, 
    Zap, 
    Clock, 
    ChevronRight,
    ExternalLink,
    FileText,
    TrendingUp,
    Wallet,
    Info,
    CheckCircle2,
    RefreshCw
} from 'lucide-react';
import { toast } from 'react-toastify';

const INITIAL_TRANSACTIONS = [
    {
        id: 'TXN-98234-UX',
        date: new Date().toISOString(),
        amount: 39999,
        type: 'Debit',
        category: 'Purchase',
        status: 'Success',
        method: 'Visa •••• 4242',
        description: 'HydroLife Alkaline Pro - Unit Alpha'
    },
    {
        id: 'TXN-98122-UX',
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        amount: 12499,
        type: 'Debit',
        category: 'AMC Renewal',
        status: 'Success',
        method: 'UPI Security Pay',
        description: 'Annual Maintenance Service - Year 1'
    },
    {
        id: 'TXN-97998-UX',
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
        amount: 5000,
        type: 'Credit',
        category: 'Loyalty Reward',
        status: 'Success',
        method: 'Wallet Credits',
        description: 'Referral Bonus Program'
    },
    {
        id: 'TXN-97855-UX',
        date: new Date(Date.now() - 86400000 * 10).toISOString(),
        amount: 2499,
        type: 'Debit',
        category: 'Filter Upgrade',
        status: 'Failed',
        method: 'MasterCard •••• 5555',
        description: 'NexGen Carbon Block - Enhanced Edition'
    }
];

const TransactionModal = ({ txn, onClose }) => {
    if (!txn) return null;

    return (
        <div className="fixed inset-0 z-[11000] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose}>
            <div className="bg-white w-full max-w-lg rounded-[42px] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${txn.type === 'Debit' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                            {txn.type === 'Debit' ? <ArrowUpRight size={22} /> : <ArrowDownLeft size={22} />}
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Receipt</h3>
                            <p className="text-xl font-black text-slate-900 leading-none">{txn.id}</p>
                        </div>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-10 space-y-8">
                    <div className="text-center py-6 bg-slate-50 rounded-[32px] border border-slate-100">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 block mb-2">Total Amount</span>
                        <h2 className={`text-5xl font-black tracking-tight ${txn.type === 'Debit' ? 'text-slate-900' : 'text-emerald-500'}`}>
                            ₹{txn.amount.toLocaleString()}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</span>
                            <p className="text-xs font-bold text-slate-900">{new Date(txn.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</span>
                            <div className="flex justify-end">
                                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    txn.status === 'Success' ? 'bg-emerald-100 text-emerald-600' : 
                                    txn.status === 'Failed' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {txn.status === 'Success' ? <CheckCircle2 size={10} /> : <Info size={10} />}
                                    {txn.status}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <p className="text-xs font-bold text-slate-900">{txn.category}</p>
                            </div>
                        </div>
                        <div className="space-y-1 text-right">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Method</span>
                            <p className="text-xs font-bold text-slate-900">{txn.method}</p>
                        </div>
                    </div>

                    <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="text-blue-500 mt-1" size={16} />
                            <div>
                                <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">Secure Transaction</p>
                                <p className="text-[11px] font-bold text-blue-700/70 leading-relaxed">
                                    Encrypted by Unixa Security Protocol. Verified by distributed ledger system.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                    <button onClick={onClose} className="flex-1 py-5 bg-white border border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-[24px] hover:text-slate-900 hover:border-slate-300 transition-all">Close</button>
                    <button className="flex-2 px-10 py-5 bg-slate-900 text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                        <Download size={14} /> Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

const TransactionHistory = () => {
    const [transactions] = useState(INITIAL_TRANSACTIONS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTxn, setSelectedTxn] = useState(null);
    const [activeTab, setActiveTab] = useState('All');

    const stats = useMemo(() => {
        return {
            totalSpent: transactions.filter(t => t.type === 'Debit' && t.status === 'Success').reduce((sum, t) => sum + t.amount, 0),
            walletBalance: 8500,
            activeSubs: 2,
            loyaltyPoints: 1250
        };
    }, [transactions]);

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'All' || t.category === activeTab || (activeTab === 'Purchases' && t.category === 'Purchase');
        return matchesSearch && matchesTab;
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
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 animate-in fade-in slide-in-from-top-10 duration-700">
                    <div className="space-y-6 max-w-3xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-[20px] flex items-center justify-center shadow-2xl shadow-slate-200">
                                <Wallet size={22} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 leading-none">Financial Ledger</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mt-1 leading-none">Transaction Center</span>
                            </div>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] py-2">
                            <span className="text-slate-900 block">Digital</span>
                            <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:200%_auto] animate-gradient-text bg-clip-text text-transparent">Receipts.</span>
                        </h1>
                        <p className="text-slate-400 font-bold max-w-xl text-[10px] md:text-xs uppercase tracking-[0.3em] leading-relaxed opacity-60">
                            View and manage your secure payment logs, billing cycles, and asset investment history.
                        </p>
                    </div>

                    <div className="flex items-center bg-white border border-slate-100 p-2 rounded-[32px] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 w-full lg:w-auto self-start lg:self-end">
                        <div className="relative flex-1 lg:w-[300px]">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                            <input 
                                type="text"
                                placeholder="Search ledger..."
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

                {/* Performance Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                    {[
                        { label: 'Asset Inflow', value: `₹${stats.totalSpent.toLocaleString()}`, icon: TrendingUp, color: 'text-blue-500', trend: '+12.5%' },
                        { label: 'Security Balance', value: `₹${stats.walletBalance.toLocaleString()}`, icon: ShieldCheck, color: 'text-emerald-500', trend: 'Fixed' },
                        { label: 'Active Protocols', value: stats.activeSubs, icon: Zap, color: 'text-blue-500', trend: 'Stable' },
                        { label: 'Trust Score', value: stats.loyaltyPoints, icon: RefreshCw, color: 'text-blue-500', trend: '+50 pts' }
                    ].map((s, idx) => (
                        <div key={idx} className="bg-white/70 backdrop-blur-md p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 group-hover:scale-110 transition-transform duration-500 ${s.color}`}>
                                    <s.icon size={20} />
                                </div>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{s.trend}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{s.label}</span>
                                <h3 className="text-3xl font-black text-slate-900">{s.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                    <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-full">
                        {['All', 'Purchase', 'AMC Renewal', 'Loyalty Reward'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeTab === tab ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ledger Table */}
                <div className="bg-white/50 backdrop-blur-md rounded-[48px] border border-slate-100 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Transaction ID</th>
                                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Entity / Description</th>
                                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 text-center">Protocol</th>
                                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 text-right">Credit / Debit</th>
                                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 text-center">Security</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((t, idx) => (
                                    <tr 
                                        key={t.id} 
                                        onClick={() => setSelectedTxn(t)}
                                        className="hover:bg-slate-50/80 transition-all cursor-pointer group border-b border-slate-50 last:border-0"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 group-hover:bg-white border border-slate-100/50 group-hover:shadow-lg transition-all ${t.type === 'Debit' ? 'text-red-500' : 'text-emerald-500'}`}>
                                                    {t.type === 'Debit' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900">{t.id}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{new Date(t.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="max-w-xs">
                                                <p className="text-xs font-black text-slate-900 truncate">{t.description}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            <span className="text-[10px] font-black text-slate-400">{t.method}</span>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <p className={`text-base font-black ${t.type === 'Debit' ? 'text-slate-900' : 'text-emerald-500'}`}>
                                                {t.type === 'Debit' ? '-' : '+'} ₹{t.amount.toLocaleString()}
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">INR Currency</p>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex justify-center">
                                                <span className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                                    t.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 
                                                    t.status === 'Failed' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'
                                                }`}>
                                                    {t.status === 'Success' ? <CheckCircle2 size={10} /> : <Info size={10} />}
                                                    {t.status}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredTransactions.length === 0 && (
                        <div className="p-32 text-center bg-slate-50/30">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border border-slate-100">
                                <FileText className="text-slate-200" size={40} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">Null Sector</h3>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">No transaction logs found in this sector.</p>
                        </div>
                    )}

                    {/* Pagination Placeholder */}
                    <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sector 1 of 1</span>
                        <div className="flex gap-2">
                            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-300 cursor-not-allowed">
                                <ChevronRight className="rotate-180" size={16} />
                            </button>
                            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-300 cursor-not-allowed">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt Modal */}
            {selectedTxn && (
                <TransactionModal 
                    txn={selectedTxn} 
                    onClose={() => setSelectedTxn(null)} 
                />
            )}

            <style>{`
                @keyframes gradient-text {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-text {
                    animation: gradient-text 3s ease infinite;
                }
                .flex-2 { flex: 2; }
            `}</style>
        </div>
    );
};

export default TransactionHistory;
