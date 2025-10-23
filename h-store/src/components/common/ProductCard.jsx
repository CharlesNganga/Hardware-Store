import { Expand, Heart, ShoppingCart } from "lucide-react";
import React, { useState } from "react";

import ProductModal from "./ProductModal";

const ProductCard = ({ id, company, name, price, thumbnail, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use thumbnail or image prop, with fallback
  const displayImage = thumbnail || image || "https://via.placeholder.com/400x300";
  const displayName = name || "Unnamed Product";
  const displayCompany = company || "Unknown Brand";
  const displayPrice = price || "N/A";

  // Product object for modal
  const product = {
    id: id,
    name: displayName,
    company: displayCompany,
    price: displayPrice,
    thumbnail: displayImage,
    brand: displayCompany,
    condition: "New",
    images: [displayImage], // Modal expects array of images
  };

  return (
    <>
      <div className="relative group bg-white shadow hover:shadow-lg transition duration-300 p-3">
        {/* Product Image */}
        <div className="relative w-full aspect-[4/5]  overflow-hidden">
          <img
            src={displayImage}
            alt={displayName}
            className="w-full h-full object-cover group-hover:opacity-90 transition duration-300"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />

          {/* Hover Icons */}
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 space-x-3">
            <button className="bg-white p-2 rounded-full shadow hover:bg-[#1228e1] hover:text-white transition">
              <Heart className="w-5 h-5" />
            </button>
            <button className="bg-white p-2 rounded-full shadow hover:bg-[#1228e1] hover:text-white transition">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white p-2 rounded-full shadow hover:bg-[#1228e1] hover:text-white transition"
            >
              <Expand className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-500">{displayCompany}</p>
          <h3 className="text-base font-semibold text-gray-900">
            {displayName}
          </h3>
          <p className="text-[#1228e1] font-bold">
            {displayPrice !== "N/A" ? `Ksh. ${displayPrice}` : "Price not set"}
          </p>
        </div>
      </div>

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  );
};

export default ProductCard;