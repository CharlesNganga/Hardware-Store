import { Heart, Minus, Plus, ShoppingCart, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom";
import { getCompanyInfo } from "../../api/services";

const ProductModal = ({ isOpen, onClose, product }) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  // Animate open/close
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setQuantity(1); // Reset quantity when modal opens
      setMainImage(product?.thumbnail || product?.images?.[0]);
    } else {
      const timer = setTimeout(() => setShowModal(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, product]);

  // Fetch company info for WhatsApp integration
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const data = await getCompanyInfo();
        setCompanyInfo(data);
      } catch (err) {
        console.error("Error fetching company info:", err);
      }
    };

    fetchCompanyInfo();
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!showModal || !product) return null;

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const subtotal = (parseFloat(product.price) * quantity).toFixed(2);

  // WhatsApp inquiry message
  const handleWhatsAppInquiry = () => {
    if (!companyInfo) return;

    const message = `Hello! I'm interested in:\n\nProduct: ${product.name}\nBrand: ${product.company}\nQuantity: ${quantity}\nPrice: Ksh ${product.price}\n\nPlease provide more information.`;
    const whatsappLink = `https://wa.me/${companyInfo.whatsapp_number}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(`${isFavorite ? "Removed from" : "Added to"} favorites:`, product.id);
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    setTimeout(() => {
      setIsAddingToCart(false);
      setShowAddedMessage(true);

      console.log("Added to cart:", {
        productId: product.id,
        quantity: quantity,
        price: product.price,
      });

      setTimeout(() => setShowAddedMessage(false), 2000);
    }, 500);
  };

  const handleCheckout = () => {
    alert(
      `Checkout feature coming soon!\n\nProduct: ${product.name}\nQuantity: ${quantity}\nTotal: Ksh ${subtotal}`
    );
  };

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
          flex flex-col md:flex-row transform transition-transform duration-200 max-h-[90vh] ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT SECTION — IMAGES */}
        <div className="md:w-1/2 p-4 flex flex-col items-center overflow-y-auto">
          {/* Main Image */}
          <img
            id="mainProductImage"
            src={
              mainImage ||
              product.thumbnail ||
              "https://via.placeholder.com/400x300"
            }
            alt={product.name}
            className="w-full max-h-[400px] object-contain rounded-lg mb-3"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />

          {/* Image Gallery */}
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md border cursor-pointer transition ${
                    mainImage === img
                      ? "border-[#1228e1]"
                      : "border-gray-200 hover:border-[#1228e1]"
                  }`}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/80x80?text=No+Image";
                  }}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}

          {/* Fallback for legacy image fields */}
          {(!product.images || product.images.length === 0) &&
            (product.image_1 || product.image_2) && (
              <div className="flex space-x-2 mt-3">
                {[product.image_1, product.image_2]
                  .filter(Boolean)
                  .map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Additional view ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-md border cursor-pointer hover:border-[#1228e1]"
                      onClick={() => setMainImage(img)}
                    />
                  ))}
              </div>
            )}
        </div>

        {/* RIGHT SECTION — DETAILS */}
        <div className="md:w-1/2 p-6 flex flex-col overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Favorite button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-4 right-16 p-2 rounded-full transition-all duration-200 z-10 ${
              isFavorite
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                isFavorite ? "fill-current" : ""
              }`}
            />
          </button>

          <h2 className="text-xl font-bold text-gray-900 pr-20">{product.name}</h2>
          <p className="text-sm text-gray-500 mt-1">Brand: {product.company}</p>
          {product.category_name && (
            <p className="text-sm text-gray-500">Category: {product.category_name}</p>
          )}

          {/* Price */}
          <div className="mt-4">
            <span className="text-2xl font-bold text-[#1228e1]">
              Ksh {product.price}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between text-lg text-gray-900 font-semibold mt-2">
              <span>Subtotal</span>
              <span>Ksh {subtotal}</span>
            </div>
          </div>

          {/* Success Message */}
          {showAddedMessage && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-medium">Added to cart successfully!</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full py-3 rounded-lg bg-[#1228e1] text-white font-semibold hover:bg-[#0f20b3] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-200"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={handleWhatsAppInquiry}
              className="w-full py-3 rounded-lg bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>💬 Inquire via WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-100 font-semibold transition-all duration-200"
            >
              Continue Shopping
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-gray-500">
            <span className="px-3 py-1 border rounded-full">🔒 Secure</span>
            <span className="px-3 py-1 border rounded-full">✔ Verified</span>
            <span className="px-3 py-1 border rounded-full">🚚 Nationwide Delivery</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductModal;
