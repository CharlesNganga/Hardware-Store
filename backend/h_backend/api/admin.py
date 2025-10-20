from django.contrib import admin
from .models import Category, Product, Slide, CompanyInfo, CompanyLogo


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Admin configuration for Category model
    """
    list_display = ['name', 'slug', 'created_at']
    search_fields = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}  # Auto-generate slug from name
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'image')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)  # This section starts collapsed
        }),
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Admin configuration for Product model
    """
    list_display = ['name', 'company', 'category', 'price', 'is_featured', 'is_bestseller', 'is_active', 'created_at']
    list_filter = ['category', 'is_featured', 'is_bestseller', 'is_active', 'created_at']
    search_fields = ['name', 'company', 'description']
    list_editable = ['is_featured', 'is_bestseller', 'is_active']  # Edit these directly from list view
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'company', 'category', 'price', 'description')
        }),
        ('Images', {
            'fields': ('thumbnail', 'image_1', 'image_2'),
            'description': 'Upload product images. Thumbnail is the main image shown in product cards.'
        }),
        ('Status', {
            'fields': ('is_featured', 'is_active'),
            'description': 'Featured products appear on the homepage. Inactive products are hidden.'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    # Show 20 products per page
    list_per_page = 20


@admin.register(Slide)
class SlideAdmin(admin.ModelAdmin):
    """
    Admin configuration for Slide model (Homepage Hero Slider)
    """
    list_display = ['title', 'order', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['title', 'subtitle']
    list_editable = ['order', 'is_active']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'subtitle', 'title_span', 'image')
        }),
        ('Button', {
            'fields': ('button_text', 'link'),
            'description': 'Configure the call-to-action button'
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active'),
            'description': 'Lower order numbers appear first. Only active slides are shown.'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    """
    Admin configuration for CompanyInfo model (Singleton)
    """
    fieldsets = (
        ('Contact Information', {
            'fields': ('phone', 'email', 'address')
        }),
        ('Social Media', {
            'fields': ('whatsapp_number', 'whatsapp_default_message', 'instagram_url', 'facebook_url', 'tiktok_url'),
            'description': 'WhatsApp number format: 254700000000 (without +)'
        }),
        ('Timestamps', {
            'fields': ('updated_at',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['updated_at']
    
    def has_add_permission(self, request):
        # Only allow one instance (Singleton pattern)
        return not CompanyInfo.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion of company info
        return False


@admin.register(CompanyLogo)
class CompanyLogoAdmin(admin.ModelAdmin):
    """
    Admin configuration for CompanyLogo model (Partner/Brand logos)
    """
    list_display = ['name', 'order', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['name']
    list_editable = ['order', 'is_active']
    readonly_fields = ['created_at']
    
    fieldsets = (
        ('Logo Information', {
            'fields': ('name', 'logo')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active'),
            'description': 'Lower order numbers appear first in the scrolling section.'
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )