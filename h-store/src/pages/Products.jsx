import Footer from "../components/navigation/Footer";
import LatestProducts from "../components/common/LatestsProducts";
import Navbar from "../components/navigation/Navbar";
// src/pages/Products.jsx
import React from "react";

const Products = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
        <LatestProducts /> {/* Or any other products layout */}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
