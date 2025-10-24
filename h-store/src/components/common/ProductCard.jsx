// src/components/common/ProductCard.jsx
import { Expand, ShoppingCart } from "lucide-react"; // Heart removed
import React, { useState } from "react";

import ProductModal from "./ProductModal";
import { useCart } from "../../components/cart/CartContext"; // 1. Import useCart

const ProductCard = ({ id, company, name, price, thumbnail, image, image_1, image_2, category_name, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 2. Get addItemToCart and loading state from context
  const { addItemToCart, loading: cartLoading } = useCart();

  // Determine display image (no change)
  const displayImage = thumbnail || image || "https://via.placeholder.com/400x300";
  const displayName = name || "Unnamed Product";
  const displayCompany = company || "Unknown Brand";
  const displayPrice = price || "N/A";

  // Build images array for modal (no change)
  const imageGallery = [thumbnail, image_1, image_2].filter(Boolean);

  // Product object for modal (no change)
  const product = {
    id, name: displayName, company: displayCompany, price: displayPrice,
    thumbnail: displayImage, image_1, image_2,
    images: imageGallery.length > 0 ? imageGallery : [displayImage],
    brand: displayCompany, condition: "New", category_name, description,
  };

  // 3. Handle quick add to cart
  const handleQuickAdd = async (e) => {
    e.stopPropagation(); // Prevent modal opening if card is clicked
    e.preventDefault();  // Prevent default if card is wrapped in <a>
    try {
      await addItemToCart(id, 1); // Add 1 item
      // Optional: Add visual feedback here (e.g., toast notification)
    } catch (error) {
      console.error("Quick add failed:", error);
      // Optional: Add error feedback
    }
  };

  return (
    <>
      <div className="relative group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-3 overflow-hidden"> {/* Adjusted styling */}
        {/* Product Image */}
        <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-md overflow-hidden"> {/* Adjusted styling */}
          <img
            src={displayImage}
            alt={displayName}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
            onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=No+Image"; }}
          />

          {/* Hover Icons */}
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 opacity-0 group-hover:opacity-100 space-x-3">
             {/* 4. Heart button removed */}

            {/* 5. ShoppingCart Button */}
            <button
              onClick={handleQuickAdd}
              // 6. Disable if cart context is loading
              disabled={cartLoading}
              className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:bg-[#1228e1] hover:text-white transition transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled state styles
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>

            {/* Expand Button (no functional change) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:bg-[#1228e1] hover:text-white transition transform hover:scale-110"
              aria-label="Quick view"
            >
              <Expand className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info (no functional change) */}
        <div className="mt-3 text-center px-1"> {/* Added horizontal padding */}
          <p className="text-xs text-gray-500 truncate">{displayCompany}</p> {/* Adjusted size, added truncate */}
          <h3 className="text-sm font-semibold text-gray-900 mt-0.5 truncate" title={displayName}> {/* Adjusted size, added truncate & title */}
            {displayName}
          </h3>
          <p className="text-base font-bold text-[#1228e1] mt-1"> {/* Adjusted size */}
            {displayPrice !== "N/A" ? `Ksh ${displayPrice}` : "Price unavailable"}
          </p>
        </div>
      </div>

      {/* Modal (no change) */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  );
};

export default ProductCard;