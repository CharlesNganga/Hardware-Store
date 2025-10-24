import React, { useEffect, useState } from "react";

import { getCompanyInfo } from "../../api/services";

const TopBar = () => {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const data = await getCompanyInfo();
        setCompanyInfo(data);
      } catch (err) {
        console.error("Error fetching company info:", err);
      }
    };

    fetchCompanyInfo();
  }, []);

  return (
    <div className="w-full bg-[#1228e1] text-white text-sm px-6 py-2 flex items-center justify-between">
      {/* Left message */}
      <p>We do delivery across the country</p>

      {/* Contact info */}
      <div className="flex space-x-6">
        {companyInfo ? (
          <>
            <a 
              href={`mailto:${companyInfo.email}`} 
              className="hover:underline"
            >
              {companyInfo.email}
            </a>
            <a 
              href={`tel:${companyInfo.phone}`} 
              className="hover:underline"
            >
              {companyInfo.phone}
            </a>
          </>
        ) : (
          <span className="text-white/80">Loading...</span>
        )}
      </div>
    </div>
  );
};

export default TopBar;