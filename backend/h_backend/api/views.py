from rest_framework import generics, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product, Slide, CompanyInfo, CompanyLogo, Cart, CartItem
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    ProductListSerializer,
    SlideSerializer,
    CompanyInfoSerializer,
    CompanyLogoSerializer,
    CartSerializer,
    CartItemSerializer,
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
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class CompanyInfoView(APIView):
    """
    GET /api/company-info/
    Returns company contact information and social media links
    """
    def get(self, request):
        company_info = CompanyInfo.load()
        serializer = CompanyInfoSerializer(company_info)
        return Response(serializer.data)


class CompanyLogoListView(generics.ListAPIView):
    """
    GET /api/company-logos/
    Returns all active company/partner logos for scrolling section
    """
    queryset = CompanyLogo.objects.filter(is_active=True)
    serializer_class = CompanyLogoSerializer


# ============================================
# NEW CART VIEW (PUBLIC - NO AUTHENTICATION)
# ============================================

class CartView(APIView):
    """
    Unified Cart View handling all cart operations
    PUBLIC - No authentication required
    
    GET    /api/cart/           - Get current cart
    POST   /api/cart/           - Add item to cart
    PUT    /api/cart/           - Update item quantity
    DELETE /api/cart/           - Remove item from cart
    """
    
    # No authentication required - this is a public endpoint
    authentication_classes = []
    permission_classes = []
    
    def _get_cart(self, request):
        """
        Private helper method to get or create cart for current session.
        Ensures session exists and returns the associated cart.
        """
        # Ensure session exists and get session key
        if not request.session.session_key:
            request.session.create()
        
        session_key = request.session.session_key
        
        # Get or create cart for this session
        cart, created = Cart.objects.get_or_create(session_key=session_key)
        
        return cart
    
    def get(self, request):
        """
        GET /api/cart/
        Returns the current cart with all items
        """
        try:
            cart = self._get_cart(request)
            serializer = CartSerializer(cart, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def post(self, request):
        """
        POST /api/cart/
        Add item to cart or increase quantity if already exists
        
        Body: {
            "product_id": 1,
            "quantity": 2  (optional, defaults to 1)
        }
        """
        try:
            # Get data from request
            product_id = request.data.get('product_id')
            quantity = request.data.get('quantity', 1)
            
            # Validation
            if not product_id:
                return Response(
                    {'error': 'product_id is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            try:
                quantity = int(quantity)
                if quantity < 1:
                    raise ValueError
            except (ValueError, TypeError):
                return Response(
                    {'error': 'quantity must be a positive integer'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check if product exists
            try:
                product = Product.objects.get(id=product_id, is_active=True)
            except Product.DoesNotExist:
                return Response(
                    {'error': 'Product not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Get or create cart
            cart = self._get_cart(request)
            
            # Get or create cart item
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product,
                defaults={'quantity': quantity}
            )
            
            # If item already exists, increase quantity
            if not created:
                cart_item.quantity += quantity
                cart_item.save()
            
            # Return updated cart
            serializer = CartSerializer(cart, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def put(self, request):
        """
        PUT /api/cart/
        Update quantity of specific cart item
        
        Body: {
            "item_id": 1,
            "quantity": 3
        }
        
        If quantity is 0, item will be deleted
        """
        try:
            # Get data from request
            item_id = request.data.get('item_id')
            quantity = request.data.get('quantity')
            
            # Validation
            if not item_id:
                return Response(
                    {'error': 'item_id is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if quantity is None:
                return Response(
                    {'error': 'quantity is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            try:
                quantity = int(quantity)
                if quantity < 0:
                    raise ValueError
            except (ValueError, TypeError):
                return Response(
                    {'error': 'quantity must be a non-negative integer'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get cart
            cart = self._get_cart(request)
            
            # Find cart item
            try:
                cart_item = CartItem.objects.get(id=item_id, cart=cart)
            except CartItem.DoesNotExist:
                return Response(
                    {'error': 'Cart item not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Update or delete based on quantity
            if quantity == 0:
                cart_item.delete()
            else:
                cart_item.quantity = quantity
                cart_item.save()
            
            # Return updated cart
            serializer = CartSerializer(cart, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def delete(self, request):
        """
        DELETE /api/cart/
        Remove specific item from cart
        
        Body: {
            "item_id": 1
        }
        """
        try:
            # Get data from request
            item_id = request.data.get('item_id')
            
            # Validation
            if not item_id:
                return Response(
                    {'error': 'item_id is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get cart
            cart = self._get_cart(request)
            
            # Find and delete cart item
            try:
                cart_item = CartItem.objects.get(id=item_id, cart=cart)
                cart_item.delete()
            except CartItem.DoesNotExist:
                return Response(
                    {'error': 'Cart item not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Return updated cart
            serializer = CartSerializer(cart, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )