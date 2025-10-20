from django.urls import path
from .views import (
    CategoryListView,
    ProductListView,
    ProductDetailView,
    FeaturedProductsView,
    LatestProductsView,
    BestSellerProductsView,
    SlideListView,
    CompanyInfoView,
    CompanyLogoListView,
)

urlpatterns = [
    # Categories
    path('categories/', CategoryListView.as_view(), name='category-list'),
    
    # Products
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/featured/', FeaturedProductsView.as_view(), name='featured-products'),
    path('products/latest/', LatestProductsView.as_view(), name='latest-products'),
    path('products/bestsellers/', BestSellerProductsView.as_view(), name='bestseller-products'),
    
    # Homepage Content
    path('slides/', SlideListView.as_view(), name='slide-list'),
    path('company-logos/', CompanyLogoListView.as_view(), name='company-logo-list'),
    path('company-info/', CompanyInfoView.as_view(), name='company-info'),
]