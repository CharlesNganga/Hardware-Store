import React, { useEffect, useState } from "react";

import { ArrowUpCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingActions = ({ phoneNumber = "254700000000", message = "Hello!" }) => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 items-end">
      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center border border-gray-300 rounded-full shadow-lg px-3 py-2 text-white bg-[#25D366] hover:bg-[#25D366] hover:text-black transition-colors duration-300"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6 mr-2 transition-colors duration-300" />
        <span className="font-semibold text-sm">Chat Us on WhatsApp</span>
      </a>

      {/* Back to Top Button */}
      <div
        className={`transform transition-all duration-500 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center w-12 h-12 bg-[#1228e1] text-white rounded-full shadow-lg hover:bg-blue-700 transition"
          title="Back to top"
        >
          <ArrowUpCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FloatingActions;
