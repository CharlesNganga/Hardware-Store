import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FloatingActions from "../components/common/FloatingActions";
import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import ProductsGrid from "../components/common/ProductsGrid";
import ProductsHero from "../components/common/ProductsHero";
import SubcategoriesSection from "../components/common/SubcategoriesSection";
import TopBar from "../components/navigation/Topbar";

const Products = () => {
  const { subcategory } = useParams();
  const navigate = useNavigate();

  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategory || null);
  const [products, setProducts] = useState([]);

  const subcategories = [
    { id: 1, name: "Plumbing & Piping", slug: "plumbing-piping" },
    { id: 2, name: "Electrical", slug: "electrical" },
    { id: 3, name: "Carpentry", slug: "carpentry" },
    { id: 4, name: "Steel", slug: "steel" },
    { id: 5, name: "Glues", slug: "glues" },
    { id: 6, name: "Paints", slug: "paints" },
    { id: 7, name: "Gas", slug: "gas" },
    { id: 8, name: "Curtains", slug: "curtains" },
    { id: 9, name: "Cement", slug: "cement" },
    { id: 10, name: "Home Equipment", slug: "home-equipment" },
  ];

  // Update state when URL changes
  useEffect(() => {
    setSelectedSubcategory(subcategory || null);

    // const allProducts = [
    //   { id: 1, name: "Pipe 1", company: "A Co", price: 500, category: "plumbing-piping" },
    //   { id: 2, name: "Wire 1", company: "B Co", price: 300, category: "electrical" },
    //   { id: 3, name: "Hammer", company: "C Co", price: 800, category: "carpentry" },
    //   { id: 4, name: "Steel Sheet", company: "D Co", price: 1200, category: "steel" },
    // ];
    const allProducts=[{id:1,name:"Pipe 1",company:"A Co",price:500,category:"plumbing-piping"},{id:2,name:"Wire 1",company:"B Co",price:300,category:"electrical"},{id:3,name:"Hammer",company:"C Co",price:800,category:"carpentry"},{id:4,name:"Steel Sheet",company:"D Co",price:1200,category:"steel"},{id:5,name:"Glue 1",company:"E Co",price:150,category:"glues"},{id:6,name:"Paint Brush",company:"F Co",price:250,category:"paints"},{id:7,name:"Gas Cylinder",company:"G Co",price:3500,category:"gas"},{id:8,name:"Curtain Set",company:"H Co",price:1200,category:"curtains"},{id:9,name:"Cement Bag",company:"I Co",price:700,category:"cement"},{id:10,name:"Drill Machine",company:"J Co",price:1500,category:"home-equipment"},{id:11,name:"Pipe 2",company:"A Co",price:550,category:"plumbing-piping"},{id:12,name:"Wire 2",company:"B Co",price:320,category:"electrical"},{id:13,name:"Hammer 2",company:"C Co",price:850,category:"carpentry"},{id:14,name:"Steel Rod",company:"D Co",price:1300,category:"steel"},{id:15,name:"Glue 2",company:"E Co",price:180,category:"glues"},{id:16,name:"Paint Roller",company:"F Co",price:300,category:"paints"},{id:17,name:"Gas Stove",company:"G Co",price:4500,category:"gas"},{id:18,name:"Curtain Rod",company:"H Co",price:400,category:"curtains"},{id:19,name:"Cement Sack",company:"I Co",price:750,category:"cement"},{id:20,name:"Blender",company:"J Co",price:2000,category:"home-equipment"},{id:21,name:"Pipe 3",company:"A Co",price:600,category:"plumbing-piping"},{id:22,name:"Wire 3",company:"B Co",price:350,category:"electrical"},{id:23,name:"Saw",company:"C Co",price:900,category:"carpentry"},{id:24,name:"Steel Beam",company:"D Co",price:1400,category:"steel"},{id:25,name:"Glue 3",company:"E Co",price:200,category:"glues"},{id:26,name:"Paint Can",company:"F Co",price:400,category:"paints"},{id:27,name:"Gas Regulator",company:"G Co",price:1500,category:"gas"},{id:28,name:"Curtain Fabric",company:"H Co",price:900,category:"curtains"},{id:29,name:"Cement Mix",company:"I Co",price:800,category:"cement"},{id:30,name:"Toaster",company:"J Co",price:1200,category:"home-equipment"},{id:31,name:"Pipe 4",company:"A Co",price:650,category:"plumbing-piping"},{id:32,name:"Wire 4",company:"B Co",price:370,category:"electrical"},{id:33,name:"Chisel",company:"C Co",price:950,category:"carpentry"},{id:34,name:"Steel Panel",company:"D Co",price:1500,category:"steel"},{id:35,name:"Glue 4",company:"E Co",price:220,category:"glues"},{id:36,name:"Paint Tray",company:"F Co",price:350,category:"paints"},{id:37,name:"Gas Pipe",company:"G Co",price:1200,category:"gas"},{id:38,name:"Curtain Hook",company:"H Co",price:150,category:"curtains"},{id:39,name:"Cement Mixer",company:"I Co",price:3000,category:"cement"},{id:40,name:"Microwave",company:"J Co",price:4000,category:"home-equipment"}];


    if (subcategory) {
      setProducts(allProducts.filter(p => p.category === subcategory));
    } else {
      setProducts(allProducts);
    }
  }, [subcategory]);

  // Clicking a subcategory updates state & URL
  const handleSelectSubcategory = (slug) => {
    navigate(`/products/${slug}`);
  };

  return (
    <div>
      <TopBar />
      <Navbar />
      <ProductsHero selectedSubcategory={selectedSubcategory} />
      <SubcategoriesSection
        subcategories={subcategories}
        onSelect={handleSelectSubcategory}
      />
      <ProductsGrid products={products} />
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Products;
