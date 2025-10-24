import MaterialsImage from "../../assets/ImageB.png"; // Adjust filename if needed
import React from "react";
// 1. Import the images from your assets folder
import ToolsImage from "../../assets/ImageA.png"; // Adjust filename if needed

const ThreeColumnSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* Images section */}
        <div className="md:col-span-7 grid grid-cols-2 gap-6">
          {/* Image 1 */}
          <div className="w-full aspect-[3/4] overflow-hidden rounded-lg shadow-md"> {/* Optional: Add rounded corners/shadow */}
            {/* 2. Replace div with img tag */}
            <img
              src={ToolsImage}
              alt="Organized wall of hand tools and power tools"
              className="w-full h-full object-cover" // Ensure image covers the area
            />
          </div>

          {/* Image 2 shifted lower */}
          <div className="w-full aspect-[3/4] relative top-12 overflow-hidden rounded-lg shadow-md"> {/* Optional: Add rounded corners/shadow */}
            {/* 3. Replace div with img tag */}
            <img
              src={MaterialsImage}
              alt="Stacked lumber, pipes, and bags of cement"
              className="w-full h-full object-cover" // Ensure image covers the area
            />
          </div>
        </div>

        {/* Text Block */}
        <div className="md:col-span-5 flex flex-col justify-center space-y-4 px-4 relative top-12 md:top-28"> {/* Adjusted relative positioning for responsiveness */}
          {/* Subheading */}
          <p className="text-sm font-semibold text-[#1228e1] uppercase tracking-wide">
            Your Project Partner
          </p>

          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-900">
            Quality Supplies for Every Job
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm md:text-base">
            From foundations to finishes, find reliable tools and materials for construction, repairs, and DIY projects. Build with confidence.
          </p>

          {/* Button */}
          <a
            href="/products"
            className="inline-flex self-start items-center justify-center bg-[#1228e1] text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-blue-900 transition rounded" // Added self-start and rounded
          >
            Explore Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnSection;