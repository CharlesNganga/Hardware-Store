import React from "react";

const CompanyLogos = () => {
  const logos = Array.from({ length: 6 }, (_, i) => i + 1); // placeholder logos

  return (
    <div className="w-full my-32">
      {/* Top Divider */}
      <hr className="border-gray-300 mb-6" />

      {/* Logos Container */}
      <div className="overflow-hidden relative flex items-center">
        <div className="flex animate-scroll gap-8">
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-40 h-20 bg-black flex items-center justify-center"
            >
              <span className="text-white font-bold">{logo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Divider */}
      <hr className="border-gray-300 mt-6" />

      {/* Scroll Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CompanyLogos;
