import api from './api';

// ========================================
// Categories
// ========================================
export const getCategories = async () => {
  const response = await api.get('/categories/');
  return response.data;
};

// ========================================
// Products
// ========================================
export const getAllProducts = async (params = {}) => {
  const response = await api.get('/products/', { params });
  return response.data;
};

export const getProductsByCategory = async (categorySlug) => {
  const response = await api.get('/products/', {
    params: { category: categorySlug }
  });
  return response.data;
};

export const getProductDetail = async (productId) => {
  const response = await api.get(`/products/${productId}/`);
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/products/featured/');
  return response.data;
};

export const getLatestProducts = async () => {
  const response = await api.get('/products/latest/');
  return response.data;
};

export const getBestSellerProducts = async () => {
  const response = await api.get('/products/bestsellers/');
  return response.data;
};

export const searchProducts = async (searchTerm) => {
  const response = await api.get('/products/', {
    params: { search: searchTerm }
  });
  return response.data;
};

// ========================================
// Homepage Content
// ========================================
export const getSlides = async () => {
  const response = await api.get('/slides/');
  return response.data;
};

export const getCompanyInfo = async () => {
  const response = await api.get('/company-info/');
  return response.data;
};

export const getCompanyLogos = async () => {
  const response = await api.get('/company-logos/');
  return response.data;
};