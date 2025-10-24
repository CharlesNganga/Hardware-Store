// src/components/common/FeaturedProducts.jsx
import React, { useEffect, useState } from "react";

// 1. Import ProductModal
import ProductModal from "./ProductModal";
import { getFeaturedProducts } from "../../api/services";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Add state for modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch featured products (no changes here)
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedProducts();
        let productsArray = Array.isArray(data)
          ? data
          : data?.results && Array.isArray(data.results)
          ? data.results
          : [];
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

  // 3. Function to open the modal
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // 4. Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Clear selected product when closing
  };

  // Loading state (no changes)
  if (loading) {
    // ... (loading state JSX remains the same)
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

  // Error state (no changes)
  if (error) {
    // ... (error state JSX remains the same)
      return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // No products state (no changes)
  if (products.length === 0) {
    // ... (no products state JSX remains the same)
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
    <> {/* Wrap in Fragment to render modal alongside */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            // 5. Change <a> to a clickable div/button
            <div
              key={product.id}
              onClick={() => handleOpenModal(product)} // Add onClick handler
              className="relative group overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer bg-white rounded-lg" // Added cursor, bg, rounded
            >
              {/* Product Image */}
              <div className="w-full aspect-[4/5] bg-gray-100 rounded-t-lg"> {/* Adjusted background and rounded */}
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover transition duration-300" // Removed group-hover opacity
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm"> {/* Adjusted text color */}
                    Image Coming Soon
                  </div>
                )}
              </div>

              {/* Text content below image */}
              <div className="p-4 text-center"> {/* Added padding */}
                <p className="text-xs sm:text-sm font-semibold uppercase text-[#1228e1]"> {/* Brand color */}
                   Featured
                </p>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mt-1 truncate" title={product.name}> {/* Adjusted styles */}
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5"> {/* Adjusted styles */}
                  {product.company}
                </p>
                {/* Optional: Add price here if needed */}
                {/* <p className="text-base font-bold text-gray-800 mt-2">Ksh {product.price}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Render the ProductModal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct} // Pass the selected product data
      />
    </>
  );
};

export default FeaturedProducts;