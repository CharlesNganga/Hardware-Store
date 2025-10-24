// src/components/common/ProductModal.jsx
import { Minus, Plus, ShoppingCart, X } from "lucide-react"; // Heart removed
import React, { useCallback, useEffect, useState } from "react"; // Added useCallback

import ReactDOM from "react-dom";
import { getCompanyInfo } from "../../api/services";
import { useCart } from "../../components/cart/CartContext"; // 1. Import useCart

const ProductModal = ({ isOpen, onClose, product }) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [companyInfo, setCompanyInfo] = useState(null);
  // isFavorite state removed
  const [isProcessing, setIsProcessing] = useState(false); // Renamed for clarity
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  // 2. Get addItemToCart and loading state from context
  const { addItemToCart, loading: cartLoading } = useCart();

  // Animate open/close
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setQuantity(1); // Reset quantity
      setMainImage(product?.thumbnail || product?.images?.[0]);
      setShowAddedMessage(false); // Reset message
      setIsProcessing(false); // Reset processing state
    } else {
      // Delay unmounting for closing animation
      const timer = setTimeout(() => setShowModal(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, product]);

  // Fetch company info for WhatsApp
  useEffect(() => {
    getCompanyInfo()
      .then(setCompanyInfo)
      .catch(err => console.error("Error fetching company info:", err));
  }, []);

  // Close on ESC key press
  const handleEsc = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    // Cleanup listener on unmount
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, handleEsc]);


  if (!showModal || !product) return null; // Render nothing if not open or no product

  // --- Event Handlers ---

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change)); // Ensure quantity >= 1
  };

  const subtotal = (parseFloat(product.price || 0) * quantity).toFixed(2); // Handle potential missing price

  const handleWhatsAppInquiry = () => {
    if (!companyInfo?.whatsapp_number) return;
    const message = `Hello! I'm interested in:\n\nProduct: ${product.name}\nBrand: ${product.company}\nQuantity: ${quantity}\nPrice: Ksh ${product.price}\n\nPlease provide more information.`;
    const whatsappLink = `https://wa.me/${companyInfo.whatsapp_number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer"); // Security best practice
  };

  // handleToggleFavorite removed

  // 3. Update handleAddToCart to use context
  const handleAddToCart = async () => {
    setIsProcessing(true); // Indicate local processing start
    setShowAddedMessage(false);
    try {
      await addItemToCart(product.id, quantity); // Call context function
      setShowAddedMessage(true); // Show success message on success
      // Optional: Close modal after delay - consider user experience
      // setTimeout(onClose, 1500);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      // TODO: Add user-facing error feedback (e.g., a toast notification)
    } finally {
      setIsProcessing(false); // Indicate local processing end
      // Automatically hide success message after a few seconds
      setTimeout(() => setShowAddedMessage(false), 2500);
    }
  };

  // Placeholder for checkout logic
  const handleCheckout = () => {
    alert(`Checkout feature coming soon for ${quantity}x ${product.name}`);
  };

  // --- Render Logic ---

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50  
        transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={onClose} // Close on backdrop click
      aria-modal="true"
      role="dialog"
      aria-labelledby="product-modal-title" // Accessibility
    >
      <div
        className={`relative bg-white w-[95%] max-w-4xl rounded-lg shadow-xl overflow-hidden  
          flex flex-col md:flex-row transform transition-transform duration-200 max-h-[90vh] ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* --- LEFT SECTION — IMAGES (No functional changes) --- */}
        <div className="md:w-1/2 p-4 flex flex-col items-center overflow-y-auto">
          <img
            src={mainImage || product.thumbnail || "https://via.placeholder.com/400x300"}
            alt={product.name}
            className="w-full max-h-[400px] object-contain rounded-lg mb-3 border border-gray-200" // Added border
          />
          {/* Image Gallery */}
          {product.images && product.images.length > 1 && ( // Only show gallery if more than 1 image
            <div className="flex flex-wrap justify-center gap-2 mt-2"> {/* Use flex-wrap */}
              {product.images.map((img, index) => (
                <button // Use button for click interaction
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 rounded-md border-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#1228e1] ${
                    mainImage === img ? "border-[#1228e1]" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/80?text=Err"; }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- RIGHT SECTION — DETAILS --- */}
        <div className="md:w-1/2 p-6 flex flex-col overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 z-10" // Adjusted position/color
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 4. Favorite button removed */}

          <h2 id="product-modal-title" className="text-2xl font-bold text-gray-900 pr-10"> {/* Adjusted size/padding */}
            {product.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Brand: {product.company}</p>
          {product.category_name && (
            <p className="text-sm text-gray-500">Category: {product.category_name}</p>
          )}

          {/* Price */}
          <div className="mt-4">
            <span className="text-3xl font-bold text-[#1228e1]"> {/* Adjusted size */}
              Ksh {product.price}
            </span>
            {/* TODO: Add discount logic if needed */}
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-4 prose prose-sm text-gray-600"> {/* Use prose for styling */}
              <h3 className="font-semibold text-gray-900 mb-1">Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mt-6"> {/* Added margin */}
            <label className="block text-sm font-medium text-gray-700 mb-1"> {/* Adjusted font/color */}
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1} // Disable at 1
                className="p-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" // Adjusted style
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-lg font-medium">{quantity}</span> {/* Adjusted size */}
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100" // Adjusted style
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subtotal Display */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-base font-medium text-gray-900"> {/* Adjusted size */}
              <span>Subtotal</span>
              <span>Ksh {subtotal}</span>
            </div>
          </div>

          {/* "Added to Cart" Message */}
          {showAddedMessage && (
            <div className="mt-4 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-md text-sm flex items-center gap-2"> {/* Adjusted style */}
              <ShoppingCart className="w-5 h-5" />
              <span>Added to cart successfully!</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleAddToCart}
              // 5. Disable if local state processing OR context is loading
              disabled={isProcessing || cartLoading}
              className="w-full py-3 rounded-lg bg-[#1228e1] text-white font-semibold hover:bg-[#0f20b3] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" /> {/* Added margin */}
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            {/* Other buttons (no functional change) */}
            <button
              onClick={handleCheckout} // Placeholder
              className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-200 disabled:opacity-50" // Added disabled style for consistency
              disabled // Keep disabled for now
            >
              Proceed to Checkout
            </button>
            <button
              onClick={handleWhatsAppInquiry}
              className="w-full py-3 rounded-lg bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>💬 Inquire via WhatsApp</span>
            </button>
          </div>

            {/* Continue Shopping Button */}
            <div className="mt-4 text-center">
                 <button
                 onClick={onClose}
                 className="text-sm font-medium text-[#1228e1] hover:text-blue-700" // Brand color
                 >
                 or Continue Shopping &rarr;
                 </button>
            </div>


          {/* Trust Indicators (optional minor style adjustment) */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-gray-500 justify-center"> {/* Centered */}
            <span className="px-3 py-1 border border-gray-300 rounded-full">🔒 Secure</span>
            <span className="px-3 py-1 border border-gray-300 rounded-full">✔ Quality Assured</span>
            <span className="px-3 py-1 border border-gray-300 rounded-full">🚚 Nationwide Delivery</span>
          </div>
        </div>
      </div>
    </div>,
    document.body // Render into the body tag
  );
};

export default ProductModal;