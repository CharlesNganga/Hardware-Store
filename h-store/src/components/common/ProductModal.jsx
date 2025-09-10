import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom";
import { X } from "lucide-react";

const ProductModal = ({ isOpen, onClose, product }) => {
  const [showModal, setShowModal] = useState(false);

  // Animate open/close
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      const timer = setTimeout(() => setShowModal(false), 200); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!showModal) return null;

  const discounted =
    product?.discountedPrice && product?.discountedPrice < product?.price;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 
        transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative bg-white w-[95%] max-w-4xl rounded-2xl shadow-lg overflow-hidden 
          flex flex-col md:flex-row transform transition-transform duration-200 ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Images */}
        <div className="md:w-1/2 p-4 flex flex-col items-center">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full max-h-[300px] object-cover rounded-lg"
          />
          <div className="flex space-x-2 mt-3">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className="w-16 h-16 object-cover rounded-md border cursor-pointer hover:border-[#1228e1]"
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 p-6 flex flex-col">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-sm text-gray-500 mt-1">Brand: {product.brand}</p>
          <p className="text-sm text-gray-500">Condition: {product.condition}</p>

          {/* Price */}
          <div className="mt-3">
            {discounted ? (
              <div>
                <span className="text-2xl font-bold text-[#1228e1] mr-2">
                  Ksh {product.discountedPrice}
                </span>
                <span className="line-through text-gray-500">
                  Ksh {product.price}
                </span>
                <span className="ml-2 text-green-600 font-medium">10% OFF</span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-[#1228e1]">
                Ksh {product.price}
              </span>
            )}
          </div>

          {/* Cart Summary */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Items in Cart</span>
              <span>1</span>
            </div>
            <div className="flex justify-between text-sm text-gray-900 font-semibold mt-1">
              <span>Subtotal</span>
              <span>
                Ksh {discounted ? product.discountedPrice : product.price}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex space-x-3">
            <button
              onClick={onClose}
              className="w-1/2 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Continue Shopping
            </button>
            <button className="w-1/2 py-2 rounded-lg bg-[#1228e1] text-white font-semibold hover:bg-[#0f20b3]">
              Proceed to Checkout
            </button>
          </div>

          {/* Extra Links */}
          <div className="mt-4 text-sm">
            <button className="text-[#1228e1] hover:underline">
              Add to Wishlist
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 flex space-x-3 items-center text-xs text-gray-500">
            <span className="px-2 py-1 border rounded">🔒 Secure Checkout</span>
            <span className="px-2 py-1 border rounded">✔ Buyer Protection</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductModal;
