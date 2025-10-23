import React, { useEffect, useState } from "react";
import {
  getBestSellerProducts,
  getFeaturedProducts,
  getLatestProducts,
} from "../../api/services";

import ProductCard from "../common/ProductCard";

const LatestProducts = () => {
  const [activeTab, setActiveTab] = useState("New Arrivals");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products based on active tab
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let data = [];
        if (activeTab === "New Arrivals") {
          data = await getLatestProducts();
        } else if (activeTab === "Featured") {
          data = await getFeaturedProducts();
        } else if (activeTab === "Best Sellers") {
          data = await getBestSellerProducts();
        }

        // Handle both array and paginated responses
        const list = Array.isArray(data)
          ? data
          : data?.results && Array.isArray(data.results)
          ? data.results
          : [];

        setProducts(list);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

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

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse aspect-[4/5] rounded-lg"
            ></div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-500 py-8">{error}</div>
      )}

      {/* No Products */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No products found for this category.
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.thumbnail || "https://via.placeholder.com/300x400"}
              company={product.company}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      )}

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
