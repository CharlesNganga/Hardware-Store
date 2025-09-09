import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 pt-10 pb-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Product Categories */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase">Product Categories</h3>
          <ul className="space-y-2">
            <li><a href="/categories/plumbing-piping" className="hover:text-[#1228e1]">Plumbing & Piping</a></li>
            <li><a href="/categories/electrical" className="hover:text-[#1228e1]">Electrical</a></li>
            <li><a href="/categories/carpentry" className="hover:text-[#1228e1]">Carpentry</a></li>
            <li><a href="/categories/steel" className="hover:text-[#1228e1]">Steel</a></li>
            <li><a href="/categories/glues" className="hover:text-[#1228e1]">Glues</a></li>
            <li><a href="/categories/paints" className="hover:text-[#1228e1]">Paints</a></li>
            <li><a href="/categories/gas" className="hover:text-[#1228e1]">Gas</a></li>
            <li><a href="/categories/curtains" className="hover:text-[#1228e1]">Curtains</a></li>
            <li><a href="/categories/cement" className="hover:text-[#1228e1]">Cement</a></li>
            <li><a href="/categories/home-equipment" className="hover:text-[#1228e1]">Home Equipment</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span>123 Hardware St, Nairobi, Kenya</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-600" />
              <span>info@hardwarestore.co.ke</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-600" />
              <span>+254 700 123456</span>
            </li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase">My Account</h3>
          <ul className="space-y-2">
            <li><a href="/signin" className="hover:text-[#1228e1]">Sign In</a></li>
            <li><a href="/order-tracking" className="hover:text-[#1228e1]">Order Tracking</a></li>
            <li><a href="/create-account" className="hover:text-[#1228e1]">Create Account</a></li>
          </ul>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-10 flex justify-center space-x-6">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#1228e1] transition">
          <FaInstagram className="w-6 h-6" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#1228e1] transition">
          <FaTiktok className="w-6 h-6" />
        </a>
        <a href="https://wa.me/254700123456" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#1228e1] transition">
          <FaWhatsapp className="w-6 h-6" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#1228e1] transition">
          <FaFacebook className="w-6 h-6" />
        </a>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Hardware Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
