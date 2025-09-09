import React from "react";

const TopBar = () => {
  return (
    <div className="w-full bg-[#1228e1] text-white text-sm px-6 py-2 flex items-center justify-between">
      {/* Left message */}
      <p>We do delivery across the country</p>

      {/* Contact info */}
      <div className="flex space-x-6">
        <a href="mailto:info@yourstore.com" className="hover:underline">
          info@yourstore.com
        </a>
        <a href="tel:+254700000000" className="hover:underline">
          +254 700 000 000
        </a>
      </div>
    </div>
  );
};

export default TopBar;
