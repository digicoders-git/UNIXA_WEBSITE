import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, PhoneCall } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsMenuOpen(false);
        setCartCount(0); // Static version
    }, [location.pathname]);

    const activeLink = `text-[var(--color-primary)] font-bold text-sm uppercase tracking-wider transition-all border-b-2 border-[var(--color-primary)] pb-1`;
    const normalLink = `text-[var(--color-secondary)] font-semibold text-sm uppercase tracking-wider transition-all hover:text-[var(--color-primary)] pb-1 border-b-2 border-transparent`;

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/purifiers", label: "Purifiers" },
        { to: "/about", label: "Technology" },
        { to: "/testimonials", label: "Reviews" },
        { to: "/contact", label: "Support" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 w-full z-[1000] bg-white border-b border-slate-100 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

                {/* Logo */}
                <div
                    className="flex items-center gap-4 cursor-pointer group"
                    onClick={() => navigate('/')}
                >
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-transform hover:scale-105">
                        <img src="/sks-logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl md:text-2xl font-black tracking-tight leading-none text-[var(--color-secondary)]">UNIXA</span>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase mt-1 text-[var(--color-primary)]">Pure Water</span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <ul className="hidden lg:flex items-center gap-8 m-0 p-0 list-none">
                    {navLinks.map(link => (
                        <li key={link.to}>
                            <NavLink to={link.to} className={({ isActive }) => isActive ? activeLink : normalLink}>
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-4 md:gap-6">
                    <div
                        onClick={() => navigate('/shop')}
                        className="relative cursor-pointer p-2 rounded-full hover:bg-slate-50 text-[var(--color-secondary)] transition-all group"
                    >
                        <ShoppingCart size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-[var(--color-primary)] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md">
                                {cartCount}
                            </span>
                        )}
                    </div>

                    <div
                        onClick={() => navigate('/profile')}
                        className="hidden sm:block cursor-pointer p-2 rounded-full hover:bg-slate-50 text-[var(--color-secondary)] transition-all group"
                    >
                        <User size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                    </div>

                    <button
                        onClick={() => navigate('/contact')}
                        className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[var(--color-secondary)] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--color-primary)] transition-all active:scale-95 shadow-lg shadow-blue-500/10"
                    >
                        <PhoneCall size={14} />
                        Free Demo
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden focus:outline-none p-2 rounded-xl text-[var(--color-secondary)] bg-slate-50 border border-slate-100"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`lg:hidden fixed inset-0 top-[70px] bg-white z-[999] transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'}`}>
                <div className="p-8 flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) => `text-2xl font-black tracking-tight transition-all ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)]'}`}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <div className="h-px bg-slate-100 my-2" />
                    <button
                        onClick={() => { navigate('/profile'); setIsMenuOpen(false); }}
                        className="flex items-center gap-3 text-lg font-bold text-[var(--color-secondary)]"
                    >
                        <User size={20} /> My Profile
                    </button>
                    <button
                        onClick={() => { navigate('/shop'); setIsMenuOpen(false); }}
                        className="w-full py-4 bg-[var(--color-primary)] text-white rounded-2xl font-black text-center shadow-lg shadow-blue-500/10"
                    >
                        View Tray
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
