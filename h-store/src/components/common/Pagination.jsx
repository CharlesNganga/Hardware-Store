// src/components/common/Pagination.jsx
import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md border ${
            page === currentPage ? "bg-[#1228e1] text-white" : "bg-white text-gray-700"
          } hover:bg-[#1228e1] hover:text-white transition`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
