import { FaWhatsapp } from "react-icons/fa";
import React from "react";

const FloatingWhatsApp = ({ phoneNumber, message }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center border border-gray-300 rounded-full shadow-lg px-3 py-2 bg-white hover:bg-[#25D366] hover:text-white transition-colors duration-300"
      title="Chat with us on WhatsApp"
    >
      {/* Icon on the left */}
      <FaWhatsapp className="w-6 h-6 mr-2 transition-colors duration-300" />

      {/* Text */}
      <span className="font-semibold text-sm">Chat Us on WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsApp;
