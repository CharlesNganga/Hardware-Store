import React, { useEffect, useState } from "react";
import { getAllProducts, getCategories, getProductsByCategory } from "../api/services";
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
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        // Handle both array and paginated response
        const categoriesArray = Array.isArray(data) 
          ? data 
          : (data.results && Array.isArray(data.results)) 
          ? data.results 
          : [];
        setSubcategories(categoriesArray);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when subcategory changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        setSelectedSubcategory(subcategory || null);

        let data;
        if (subcategory) {
          data = await getProductsByCategory(subcategory);
        } else {
          data = await getAllProducts();
        }

        // Handle both array and paginated response
        const productsArray = Array.isArray(data)
          ? data
          : (data.results && Array.isArray(data.results))
          ? data.results
          : [];

        setProducts(productsArray);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [subcategory]);

  // Handle subcategory selection
  const handleSelectSubcategory = (slug) => {
    navigate(`/products/${slug}`);
  };

  return (
    <div>
      <TopBar />
      <Navbar />
      <ProductsHero selectedSubcategory={selectedSubcategory} />
      
      {/* Loading State for Categories */}
      {loading ? (
        <div className="w-full my-6 px-4 sm:px-6 lg:px-8">
          <div className="h-32 bg-gray-200 animate-pulse rounded"></div>
        </div>
      ) : error ? (
        <div className="w-full my-6 px-4 sm:px-6 lg:px-8 text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : subcategories.length === 0 ? (
        <div className="w-full my-6 px-4 sm:px-6 lg:px-8 text-center py-12">
          <p className="text-gray-500">No categories available</p>
        </div>
      ) : (
        <SubcategoriesSection
          subcategories={subcategories}
          onSelect={handleSelectSubcategory}
        />
      )}

      {/* Products Grid with Loading/Error States */}
      {productsLoading ? (
        <div className="w-full my-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-64 rounded"></div>
            ))}
          </div>
        </div>
      ) : (
        <ProductsGrid 
          products={products} 
          selectedCategory={subcategory || "all"} 
        />
      )}

      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Products;