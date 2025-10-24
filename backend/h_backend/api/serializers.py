from rest_framework import serializers
from .models import Category, Product, Slide, CompanyInfo, CompanyLogo, Cart, CartItem


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model
    """
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image']
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ProductSerializer(serializers.ModelSerializer):
    """
    Full Product serializer with category details
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    
    thumbnail = serializers.SerializerMethodField()
    image_1 = serializers.SerializerMethodField()
    image_2 = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'company',
            'price',
            'description',
            'thumbnail',
            'image_1',
            'image_2',
            'category',
            'category_name',
            'category_slug',
            'is_featured',
            'is_bestseller',
            'is_active',
            'created_at',
        ]
    
    def get_thumbnail(self, obj):
        return self._get_image_url(obj.thumbnail)
    
    def get_image_1(self, obj):
        return self._get_image_url(obj.image_1)
    
    def get_image_2(self, obj):
        return self._get_image_url(obj.image_2)
    
    def _get_image_url(self, image_field):
        request = self.context.get('request')
        if image_field and hasattr(image_field, 'url'):
            if request is not None:
                return request.build_absolute_uri(image_field.url)
            return image_field.url
        return None


class ProductListSerializer(serializers.ModelSerializer):
    """
    Lighter serializer for product lists
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    thumbnail = serializers.SerializerMethodField()
    image_1 = serializers.SerializerMethodField()
    image_2 = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'company',
            'price',
            'description',
            'thumbnail',
            'image_1',
            'image_2',
            'category_name',
            'category_slug',
            'is_featured',
            'is_bestseller',
        ]
    
    def get_thumbnail(self, obj):
        request = self.context.get('request')
        if obj.thumbnail and hasattr(obj.thumbnail, 'url'):
            if request is not None:
                return request.build_absolute_uri(obj.thumbnail.url)
            return obj.thumbnail.url
        return None
    
    def get_image_1(self, obj):
        request = self.context.get('request')
        if obj.image_1 and hasattr(obj.image_1, 'url'):
            if request is not None:
                return request.build_absolute_uri(obj.image_1.url)
            return obj.image_1.url
        return None
    
    def get_image_2(self, obj):
        request = self.context.get('request')
        if obj.image_2 and hasattr(obj.image_2, 'url'):
            if request is not None:
                return request.build_absolute_uri(obj.image_2.url)
            return obj.image_2.url
        return None


class SlideSerializer(serializers.ModelSerializer):
    """
    Serializer for Slide model
    """
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Slide
        fields = [
            'id',
            'title',
            'subtitle',
            'title_span',
            'button_text',
            'link',
            'image',
            'order',
        ]
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class CompanyInfoSerializer(serializers.ModelSerializer):
    """
    Serializer for Company Information
    """
    class Meta:
        model = CompanyInfo
        fields = [
            'phone',
            'email',
            'address',
            'whatsapp_number',
            'whatsapp_default_message',
            'instagram_url',
            'facebook_url',
            'tiktok_url',
        ]


class CompanyLogoSerializer(serializers.ModelSerializer):
    """
    Serializer for Company Logos
    """
    logo = serializers.SerializerMethodField()
    
    class Meta:
        model = CompanyLogo
        fields = ['id', 'name', 'logo', 'order']
    
    def get_logo(self, obj):
        request = self.context.get('request')
        if obj.logo and hasattr(obj.logo, 'url'):
            if request is not None:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None


# ============================================
# NEW CART SERIALIZERS
# ============================================

class CartItemSerializer(serializers.ModelSerializer):
    """
    Serializer for CartItem - includes full product details
    """
    # Nest the full product information
    product = ProductListSerializer(read_only=True)
    
    # Add calculated field for total price of this item
    total_item_price = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = [
            'id',
            'product',
            'quantity',
            'total_item_price',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_total_item_price(self, obj):
        """Calculate quantity * price for this cart item"""
        return float(obj.total_price)


class CartSerializer(serializers.ModelSerializer):
    """
    Serializer for Cart - includes all cart items and totals
    """
    # Nest all cart items with full details
    items = CartItemSerializer(many=True, read_only=True)
    
    # Calculated fields for cart summary
    item_count = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = [
            'id',
            'session_key',
            'items',
            'item_count',
            'total_price',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'session_key', 'created_at', 'updated_at']
    
    def get_item_count(self, obj):
        """Sum of all quantities in cart"""
        return obj.item_count
    
    def get_total_price(self, obj):
        """Total price of all items in cart"""
        return float(obj.total_price)