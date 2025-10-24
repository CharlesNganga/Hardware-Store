// src/components/cart/CartContext.jsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import api from '../../api/api'; // Import the configured Axios instance

// 1. Create the Context
const CartContext = createContext();

// 2. Create the Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null); // Holds the cart data from the backend
  const [isCartOpen, setIsCartOpen] = useState(false); // Controls modal visibility
  const [loading, setLoading] = useState(false); // Indicates if a cart operation is in progress
  const [error, setError] = useState(null); // Stores any cart-related errors

  // 3. Fetch Cart Function (using useCallback for stability)
  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/cart/');
      setCart(response.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError(err);
      // Optional: Set a default empty cart structure on error
      // setCart({ id: null, session_key: null, items: [], total_price: '0.00', item_count: 0 });
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  // Fetch Cart on Initial App Load
  useEffect(() => {
    fetchCart();
  }, [fetchCart]); // fetchCart is stable due to useCallback

  // 4. Action Functions (Add, Update, Remove)
  const addItemToCart = useCallback(async (productId, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/cart/', { product_id: productId, quantity });
      setCart(response.data);
      setIsCartOpen(true); // Open cart automatically when item is added
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setError(err);
      // Re-throw error if you want components to handle it (e.g., show a toast)
      // throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItemQuantity = useCallback(async (itemId, quantity) => {
    // Prevent invalid quantities early
    if (quantity < 0) return;

    setLoading(true);
    setError(null);
    try {
      const response = await api.put('/cart/', { item_id: itemId, quantity });
      setCart(response.data);
    } catch (err) {
      console.error("Failed to update cart quantity:", err);
      setError(err);
      // throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItemFromCart = useCallback(async (itemId) => {
    setLoading(true);
    setError(null);
    try {
      // Axios delete requests send 'data' in a config object
      const response = await api.delete('/cart/', { data: { item_id: itemId } });
      setCart(response.data);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      setError(err);
      // throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 5. Toggle Cart Modal Visibility
  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  // 6. Derived Data (Memoized for performance)
  // These directly use the values calculated by the Django serializer
  const itemCount = useMemo(() => cart?.item_count || 0, [cart]);
  const totalPrice = useMemo(() => cart?.total_price || '0.00', [cart]);
  const cartItems = useMemo(() => cart?.items || [], [cart]); // Default to empty array

  // 7. Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    cart,
    isCartOpen,
    loading,
    error,
    fetchCart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    toggleCart,
    openCart,
    closeCart,
    itemCount,
    totalPrice,
    cartItems, // Provide the items array directly
  }), [
    cart, isCartOpen, loading, error, fetchCart, addItemToCart,
    updateItemQuantity, removeItemFromCart, toggleCart, openCart, closeCart,
    itemCount, totalPrice, cartItems
  ]);

  // Provide the context value to children components
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 8. Custom Hook to consume the Cart Context
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};