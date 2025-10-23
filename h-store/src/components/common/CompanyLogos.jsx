import React, { useEffect, useState } from "react";

import { getCompanyLogos } from "../../api/services";

const CompanyLogos = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        const data = await getCompanyLogos();
        setLogos(Array.isArray(data) ? data : data.results || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching company logos:", err);
        setError("Failed to load company logos");
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  return (
    <div className="w-full my-32">
      {/* Top Divider */}
      <hr className="border-gray-300 mb-6" />

      {/* Logos Container */}
      <div className="overflow-hidden relative flex items-center">
        {loading ? (
          <div className="flex gap-8 w-full justify-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 h-20 bg-gray-200 animate-pulse rounded"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center w-full text-red-500 py-6">{error}</div>
        ) : logos.length === 0 ? (
          <div className="text-center w-full text-gray-500 py-6">
            No company logos available.
          </div>
        ) : (
          <div className="flex animate-scroll gap-8">
            {logos.concat(logos).map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-20 bg-white shadow flex items-center justify-center rounded"
              >
                {logo.logo ? (
                  <img
                    src={logo.logo}
                    alt={logo.name || `Logo ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-gray-500 text-sm font-semibold">
                    {logo.name || "No Logo"}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
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
