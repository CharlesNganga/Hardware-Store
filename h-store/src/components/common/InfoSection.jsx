import { Headphones, ShieldCheck, Truck } from "lucide-react";

import React from "react";

const InfoSection = () => {
  const infoItems = [
    {
      id: 1,
      icon: Truck,
      title: "Nationwide Delivery",
      description: "Fast and reliable delivery everywhere.",
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Quality Assurance",
      description: "Trusted products with top quality.",
    },
    {
      id: 3,
      icon: Headphones,
      title: "24/7 Support",
      description: "Always available to help you.",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300">
        {infoItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-6 group"
          >
            <item.icon className="w-10 h-10 text-black transition-colors duration-300 group-hover:text-[#1228e1]" />
            <div className="flex flex-col justify-center">
              <h3 className="text-base md:text-lg font-bold uppercase text-black">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Horizontal Divider */}
      <div className="border-t border-gray-300 mt-6"></div>
    </div>
  );
};

export default InfoSection;
