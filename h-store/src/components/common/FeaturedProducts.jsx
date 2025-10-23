import React, { useEffect, useState } from "react";

import { getFeaturedProducts } from "../../api/services";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured products from API
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedProducts();

        // Handle both array and paginated response
        let productsArray = [];
        if (Array.isArray(data)) {
          productsArray = data;
        } else if (data && data.results && Array.isArray(data.results)) {
          productsArray = data.results;
        }

        // Take only first 3 featured products
        setProducts(productsArray.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load featured products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse aspect-[4/5] rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // No products - show message instead of hiding
  if (products.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No featured products available. Please mark some products as
            featured in the admin panel.
          </p>
        </div>
      </div>
    );
  }

  // Display featured products
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <a
            key={product.id}
            href={`/products/${product.category_slug || ""}`}
            className="relative group overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
          >
            {/* Product Image */}
            <div className="w-[85%] mx-auto aspect-[4/5] bg-black">
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:opacity-90 transition duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  Image Coming Soon
                </div>
              )}
            </div>

            {/* Overlay text */}
            <div className="absolute inset-0 flex flex-col items-center px-4 pt-4">
              <p className="text-xs sm:text-sm font-semibold uppercase text-white bg-[#1228e1] px-2 py-1 mb-2">
                Featured Product
              </p>
              <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
                {product.name}
              </h3>
              <p className="text-sm text-white drop-shadow-lg mt-2">
                {product.company}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
