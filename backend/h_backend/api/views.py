from rest_framework import generics, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product, Slide, CompanyInfo, CompanyLogo
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    ProductListSerializer,
    SlideSerializer,
    CompanyInfoSerializer,
    CompanyLogoSerializer,
)


class CategoryListView(generics.ListAPIView):
    """
    GET /api/categories/
    Returns all active categories
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    """
    GET /api/products/
    GET /api/products/?category=plumbing-piping
    GET /api/products/?search=cement
    
    Returns all active products with optional filtering
    """
    serializer_class = ProductListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category__slug', 'is_featured', 'is_bestseller']
    search_fields = ['name', 'company', 'description']
    
    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True).select_related('category')
        
        # Filter by category slug if provided
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    """
    GET /api/products/<id>/
    Returns detailed information about a single product
    """
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer


class FeaturedProductsView(generics.ListAPIView):
    """
    GET /api/products/featured/
    Returns only featured products for homepage
    """
    queryset = Product.objects.filter(is_active=True, is_featured=True).select_related('category')
    serializer_class = ProductListSerializer


class LatestProductsView(generics.ListAPIView):
    """
    GET /api/products/latest/
    Returns the 8 newest products for homepage
    """
    queryset = Product.objects.filter(is_active=True).select_related('category')[:8]
    serializer_class = ProductListSerializer


class BestSellerProductsView(generics.ListAPIView):
    """
    GET /api/products/bestsellers/
    Returns best selling products for homepage
    """
    queryset = Product.objects.filter(is_active=True, is_bestseller=True).select_related('category')
    serializer_class = ProductListSerializer


class SlideListView(generics.ListAPIView):
    """
    GET /api/slides/
    Returns all active slides for the homepage hero slider
    """
    queryset = Slide.objects.filter(is_active=True)
    serializer_class = SlideSerializer


class CompanyInfoView(APIView):
    """
    GET /api/company-info/
    Returns company contact information and social media links
    """
    def get(self, request):
        company_info = CompanyInfo.load()  # Uses the singleton pattern
        serializer = CompanyInfoSerializer(company_info)
        return Response(serializer.data)


class CompanyLogoListView(generics.ListAPIView):
    """
    GET /api/company-logos/
    Returns all active company/partner logos for scrolling section
    """
    queryset = CompanyLogo.objects.filter(is_active=True)
    serializer_class = CompanyLogoSerializer