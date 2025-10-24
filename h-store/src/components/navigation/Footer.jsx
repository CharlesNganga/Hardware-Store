import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getCategories, getCompanyInfo } from "../../api/services";

const Footer = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch company info
        const info = await getCompanyInfo();
        setCompanyInfo(info);

        // Fetch categories
        const cats = await getCategories();
        setCategories(Array.isArray(cats) ? cats : cats.results || []);
      } catch (err) {
        console.error("Error fetching footer data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-white text-gray-800 pt-10 pb-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Categories */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase">Product Categories</h3>
          {categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.slice(0, 10).map((category) => (
                <li key={category.id}>
                  <a
                    href={`/products/${category.slug}`}
                    className="hover:text-[#1228e1] transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-2 text-gray-400">
              <p>Loading categories...</p>
            </div>
          )}
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase">Contact Us</h3>
          {companyInfo ? (
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-600" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="hover:text-[#1228e1] transition-colors"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-600" />
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="hover:text-[#1228e1] transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </li>
            </ul>
          ) : (
            <div className="space-y-3 text-gray-400">
              <p>Loading contact info...</p>
            </div>
          )}
        </div>

        {/* My Account */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-[#1228e1] transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-[#1228e1] transition-colors">
                All Products
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#1228e1] transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media Icons */}
      {companyInfo && (
        <div className="mt-10 flex justify-center space-x-6">
          {companyInfo.instagram_url && (
            <a
              href={companyInfo.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-[#1228e1] transition"
              title="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          )}
          {companyInfo.tiktok_url && (
            <a
              href={companyInfo.tiktok_url}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-[#1228e1] transition"
              title="TikTok"
            >
              <FaTiktok className="w-6 h-6" />
            </a>
          )}
          {companyInfo.whatsapp_number && (
            <a
              href={`https://wa.me/${companyInfo.whatsapp_number}`}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-[#1228e1] transition"
              title="WhatsApp"
            >
              <FaWhatsapp className="w-6 h-6" />
            </a>
          )}
          {companyInfo.facebook_url && (
            <a
              href={companyInfo.facebook_url}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-[#1228e1] transition"
              title="Facebook"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
          )}
        </div>
      )}

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Hardware Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;