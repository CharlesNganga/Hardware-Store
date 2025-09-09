import CompanyLogos from "../components/common/CompanyLogos";
import FeaturedProducts from "../components/common/FeaturedProducts";
import FlexSlider from "../components/common/FlexSlider";
import FloatingActions from "../components/common/FloatingActions";
import Footer from "../components/navigation/Footer";
import InfoSection from "../components/common/InfoSection";
import LatestProducts from "../components/common/LatestsProducts";
import Navbar from "../components/navigation/Navbar";
// src/pages/Home.jsx
import React from "react";
import ThreeColumnSection from "../components/common/ThreeColumnSection";
import TopBar from "../components/navigation/Topbar";

const Home = () => {
  return (
    <div>
      <TopBar />
      <Navbar />
      <FlexSlider />
      <FloatingActions />
      <FeaturedProducts />
      <LatestProducts />
      <InfoSection />
      <ThreeColumnSection />
      <CompanyLogos />
      <Footer />
    </div>
  );
};

export default Home;
