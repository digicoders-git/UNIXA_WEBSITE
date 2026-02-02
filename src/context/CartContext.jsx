import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('sks_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('sks_cart', JSON.stringify(cart));
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
