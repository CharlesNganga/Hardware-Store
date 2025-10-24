import React, { useEffect, useState } from "react";
// 2. Import searchProducts from services (ensure it exists or add it)
import { getAllProducts, getCategories, getProductsByCategory, searchProducts } from "../api/services";
// 1. Import useSearchParams
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

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
  // 3. Get searchParams and read the 'search' query
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search'); // Get the search term from URL

  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategory || null);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true); // Renamed for clarity
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState("All Products"); // State for the title

  // Fetch categories (no changes here)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await getCategories();
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
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // 4. Update useEffect to handle search term
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        setError(null); // Clear previous errors
        setSelectedSubcategory(subcategory || null); // Keep track of category selection

        let data;
        let title = "All Products"; // Default title

        if (searchTerm) {
          // --- If search term exists ---
          console.log(`Searching for: ${searchTerm}`);
          data = await searchProducts(searchTerm); // Use searchProducts
          title = `Search results for: "${searchTerm}"`;
          setSelectedSubcategory(null); // Clear category when searching
        } else if (subcategory) {
          // --- If subcategory exists ---
          console.log(`Fetching category: ${subcategory}`);
          data = await getProductsByCategory(subcategory);
          // Find category name for title
          const currentCategory = subcategories.find(cat => cat.slug === subcategory);
          title = currentCategory ? currentCategory.name : subcategory.replace(/-/g, " ");
        } else {
          // --- Otherwise, fetch all ---
          console.log('Fetching all products');
          data = await getAllProducts();
        }

        const productsArray = Array.isArray(data)
          ? data
          : (data.results && Array.isArray(data.results))
          ? data.results
          : [];

        setProducts(productsArray);
        setPageTitle(title); // Set the dynamic title

      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setProducts([]); // Clear products on error
        setPageTitle("Error loading products"); // Update title on error
      } finally {
        setProductsLoading(false);
      }
    };

    // Trigger fetch only after categories might have loaded (for title generation)
    if (!categoriesLoading) {
        fetchProducts();
    }
    // 5. Add searchTerm and subcategories (for title) to dependency array
  }, [subcategory, searchTerm, categoriesLoading, subcategories]);

  // Handle subcategory selection (no changes here)
  const handleSelectSubcategory = (slug) => {
    navigate(`/products/${slug}`); // Clears search params automatically
  };

  return (
    <div>
      <TopBar />
      <Navbar />
      {/* 6. Conditionally render ProductsHero or hide/adjust based on search */}
      {/* Option A: Hide Hero during search */}
      {/* {!searchTerm && <ProductsHero selectedSubcategory={selectedSubcategory} />} */}
      {/* Option B: Modify Hero to show search term (requires changing ProductsHero component) */}
      <ProductsHero selectedSubcategory={selectedSubcategory} searchTerm={searchTerm} />

      {/* Categories Section (Only show if not searching) */}
      {!searchTerm && (
        <>
          {categoriesLoading ? (
            <div className="w-full my-6 px-4 sm:px-6 lg:px-8"> Loading categories...</div>
          ) : error && subcategories.length === 0 ? ( // Check if error is specifically for categories
            <div className="w-full my-6 px-4 sm:px-6 lg:px-8 text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : subcategories.length > 0 ? (
            <SubcategoriesSection
              subcategories={subcategories}
              onSelect={handleSelectSubcategory}
            />
          ) : (
            <div className="w-full my-6 px-4 sm:px-6 lg:px-8 text-center py-12">
              <p className="text-gray-500">No categories available</p>
            </div>
          )}
        </>
      )}


      {/* Products Grid Section */}
      <div className="w-full my-6 px-4 sm:px-6 lg:px-8">
        {/* 7. Display dynamic title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 relative inline-block capitalize">
            {pageTitle}
            <span className="block w-16 h-1 bg-[#1228e1] mt-1 rounded"></span>
        </h2>

        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-64 rounded"></div>
            ))}
          </div>
        ) : error && products.length === 0 ? ( // Show product loading error
           <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
            </div>
        ) : products.length === 0 ? (
           <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
           </div>
        ) : (
          <ProductsGrid
            products={products}
            // Pass the title or relevant context instead of selectedCategory slug
            selectedCategory={searchTerm ? `search: ${searchTerm}` : subcategory || "all"}
          />
        )}
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Products;