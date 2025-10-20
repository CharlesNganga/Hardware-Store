from rest_framework import serializers
from .models import Category, Product, Slide, CompanyInfo, CompanyLogo


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model
    Returns: id, name, slug, image
    """
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image']


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for Product model
    Includes category details and all product information
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    
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


class ProductListSerializer(serializers.ModelSerializer):
    """
    Lighter serializer for product lists (without full details)
    Used for grid views to reduce payload size
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'company',
            'price',
            'thumbnail',
            'category_name',
            'is_featured',
            'is_bestseller',
        ]


class SlideSerializer(serializers.ModelSerializer):
    """
    Serializer for Slide model (Homepage Hero Slider)
    """
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
    Serializer for Company Logos (scrolling section)
    """
    class Meta:
        model = CompanyLogo
        fields = ['id', 'name', 'logo', 'order']