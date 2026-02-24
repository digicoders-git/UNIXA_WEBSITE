import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken } from '../utils/auth';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const getUserId = () => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            try {
                const parsed = JSON.parse(userData);
                return parsed.id || parsed._id || 'guest';
            } catch {
                return 'guest';
            }
        }
        return 'guest';
    };

    const [currentUserId, setCurrentUserId] = useState(getUserId());
    const [cart, setCart] = useState(() => {
        const userId = getUserId();
        const savedCart = localStorage.getItem(`sks_cart_${userId}`);
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Monitor user changes and reload cart
    useEffect(() => {
        const checkUserChange = () => {
            const newUserId = getUserId();
            if (newUserId !== currentUserId) {
                setCurrentUserId(newUserId);
                const savedCart = localStorage.getItem(`sks_cart_${newUserId}`);
                setCart(savedCart ? JSON.parse(savedCart) : []);
            }
        };

        window.addEventListener('storage', checkUserChange);
        const interval = setInterval(checkUserChange, 1000);

        return () => {
            window.removeEventListener('storage', checkUserChange);
            clearInterval(interval);
        };
    }, [currentUserId]);

    useEffect(() => {
        const userId = getUserId();
        localStorage.setItem(`sks_cart_${userId}`, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const productId = product._id || product.id;
        setCart(prev => {
            const existingIndex = prev.findIndex(item => (item._id || item.id) === productId);
            if (existingIndex > -1) {
                const newCart = [...prev];
                newCart[existingIndex] = {
                    ...newCart[existingIndex],
                    quantity: (newCart[existingIndex].quantity || 0) + (product.quantity || 1)
                };
                return newCart;
            }
            return [...prev, { ...product, quantity: product.quantity || 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => (item._id || item.id) !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return removeFromCart(productId);
        setCart(prev => prev.map(item => 
            (item._id || item.id) === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
};
