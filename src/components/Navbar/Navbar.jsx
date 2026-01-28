import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getCartApi } from '../../api/cart';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch cart count
    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const data = await getCartApi();
                if (data && data.items) {
                    setCartCount(data.items.length);
                } else {
                    setCartCount(0);
                }
            } catch (error) {
                console.error("Failed to fetch cart count", error);
                setCartCount(0);
            }
        };

        fetchCartCount();

        // Listen for global cart update events
        window.addEventListener('cart-updated', fetchCartCount);

        return () => {
            window.removeEventListener('cart-updated', fetchCartCount);
        };
    }, [location.pathname]);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const activeLink = "no-underline text-[var(--color-secondary)] font-semibold text-base transition-all duration-300 border-b-2 border-[var(--color-secondary)] pb-1";
    const normalLink = "no-underline text-[var(--color-surface)] font-semibold text-base transition-all duration-300 hover:text-[var(--color-secondary)] border-b-2 border-transparent hover:border-[var(--color-secondary)] pb-1";

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/laddus", label: "Our Products" },
        { to: "/orders", label: "My Orders" },
        { to: "/about", label: "About Us" },
        { to: "/testimonials", label: "Compare" },
        { to: "/contact", label: "Contact" },
    ];

    return (
        <nav className="flex justify-between items-center px-4 md:px-16 bg-[var(--color-primary)] font-[var(--font-body)] fixed top-0 left-0 right-0 w-full z-[1000] shadow-sm transition-all duration-300 border-b border-[var(--color-secondary)]/10 backdrop-blur-md">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <img src="/sks-logo.png" alt="SKS Logo" className="w-12 h-12 md:w-16 md:h-16 object-cover hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate('/')} />
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex list-none gap-8 m-0 p-0">
                {navLinks.map(link => (
                    <li key={link.to}>
                        <NavLink to={link.to} className={({ isActive }) => isActive ? activeLink : normalLink}>
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {/* Actions & Mobile Toggle */}
            <div className="flex items-center gap-4 md:gap-6">
                {/* Cart Icon */}
                <div
                    onClick={() => navigate('/shop')}
                    className="flex items-center text-[var(--color-surface)] cursor-pointer transition-transform duration-200 hover:scale-110 relative"
                    title="View Order"
                >
                    <ShoppingCart size={24} className="md:w-7 md:h-7" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[var(--color-secondary)] text-[var(--color-primary)] text-[10px] font-extrabold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                            {cartCount}
                        </span>
                    )}
                </div>

                <div
                    onClick={() => navigate('/profile')}
                    className="hidden sm:flex items-center text-[var(--color-surface)] cursor-pointer transition-transform duration-200 hover:scale-110"
                    title="Customer Profile"
                >
                    <User size={24} className="md:w-7 md:h-7" />
                </div>

                {/* Hamburger Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden flex flex-col justify-center focus:outline-none z-[1001] p-1 rounded-md transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-primary)`, border: `1px solid var(--color-border)` }}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X size={14} /> : <Menu size={12} />}
                </button>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            <div className={`lg:hidden fixed top-16 right-4 h-[80vh] w-[80%] max-w-[300px] z-[1000] shadow-2xl transition-all duration-500 ease-in-out rounded-2xl overflow-hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`} style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                <div className="flex flex-col h-full p-6 py-8 gap-2">
                    <p className="text-xs uppercase tracking-wider font-semibold mb-4 px-2" style={{ color: `var(--color-text-muted)` }}>Navigation Menu</p>
                    {navLinks.map((link, idx) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) => `text-sm font-semibold no-underline py-3 px-4 rounded-lg transition-all duration-300 ${isActive ? 'shadow-sm' : 'hover:opacity-80'}`}
                            style={({ isActive }) => ({
                                backgroundColor: isActive ? `var(--color-secondary)` : 'transparent',
                                color: isActive ? `var(--color-surface)` : `var(--color-text)`,
                                transitionDelay: `${idx * 40}ms`
                            })}
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    <div className="mt-auto pt-4 flex items-center justify-between" style={{ borderTop: `1px solid var(--color-border)` }}>
                        <div
                            onClick={() => navigate('/profile')}
                            className="flex items-center gap-3 font-semibold cursor-pointer p-2 rounded-lg transition-all duration-300 hover:opacity-80"
                            style={{ color: `var(--color-text)` }}
                        >
                            <User size={16} />
                            <span className="text-sm">Profile</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
