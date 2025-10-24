// src/components/navigation/Navbar.jsx
import { ChevronDown, Menu, Search, ShoppingCart, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react"; // Import useEffect

import Logo from "../../assets/Logo.png";
import { getCategories } from "../../api/services"; // 1. Import getCategories
import { useCart } from "../../components/cart/CartContext";

const Navbar = () => {
  const { itemCount, toggleCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // --- State for Categories ---
  const [categories, setCategories] = useState([]); // 2. Add state for categories
  const [categoryError, setCategoryError] = useState(null); // Optional: state for error handling

  // --- Fetch Categories ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryError(null); // Clear previous errors
        const data = await getCategories();
        // Handle potential pagination or direct array response
        const categoriesArray = Array.isArray(data)
          ? data
          : data?.results && Array.isArray(data.results)
          ? data.results
          : [];
        setCategories(categoriesArray);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategoryError("Could not load categories."); // Set error message
        setCategories([]); // Ensure categories is an empty array on error
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means run once on mount

  // --- Event Handlers (no changes needed) ---
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMobileMenuOpen(false);
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-md px-4 sm:px-6 py-3 relative z-40">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Link to="/" onClick={closeMobileMenu}>
            <img src={Logo} alt="Logo" className="h-10 sm:h-12 w-auto" />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex flex-grow justify-center space-x-8 font-medium text-black relative mx-4">
          <li><Link to="/" className="hover:text-[#1228e1] transition-colors duration-200">Home</Link></li>
          <li className="relative group cursor-pointer">
            <div className="flex items-center space-x-1 hover:text-[#1228e1] transition-colors duration-200">
              <Link to="/products">Products</Link>
              <ChevronDown size={16} />
            </div>
            {/* 3. Dynamic Desktop Dropdown */}
            <ul className="absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 max-h-96 overflow-y-auto"> {/* Added max-height & overflow */}
              {categoryError ? (
                 <li className="px-4 py-2 text-red-500 text-sm">{categoryError}</li>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"> {/* Added text-sm */}
                    <Link to={`/products/${category.slug}`}>{category.name}</Link>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 text-sm">Loading...</li>
              )}
            </ul>
          </li>
          <li><Link to="/contact" className="hover:text-[#1228e1] transition-colors duration-200">Contact Us</Link></li>
        </ul>

        {/* Icons & Mobile Menu Button */}
        <div className="flex space-x-3 sm:space-x-4 text-black relative items-center flex-shrink-0">
          {/* Search Input & Icons (no changes needed) */}
          {isSearchOpen && (
             <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 md:mr-4 flex items-center bg-white border border-gray-300 rounded-md shadow-sm z-40">
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleSearch} className="pl-3 pr-1 py-1.5 text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#1228e1] focus:border-[#1228e1] w-40 sm:w-auto" autoFocus />
              <button onClick={toggleSearch} className="p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none" aria-label="Close search"> <X size={18} /> </button>
            </div>
          )}
          <button onClick={toggleSearch} className="p-1 hover:text-[#1228e1] transition-colors duration-200 focus:outline-none" aria-label="Toggle search"> <Search className="w-5 h-5" /> </button>
          <div className="relative">
            <button onClick={toggleCart} className="relative p-1 hover:text-[#1228e1] transition-colors duration-200 focus:outline-none" aria-label={`Shopping cart with ${itemCount} items`}>
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#1228e1] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{itemCount}</span>
            </button>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="p-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1228e1] rounded" aria-label="Toggle main menu" aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

       {/* Mobile Menu Container */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out md:hidden z-50 ${
          isMobileMenuOpen ? 'max-h-screen border-t border-gray-200 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: isMobileMenuOpen ? 'calc(100vh - 4rem)' : '0px' }}
      >
        <ul className="flex flex-col px-4 py-4 space-y-3">
          <li><Link to="/" onClick={closeMobileMenu} className="block py-2 hover:text-[#1228e1]">Home</Link></li>
          <li><Link to="/products" onClick={closeMobileMenu} className="block py-2 hover:text-[#1228e1]">All Products</Link></li>
           {/* 4. Dynamic Mobile Menu Product Links */}
           {categoryError ? (
               <li className="pl-4 py-1 text-red-500 text-sm">{categoryError}</li>
            ) : categories.length > 0 ? (
                categories.map((category) => (
                    <li key={`mobile-${category.id}`} className="pl-4"> {/* Ensure unique key */}
                        <Link
                            to={`/products/${category.slug}`}
                            onClick={closeMobileMenu}
                            className="block py-1 text-sm text-gray-600 hover:text-[#1228e1]"
                        >
                            {category.name}
                        </Link>
                    </li>
                ))
            ) : (
                <li className="pl-4 py-1 text-gray-500 text-sm">Loading categories...</li>
            )}
          <li><Link to="/contact" onClick={closeMobileMenu} className="block py-2 hover:text-[#1228e1]">Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;