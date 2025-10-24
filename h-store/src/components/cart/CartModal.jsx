import { Minus, Plus, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'; // Import useEffect, useState

import { backendUrl } from '../../api/api';
import { getCompanyInfo } from '../../api/services'; // 1. Import getCompanyInfo
import { useCart } from './CartContext';

// --- Cart Item Component (No changes needed here) ---
const CartItem = ({ item }) => {
  // ... (keep existing CartItem code)
  const { updateItemQuantity, removeItemFromCart, loading } = useCart();

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
          className="h-20 w-20 rounded-md object-cover border border-gray-200"
        />
      </div>

      {/* Item Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
              {item.product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Ksh {item.product.price}
            </p>
          </div>
          {/* Item Total Price */}
          <p className="ml-4 text-sm font-semibold text-gray-900">
            Ksh {item.total_item_price}
          </p>
        </div>

        {/* Controls: Quantity and Remove */}
        <div className="flex items-end justify-between mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded">
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              disabled={loading || item.quantity <= 1}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              disabled={loading}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => removeItemFromCart(item.id)}
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
  const {
    isCartOpen,
    toggleCart,
    cartItems,
    itemCount,
    totalPrice,
    loading
  } = useCart();

  // 2. Add state for company info
  const [companyInfo, setCompanyInfo] = useState(null);

  // 3. Fetch company info when the modal might become visible
  useEffect(() => {
    // Fetch only if needed, could optimize further if info is globally available
    getCompanyInfo()
      .then(setCompanyInfo)
      .catch(err => console.error("Error fetching company info for cart modal:", err));
  }, []); // Runs once on component mount

  const hasItems = cartItems && cartItems.length > 0;

  // 4. Create the WhatsApp inquiry function
  const handleWhatsAppCartInquiry = () => {
    if (!companyInfo?.whatsapp_number || !hasItems) return;

    // Format cart items for the message
    const itemsList = cartItems.map(item =>
      `- ${item.product.name} (x${item.quantity}) - Ksh ${item.total_item_price}`
    ).join('\n');

    const message = `Hello! I'm interested in the items in my cart:\n\n${itemsList}\n\nSubtotal: Ksh ${totalPrice}\nTotal Items: ${itemCount}\n\nPlease provide more details or help me proceed.`;

    const whatsappLink = `https://wa.me/${companyInfo.whatsapp_number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${
        isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop Overlay */}
      <div
        className={`absolute inset-0  transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={toggleCart}
        aria-hidden="true"
      />

      {/* Cart Panel */}
      <div
        className={`fixed inset-y-0 right-0 flex max-w-full pl-10 transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
              <h2 id="slide-over-title" className="text-lg font-medium text-gray-900">
                Shopping Cart
              </h2>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-500"
                onClick={toggleCart}
              >
                <span className="sr-only">Close panel</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
              {loading && !hasItems ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : !hasItems ? (
                <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
                  <p className="text-lg font-medium">Your cart is empty.</p>
                  <p className="mt-2 text-sm">Add items to see them here.</p>
                </div>
              ) : (
                <ul role="list" className="-my-4 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer / Summary Box */}
            {hasItems && (
              <div className="border-t border-gray-200 bg-gray-50 px-4 sm:px-6 py-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>Ksh {totalPrice}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Total {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart.
                </p>

                <div className="mt-6 space-y-3">
                  {/* Checkout Button */}
                  <button
                    disabled
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                  </button>

                  {/* 5. Add WhatsApp Inquiry Button */}
                  <button
                    onClick={handleWhatsAppCartInquiry}
                    disabled={!companyInfo} // Disable if company info hasn't loaded
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-[#25D366] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#1FAF38] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <span>💬 Inquire via WhatsApp</span>
                  </button>

                  {/* Continue Shopping Button */}
                  <button
                    type="button"
                    className="w-full text-center font-medium text-[#1228e1] hover:text-blue-700"
                    onClick={toggleCart}
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