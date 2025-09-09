import React, { useState } from "react";

import ProductCard from "../common/ProductCard";

const LatestProducts = () => {
  const [activeTab, setActiveTab] = useState("New Arrivals");

  // Sample products (8 items)
  const products = [
    {
      id: 1,
      company: "Bamburi",
      name: "Cement 50kg",
      price: "780",
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 2,
      company: "Kentank",
      name: "PPR Pipe 1 inch",
      price: "1200",
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 3,
      company: "Royal Mabati",
      name: "Mabati Sheet 3m",
      price: "2500",
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 4,
      company: "Philips",
      name: "LED Bulb 12W",
      price: "350",
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 5,
      company: "Crown Paints",
      name: "Wall Paint 4L",
      price: "1900",
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 6,
      company: "Kentank",
      name: "HDPE Fitting",
      price: "1500",
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 7,
      company: "Davis & Shirtliff",
      name: "Water Pump",
      price: "13500",
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 8,
      company: "Kenchic",
      name: "Shower Instant",
      price: "4200",
      image: "https://via.placeholder.com/300x400",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Latest Products
      </h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-8">
        {["New Arrivals", "Featured", "Best Sellers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition ${
              activeTab === tab
                ? "text-[#1228e1] border-b-2 border-[#1228e1]"
                : "text-gray-600 hover:text-[#1228e1]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            company={product.company}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>

      {/* All Products Button */}
      <div className="text-center">
        <a
          href="/products"
          className="inline-block bg-[#1228e1] text-white px-6 py-3 font-semibold uppercase tracking-wide hover:bg-white hover:text-[#1228e1] border border-[#1228e1] transition"
        >
          All Products
        </a>
      </div>
    </div>
  );
};

export default LatestProducts;
