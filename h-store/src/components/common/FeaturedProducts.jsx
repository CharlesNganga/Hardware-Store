import React from "react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      title: "Cement",
      offer: "Up to 20% Off",
      image: "", // No image yet
      link: "/categories/cement",
    },
    {
      id: 2,
      title: "PPR Pipes & Fittings",
      offer: "Up to 15% Off",
      image: "",
      link: "/categories/plumbing-piping",
    },
    {
      id: 3,
      title: "Mabati Roofing Sheets",
      offer: "Up to 10% Off",
      image: "",
      link: "/categories/steel",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <a
            key={product.id}
            href={product.link}
            className="relative group overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
          >
            {/* Background placeholder with black */}
            <div className="w-[85%] mx-auto aspect-[4/5] bg-black">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:opacity-90 transition duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  Image Coming Soon
                </div>
              )}
            </div>

            {/* Overlay text */}
            <div className="absolute inset-0 flex flex-col items-center px-4 pt-4">
              <p className="text-xs sm:text-sm font-semibold uppercase text-white bg-[#1228e1] px-2 py-1 mb-2">
                {product.offer}
              </p>
              <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
                {product.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
