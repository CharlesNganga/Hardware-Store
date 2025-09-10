import { Link } from "react-router-dom";
import React from "react";

const ProductsHero = ({ selectedSubcategory }) => {
  // Format subcategory for display
  const displayCategory = selectedSubcategory
    ? selectedSubcategory.replace(/-/g, " ")
    : null;

  return (
    <div
      className="w-full h-[25vh] relative flex items-center justify-center bg-black bg-opacity-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1584622781564-1d987709cea4?w=1600&h=400&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative text-center text-white">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2">
          <Link
            to="/products"
            className="hover:text-[#1228e1] transition-colors duration-200"
          >
            Home
          </Link>
          {displayCategory && (
            <>
              <span className="mx-2">|</span>
              <span className="capitalize">{displayCategory}</span>
            </>
          )}
        </h1>
      </div>
    </div>
  );
};

export default ProductsHero;
