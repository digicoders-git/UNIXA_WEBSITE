import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, PhoneCall, ShieldCheck, LogOut } from 'lucide-react';
import UnixaBrand from '../common/UnixaBrand';
import { useCart } from '../../context/CartContext';
import { isTokenValid } from '../../utils/auth';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cart } = useCart();
    const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid());
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsMenuOpen(false);
        const tokenValid = isTokenValid();
        setIsLoggedIn(tokenValid);
    }, [location.pathname]);

    const activeLink = `text-[var(--color-primary)] font-bold text-[13px] uppercase tracking-[0.1em] transition-all relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[var(--color-primary)]`;
    const normalLink = `text-[var(--color-secondary)]/80 font-bold text-[13px] uppercase tracking-[0.1em] transition-all hover:text-[var(--color-primary)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-primary)] hover:after:w-full after:transition-all`;

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/purifiers", label: "Purifiers" },
        { to: "/rent-on-ro", label: "Rent on RO" },
        { to: "/ro-parts", label: "RO Parts" },
        { to: "/about", label: "About Us" },
        { to: "/testimonials", label: "Compare" },
        { to: "/contact", label: "Support" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 w-full z-[1000] bg-white/90 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm transition-all duration-300">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-between items-center">

                {/* Logo */}
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => navigate('/')}
                >
                    <div className="h-30 w-40 md:h-15 md:w-34 flex items-center justify-start transition-transform hover:scale-105">
                        <img src="/logo1.png" alt="UNIXA" className="w-30 h-50 object-contain object-left" />
                    </div>
                </div>

                {/* Desktop Nav */}
                <ul className="hidden xl:flex items-center gap-6 xl:gap-6 m-0 p-0 list-none">
                    {navLinks.map(link => (
                        <li key={link.to}>
                            <NavLink to={link.to} className={({ isActive }) => isActive ? activeLink : normalLink}>
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-3 md:gap-5">
                    <div
                        onClick={() => navigate('/shop')}
                        className="relative cursor-pointer p-2 rounded-xl hover:bg-slate-100 text-[var(--color-secondary)] transition-all group"
                        title="Shopping Cart"
                    >
                        <ShoppingCart size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-lg border-2 border-white">
                                {cart.length}
                            </span>
                        )}
                    </div>

                    <div
                        onClick={() => navigate('/amc-renewals')}
                        className="hidden sm:flex cursor-pointer p-2 rounded-xl hover:bg-blue-50 text-[var(--color-primary)] transition-all group items-center"
                        title="AMC Protection"
                    >
                        <ShieldCheck size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                    </div>

                    <div
                        onClick={() => navigate(isLoggedIn ? '/profile' : '/login')}
                        className="hidden sm:flex cursor-pointer p-2 rounded-xl hover:bg-slate-100 text-[var(--color-secondary)] transition-all group"
                        title={isLoggedIn ? "My Profile" : "Sign In"}
                    >
                        <User size={18} strokeWidth={2.5} className={isLoggedIn ? "text-[var(--color-primary)]" : ""} />
                    </div>

                    <button
                        onClick={() => navigate('/contact')}
                        className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[var(--color-secondary)] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--color-primary)] transition-all active:scale-95 shadow-md hover:shadow-lg shadow-blue-500/10"
                    >
                        <PhoneCall size={14} />
                        Free Demo
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="xl:hidden focus:outline-none p-2 rounded-xl text-[var(--color-secondary)] bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div 
                className={`xl:hidden fixed left-0 right-0 bottom-0 bg-white z-[999] transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ top: '64px', height: 'calc(100vh - 64px)' }}
            >
                <div className="flex flex-col h-full overflow-y-auto bg-white">
                    <div className="p-4 space-y-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => 
                                    `flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-bold transition-all ${
                                        isActive 
                                        ? 'bg-blue-50 text-[var(--color-primary)]' 
                                        : 'text-[var(--color-secondary)] active:bg-slate-50'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>{link.label}</span>
                                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[var(--color-primary)]' : 'bg-transparent'}`} />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                    
                    <div className="mt-auto p-6 space-y-4 bg-slate-50/50 border-t border-slate-100">
                        <button
                            onClick={() => { navigate(isLoggedIn ? '/profile' : '/login'); setIsMenuOpen(false); }}
                            className="w-full flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl text-[var(--color-secondary)] font-bold shadow-sm"
                        >
                            <User size={20} className="text-[var(--color-primary)]" />
                            {isLoggedIn ? 'My Account' : 'Sign In / Register'}
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => { navigate('/shop'); setIsMenuOpen(false); }}
                                className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-2xl gap-2 active:scale-95 transition-all"
                            >
                                <div className="relative">
                                    <ShoppingCart size={22} className="text-slate-600" />
                                    {cart.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black">
                                            {cart.length}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cart</span>
                            </button>
                            
                            <button
                                onClick={() => { navigate('/amc-renewals'); setIsMenuOpen(false); }}
                                className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-2xl gap-2 active:scale-95 transition-all"
                            >
                                <ShieldCheck size={22} className="text-[var(--color-primary)]" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">AMC</span>
                            </button>
                        </div>

                        <button
                            onClick={() => { navigate('/contact'); setIsMenuOpen(false); }}
                            className="w-full py-4 bg-[var(--color-secondary)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <PhoneCall size={16} />
                            Request Free Demo
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
