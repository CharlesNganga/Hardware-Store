from rest_framework import serializers
from .models import Category, Product, Slide, CompanyInfo, CompanyLogo


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model
    Returns: id, name, slug, image
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
    Serializer for Product model
    Includes category details and all product information
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    
    # Return full URLs for images
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
    Lighter serializer for product lists (without full details)
    Used for grid views to reduce payload size
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
    Serializer for Slide model (Homepage Hero Slider)
    """
    # Return full URL for image
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
    Serializer for Company Logos (scrolling section)
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