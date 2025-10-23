import React from "react";

const SubcategoriesSection = ({ subcategories, onSelect }) => {
  return (
    <div className="w-full my-6 px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 relative inline-block">
        Subcategories
        <span className="block w-16 h-1 bg-blue-600 mt-1 rounded"></span>
      </h2>

      {/* Subcategory Cards */}
      <div
        className="grid gap-6 sm:gap-8"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(150px, 1fr))`,
        }}
      >
        {subcategories.map((subcat) => (
          <div
            key={subcat.id}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            onClick={() => onSelect(subcat.slug)}
          >
            {/* Category Image */}
            <div className="h-40 w-full bg-gray-200 relative overflow-hidden">
              {subcat.image ? (
                <img
                  src={subcat.image}
                  alt={subcat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-gray-600 font-semibold text-sm">
                  No Image
                </span>
              )}

              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Category Name */}
            <div className="h-16 flex items-center justify-center bg-white text-center px-2">
              <span className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-500">
                {subcat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoriesSection;
