import { Minus, Plus, Trash2, X } from 'lucide-react';

// src/components/cart/CartModal.jsx
import React from 'react';
import { backendUrl } from '../../api/api';
import { useCart } from './CartContext'; // Use the correct relative path

// --- Cart Item Component ---
// Renders individual items within the modal
const CartItem = ({ item }) => {
  const { updateItemQuantity, removeItemFromCart, loading } = useCart(); // Adjusted function names

  const getImageUrl = (thumbnail) => {
    if (!thumbnail) return 'https://via.placeholder.com/100';
    if (thumbnail.startsWith('http')) return thumbnail;
    return `${backendUrl}${thumbnail}`;
  };

  return (
    <li className="flex py-4 space-x-4">
      {/* Item Image */}
      <div className="flex-shrink-0">
        <img
          src={getImageUrl(item.product.thumbnail)}
          alt={item.product.name}
          className="h-20 w-20 rounded-md object-cover border border-gray-200" // Added border
        />
      </div>

      {/* Item Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4"> {/* Added padding-right */}
            <h3 className="text-sm font-semibold text-gray-900 leading-tight"> {/* Adjusted text size/leading */}
              {item.product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Ksh {item.product.price}
            </p>
          </div>
          {/* Item Total Price */}
          <p className="ml-4 text-sm font-semibold text-gray-900">
            Ksh {item.total_item_price} {/* Use field from serializer */}
          </p>
        </div>

        {/* Controls: Quantity and Remove */}
        <div className="flex items-end justify-between mt-2"> {/* Added margin-top */}
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded">
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)} // Adjusted function name
              disabled={loading || item.quantity <= 1} // Disable decrement at 1
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled cursor
            >
              <Minus size={14} />
            </button>
            <span className="px-3 text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)} // Adjusted function name
              disabled={loading}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => removeItemFromCart(item.id)} // Adjusted function name
            disabled={loading}
            className="font-medium text-red-600 hover:text-red-500 text-sm flex items-center gap-1 disabled:opacity-50"
          >
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

// --- Main Cart Modal Component ---
const CartModal = () => {
  // Get state and functions from the Cart Context
  const {
    isCartOpen,
    toggleCart, // Use toggleCart to close
    cartItems, // Use cartItems directly
    itemCount,
    totalPrice,
    loading
  } = useCart();

  const hasItems = cartItems && cartItems.length > 0;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${
        isCartOpen ? 'pointer-events-auto' : 'pointer-events-none' // Control interaction
      }`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* 1. Backdrop Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'bg-opacity-50' : 'bg-opacity-0' // Animate opacity
        }`}
        onClick={toggleCart} // Close on backdrop click
        aria-hidden="true"
      />

      {/* 2. Cart Panel (Slide-over) */}
      <div
        className={`fixed inset-y-0 right-0 flex max-w-full pl-10 transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full' // Animate slide
        }`}
      >
        <div className="relative w-screen max-w-md"> {/* Adjust max-width if needed */}
          <div className="flex h-full flex-col bg-white shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
              <h2 id="slide-over-title" className="text-lg font-medium text-gray-900"> {/* Use medium font */}
                Shopping Cart
              </h2>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-500" // Standard close button styling
                onClick={toggleCart} // Use toggleCart to close
              >
                <span className="sr-only">Close panel</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Content Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
              {loading && !hasItems ? ( // Show loading only if cart is not yet loaded
                <p className="text-center text-gray-500">Loading...</p>
              ) : !hasItems ? (
                // Empty Cart Message
                <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
                   {/* Optional: Add an icon */}
                  {/* <ShoppingCart size={48} className="text-gray-300 mb-4" />  */}
                  <p className="text-lg font-medium">Your cart is empty.</p>
                  <p className="mt-2 text-sm">
                    Add items to your cart to see them here.
                  </p>
                </div>
              ) : (
                // List of Cart Items
                <ul role="list" className="-my-4 divide-y divide-gray-200"> {/* Adjust negative margin */}
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer / Summary Box (Only show if items exist) */}
            {hasItems && (
              <div className="border-t border-gray-200 bg-gray-50 px-4 sm:px-6 py-6">
                <div className="flex justify-between text-base font-medium text-gray-900"> {/* Use base font */}
                  <p>Subtotal</p>
                  <p>Ksh {totalPrice}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Total {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart.
                </p>

                <div className="mt-6 space-y-3">
                  {/* Checkout Button (Green) */}
                  <button
                    disabled // Keep disabled for now
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                  </button>
                  {/* Continue Shopping Button (Blue) */}
                  <button
                    type="button"
                    className="w-full text-center font-medium text-[#1228e1] hover:text-blue-700" // Brand color
                    onClick={toggleCart} // Close modal
                  >
                    or Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;