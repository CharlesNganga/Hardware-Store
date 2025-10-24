// src/components/navigation/Navbar.jsx
import { ChevronDown, Search, ShoppingCart, X } from "lucide-react"; // Added X icon
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import React, { useState } from "react"; // Import useState

import Logo from "../../assets/Logo.png";
import { useCart } from "../../components/cart/CartContext";

const Navbar = () => {
  const { itemCount, toggleCart } = useCart();
  // 1. Add state for search bar visibility and search term
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // 6. Initialize navigate hook

  // 2. Toggle function
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm(""); // Clear search term when opening/closing
  };

  // 7. Search submission handler
  const handleSearch = (event) => {
    // Check if Enter key was pressed and search term is not empty
    if (event.key === 'Enter' && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false); // Close search bar after search
    }
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="flex items-center space-x-2 flex-shrink-0"> {/* Added flex-shrink-0 */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </Link>
      </div>

      {/* Links (No changes here) */}
      <ul className="hidden md:flex flex-grow justify-center space-x-8 font-medium text-black relative mx-4"> {/* Added hidden md:flex flex-grow justify-center mx-4 */}
        <li>
          <Link
            to="/"
            className="hover:text-[#1228e1] cursor-pointer transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li className="relative group cursor-pointer">
          <div className="flex items-center space-x-1 hover:text-[#1228e1] transition-colors duration-200">
            <Link to="/products">Products</Link>
            <ChevronDown size={16} />
          </div>
          <ul className="absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
            {/* Dropdown items */}
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/products/plumbing-piping">Plumbing & Piping</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/products/electrical">Electrical</Link>
            </li>
            {/* ... other dropdown items ... */}
             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/products/carpentry">Carpentry</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/products/steel">Steel</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/products/glues">Glues</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/products/paints">Paints</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/products/gas">Gas</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/products/curtains">Curtains</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/products/cement">Cement</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/products/home-equipment">Home Equipment</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            to="/posts"
            className="hover:text-[#1228e1] cursor-pointer transition-colors duration-200"
          >
            Posts
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:text-[#1228e1] cursor-pointer transition-colors duration-200"
          >
            Contact Us
          </Link>
        </li>
      </ul>

      {/* Icons & Search */}
      <div className="flex space-x-4 text-black relative items-center flex-shrink-0"> {/* Adjusted spacing, added flex-shrink-0 */}

        {/* --- Conditionally Render Search Input --- */}
        {isSearchOpen && (
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 flex items-center bg-white border border-gray-300 rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // 5. Update search term
              onKeyDown={handleSearch} // 7. Handle Enter key press
              className="px-3 py-1.5 text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#1228e1] focus:border-[#1228e1]"
              autoFocus // Automatically focus the input when it appears
            />
            <button
               onClick={toggleSearch} // Button to close the search
               className="p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
               aria-label="Close search"
             >
               <X size={18} />
             </button>
          </div>
        )}

        {/* --- Icons --- */}
        {/* 3. Search Icon Click Handler */}
        <button
           onClick={toggleSearch}
           className="p-1 hover:text-[#1228e1] transition-colors duration-200 focus:outline-none"
           aria-label="Toggle search"
         >
           <Search className="w-5 h-5" />
         </button>

        {/* Cart Icon */}
        <div className="relative">
          <button
            onClick={toggleCart}
            className="relative p-1 hover:text-[#1228e1] transition-colors duration-200 focus:outline-none"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-[#1228e1] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;