import React from "react";

const ThreeColumnSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      {/* Grid: 12 columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Images section (≈62%) */}
        <div className="md:col-span-7 grid grid-cols-2 gap-6">
          {/* Image 1 */}
          <div className="w-full aspect-[3/4] bg-black"></div>

          {/* Image 2 shifted lower */}
          <div className="w-full aspect-[3/4] bg-black relative top-12"></div>
        </div>

        {/* Text Block aligned with Image 2 (≈38%) */}
        <div className="md:col-span-5 flex flex-col justify-center space-y-4 px-4 relative top-28">
          {/* Subheading */}
          <p className="text-sm font-semibold text-[#1228e1] uppercase tracking-wide">
            Premium Quality
          </p>

          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-900">
            Modern Bathroom Solutions
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm md:text-base">
            Discover stylish and durable bathroom fittings designed to bring
            elegance and functionality to your home.
          </p>

          {/* Button */}
          <a
            href="/products"
            className="inline-flex items-center justify-center bg-[#1228e1] text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-blue-900 transition"
          >
            Explore Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnSection;
