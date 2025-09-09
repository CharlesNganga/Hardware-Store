import { ChevronUp, Whatsapp } from "lucide-react";
import React, { useEffect, useState } from "react";

const FloatingButtons = () => {
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsBackToTopVisible(true);
      } else {
        setIsBackToTopVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed left-6 bottom-6 flex flex-col items-center gap-4 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/254700000000"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-500 transition-colors duration-300"
      >
        <Whatsapp className="w-5 h-5" />
        <span className="text-sm font-medium">Chat Us on WhatsApp</span>
      </a>

      {/* Back to Top Button */}
      {isBackToTopVisible && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 flex items-center justify-center bg-[#1228e1] text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
          title="Back to Top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;
