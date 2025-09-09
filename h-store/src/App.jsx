import CompanyLogos from "./components/common/CompanyLogos";
import FeaturedProducts from "./components/common/FeaturedProducts";
import FlexSlider from "./components/common/FlexSlider";
import FloatingActions from "./components/common/FloatingActions";
import Footer from "./components/navigation/Footer";
import { FootprintsIcon } from "lucide-react";
import InfoSection from "./components/common/InfoSection";
import LatestProducts from "./components/common/LatestsProducts";
import Navbar from "./components/navigation/Navbar";
import React from "react";
import ThreeColumnSection from "./components/common/ThreeColumnSection";
import TopBar from "./components/navigation/Topbar";

const App = () => {
  return (
    <div>
      <TopBar />
      <Navbar />
      <FlexSlider id="flexslider" />
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

export default App;
