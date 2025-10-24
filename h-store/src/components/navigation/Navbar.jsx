// src/components/navigation/Navbar.jsx
import { ChevronDown, Search, ShoppingCart } from "lucide-react"; // Heart and User removed

import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import React from "react";
import { useCart } from "../../components/cart/CartContext"; // 1. Import useCart

const Navbar = () => {
  // 2. Get itemCount and toggleCart from context
  const { itemCount, toggleCart } = useCart();

  // favCount removed

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </Link>
      </div>

      {/* Links (No changes here) */}
      <ul className="flex space-x-8 font-medium text-black relative">
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

      {/* Icons */}
      <div className="flex space-x-6 text-black relative items-center"> {/* Added items-center */}
        <Search className="w-5 h-5 cursor-pointer hover:text-[#1228e1] transition-colors duration-200" />
        
        {/* 3. User icon removed */}
        {/* 3. Favorites icon removed */}

        {/* 4. Cart with badge and click handler */}
        <div className="relative">
           {/* Wrap icon in a button for accessibility */}
          <button
            onClick={toggleCart} // 5. Call toggleCart on click
            className="relative hover:text-[#1228e1] transition-colors duration-200 focus:outline-none" // Added focus style
            aria-label={`Shopping cart with ${itemCount} items`} // Accessibility label
          >
            <ShoppingCart className="w-5 h-5" />
             {/* Dynamic badge count */}
            <span className="absolute -top-2 -right-2 bg-[#1228e1] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount} {/* 6. Use itemCount from context */}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;