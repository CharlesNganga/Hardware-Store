import { Expand, Heart, ShoppingCart } from "lucide-react";
import React, { useState } from "react";

import ProductModal from "./ProductModal";

const ProductCard = ({ company, name, price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const product = {
    name: "Gold Bell Cross 2cm Brass Wall Mount Basin",
    brand: "Transfixart",
    condition: "New",
    price: 2500,
    discountedPrice: 2250,
    thumbnail: "https://via.placeholder.com/400x300",
    images: [
      "https://via.placeholder.com/400x300",
      "https://via.placeholder.com/400x300?text=Alt1",
      "https://via.placeholder.com/400x300?text=Alt2",
    ],
  };

  return (
    <>
      <div className="relative group bg-white shadow hover:shadow-lg transition duration-300 p-3">
        {/* Product Image Placeholder */}
        <div className="relative w-full aspect-[4/5] bg-black overflow-hidden">
          {/* Hover Icons */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 space-x-3">
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
          <p className="text-sm text-gray-500">{company}</p>
          <h3 className="text-base font-semibold text-gray-900">{name}</h3>
          <p className="text-[#1228e1] font-bold">Ksh. {price}</p>
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
