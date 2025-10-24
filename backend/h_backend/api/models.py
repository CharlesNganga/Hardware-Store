from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """
    Represents a product category (e.g., Plumbing & Piping, Electrical)
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Represents a product in the store
    """
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name='products'
    )
    name = models.CharField(max_length=200)
    company = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    
    # Images
    thumbnail = models.ImageField(upload_to='products/', blank=True, null=True)
    image_1 = models.ImageField(upload_to='products/', blank=True, null=True)
    image_2 = models.ImageField(upload_to='products/', blank=True, null=True)
    
    # Product status flags
    is_featured = models.BooleanField(default=False)
    is_bestseller = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category', 'is_active']),
            models.Index(fields=['is_featured']),
        ]

    def __str__(self):
        return f"{self.name} - {self.company}"


class Slide(models.Model):
    """
    Represents a slide in the homepage hero slider
    """
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True)
    title_span = models.CharField(max_length=200, blank=True)
    button_text = models.CharField(max_length=50, default="Shop Now")
    link = models.CharField(max_length=200, default="#")
    image = models.ImageField(upload_to='slides/')
    
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class CompanyInfo(models.Model):
    """
    Store company contact information and settings (Singleton model)
    """
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField()
    
    whatsapp_number = models.CharField(max_length=20, help_text="Format: 254700000000")
    instagram_url = models.URLField(blank=True)
    facebook_url = models.URLField(blank=True)
    tiktok_url = models.URLField(blank=True)
    
    whatsapp_default_message = models.CharField(
        max_length=200, 
        default="Hello! I'm interested in your products."
    )
    
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Company Information"
        verbose_name_plural = "Company Information"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Company Information"


class CompanyLogo(models.Model):
    """
    Represents company/partner logos for the scrolling section
    """
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='logos/')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


# ============================================
# NEW CART MODELS FOR ANONYMOUS USERS
# ============================================

class Cart(models.Model):
    """
    Represents a shopping cart linked to an anonymous session.
    No user authentication required - identified by session_key only.
    """
    session_key = models.CharField(max_length=40, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"Cart (Session: {self.session_key[:8]}...)"

    @property
    def total_price(self):
        """Calculate total price of all items in cart"""
        return sum(item.total_price for item in self.items.all())

    @property
    def item_count(self):
        """Calculate total number of items in cart"""
        return sum(item.quantity for item in self.items.all())


class CartItem(models.Model):
    """
    Represents a single product in a cart with quantity.
    Links Cart to Product.
    """
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='cart_items'
    )
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        # Ensure each product appears only once per cart
        unique_together = ['cart', 'product']

    def __str__(self):
        return f"{self.quantity}x {self.product.name} in cart {self.cart.session_key[:8]}..."

    @property
    def total_price(self):
        """Calculate total price for this cart item"""
        return self.product.price * self.quantity