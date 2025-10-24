from django.contrib import admin
from .models import Category, Product, Slide, CompanyInfo, CompanyLogo, Cart, CartItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Admin configuration for Category model
    """
    list_display = ['name', 'slug', 'created_at']
    search_fields = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'image')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
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
    list_editable = ['is_featured', 'is_bestseller', 'is_active']
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
        return not CompanyInfo.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
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


# ============================================
# NEW CART ADMIN
# ============================================

class CartItemInline(admin.TabularInline):
    """
    Inline admin for CartItem - shows items within Cart admin
    """
    model = CartItem
    extra = 0
    readonly_fields = ['product', 'quantity', 'total_price', 'created_at']
    can_delete = True
    
    def total_price(self, obj):
        """Display calculated total price"""
        return f"Ksh {obj.total_price}"
    total_price.short_description = 'Total Price'


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    """
    Admin configuration for Cart model
    """
    list_display = ['id', 'session_key_short', 'item_count', 'total_price_display', 'created_at', 'updated_at']
    search_fields = ['session_key']
    readonly_fields = ['session_key', 'created_at', 'updated_at', 'item_count', 'total_price_display']
    list_filter = ['created_at', 'updated_at']
    inlines = [CartItemInline]
    
    fieldsets = (
        ('Cart Information', {
            'fields': ('session_key', 'item_count', 'total_price_display')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
        }),
    )
    
    def session_key_short(self, obj):
        """Display shortened session key"""
        return f"{obj.session_key[:8]}..."
    session_key_short.short_description = 'Session'
    
    def total_price_display(self, obj):
        """Display formatted total price"""
        return f"Ksh {obj.total_price}"
    total_price_display.short_description = 'Total Price'
    
    def has_add_permission(self, request):
        """Carts should only be created through the API"""
        return False


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    """
    Admin configuration for CartItem model
    """
    list_display = ['id', 'cart_session', 'product', 'quantity', 'total_price_display', 'created_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['cart__session_key', 'product__name']
    readonly_fields = ['cart', 'product', 'quantity', 'total_price_display', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Cart Item Information', {
            'fields': ('cart', 'product', 'quantity', 'total_price_display')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
        }),
    )
    
    def cart_session(self, obj):
        """Display cart session key (shortened)"""
        return f"{obj.cart.session_key[:8]}..."
    cart_session.short_description = 'Cart Session'
    
    def total_price_display(self, obj):
        """Display formatted total price"""
        return f"Ksh {obj.total_price}"
    total_price_display.short_description = 'Total Price'
    
    def has_add_permission(self, request):
        """Cart items should only be created through the API"""
        return False