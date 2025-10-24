import { Link } from 'react-router-dom';
import React from 'react';

// Default background image if no category image is found
const DEFAULT_BG = 'https://images.unsplash.com/photo-1584622781564-1d987709cea4?w=1600&h=400&fit=crop';

const ProductsHero = ({ selectedSubcategory, searchTerm, categories = [] }) => { // Added categories prop with default

  // Find the current category object based on the slug
  const currentCategory = selectedSubcategory
    ? categories.find(cat => cat.slug === selectedSubcategory)
    : null;

  // Determine the background image URL
  const backgroundImageUrl = currentCategory?.image || DEFAULT_BG;

  // Format category name for display
  const displayCategory = currentCategory
    ? currentCategory.name // Use the name from the category object
    : selectedSubcategory?.replace(/-/g, " "); // Fallback if object not found

  // Determine the title based on search or category
  let titleContent;
  if (searchTerm) {
    titleContent = (
      <span className="capitalize">Search results for: "{searchTerm}"</span>
    );
  } else {
    titleContent = (
      <>
        <Link
          to="/products"
          className="hover:text-[#1228e1] transition-colors duration-200"
        >
          Products
        </Link>
        {displayCategory && (
          <>
            <span className="mx-2">|</span>
            <span className="capitalize">{displayCategory}</span>
          </>
        )}
      </>
    );
  }

  return (
    <div
      className="w-full h-[25vh] relative flex items-center justify-center bg-gray-400" // Added fallback bg color
      style={{
        backgroundImage: `url('${backgroundImageUrl}')`, // Use dynamic image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Remove the dark overlay div */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}

      {/* Add a subtle overlay/shadow behind the text for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>


      <div className="relative text-center text-white px-4"> {/* Added padding */}
        {/* Add text shadow for better readability */}
        <h1 className="text-2xl md:text-3xl font-bold flex flex-wrap items-center justify-center gap-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
          {titleContent}
        </h1>
      </div>
    </div>
  );
};

export default ProductsHero;