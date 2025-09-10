import React, { useState } from "react";

import ProductCard from "./ProductCard";

const ProductsGrid = ({ products }) => {
  const productsPerPage = 16; // 4x4 grid
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="w-full my-6 px-4 sm:px-6 lg:px-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border ${
                page === currentPage
                  ? "bg-[#1228e1] text-white border-[#1228e1]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              } rounded transition`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
