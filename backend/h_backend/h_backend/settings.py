"""
Django settings for h_backend project.
"""
import os
import dj_database_url
from pathlib import Path

# --- Imports for .env and Cloudinary ---
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api
# ----------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

# --- Load .env file ---
# This MUST be near the top, after BASE_DIR is defined.
load_dotenv(BASE_DIR / '.env')
# ------------------------


# --- Core Django Settings ---

# SECURITY WARNING: keep the secret key used in production secret!
# Load from .env or use a default (less secure)
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-your-secret-key-here-change-in-production')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = [
    'https://hardware-store-ilq1.onrender.com', 
    '127.0.0.1',
    'localhost',
]

RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)


# --- Application Definition ---

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # 3rd Party Apps
    'rest_framework',
    'corsheaders',
    'django_filters',

    # Cloudinary
    'cloudinary_storage',
    'cloudinary',

    # Local Apps
    'api',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    # CORS - MUST be before CommonMiddleware
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'h_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'h_backend.wsgi.application'


# --- Database ---
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.config(
        # Fallback to SQLite for local development if DATABASE_URL isn't set
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600 # Optional: Re-use connections for 10 minutes
    )
}


# --- Password Validation ---
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]


# --- Internationalization ---
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Nairobi'
USE_I18N = True
USE_TZ = True


# ============================================
# FILE STORAGE (Static, Media & Cloudinary)
# ============================================

# --- Static files (CSS, JavaScript, Images) ---
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = "whitenoise.storage.ManifestStaticFilesStorage"

# --- Media files (User-uploaded content) ---
# https://docs.djangoproject.com/en/5.2/ref/settings/#media-root

# ============================================
# FILE STORAGE (Static, Media & Cloudinary)
# ============================================

# ... (Your STATIC settings are fine) ...

# --- Cloudinary & Media Configuration ---

CLOUDINARY_URL = os.environ.get('CLOUDINARY_URL')

if CLOUDINARY_URL:
    print("\n" + "="*70)
    print("✓ Cloudinary URL found. Configuring Cloudinary...")
    
    # Configure Cloudinary SDK
    cloudinary.config(cloudinary_url=CLOUDINARY_URL)
    
    # Verify config
    try:
        cloud_name = cloudinary.config().cloud_name
        print(f"✓ Connected to Cloud: {cloud_name}")
    except Exception as e:
        print(f"✗ Error: {e}")
    print("="*70 + "\n")
    
    # Define MEDIA settings (still required)
    MEDIA_URL = '/media/'
    MEDIA_ROOT = BASE_DIR / 'media'
    
    # USE STORAGES (not DEFAULT_FILE_STORAGE)
    STORAGES = {
        'default': {
            'BACKEND': 'cloudinary_storage.storage.MediaCloudinaryStorage',
        },
        'staticfiles': {
            'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
        },
    }
    
    # Optional Cloudinary settings
    CLOUDINARY_STORAGE = {
        'CLOUD_NAME': cloudinary.config().cloud_name,
        'API_KEY': cloudinary.config().api_key,
        'API_SECRET': cloudinary.config().api_secret,
        'SECURE': True,
    }

else:
    print("\n" + "="*70)
    print("⚠ WARNING: CLOUDINARY_URL not set. Using local storage.")
    print("="*70 + "\n")
    
    MEDIA_URL = '/media/'
    MEDIA_ROOT = BASE_DIR / 'media'
    
    STORAGES = {
        'default': {
            'BACKEND': 'django.core.files.storage.FileSystemStorage',
        },
        'staticfiles': {
            'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
        },
    }


# ============================================
# SECURITY (CORS & CSRF)
# ============================================

# --- CORS Configuration ---
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://hardware-store-ilq1.onrender.com",
    "https://hardware-store-phi.vercel.app",
]
CORS_ALLOW_CREDENTIALS = True # CRITICAL for sessions/cookies
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# --- CSRF Configuration ---
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://hardware-store-ilq1.onrender.com',
    "https://hardware-store-phi.vercel.app",
]
CSRF_COOKIE_HTTPONLY = False  # Allow JavaScript to read CSRF token
CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SECURE = False  # Set to True in production with HTTPS


# ============================================
# SESSION CONFIGURATION (CRITICAL FOR CART)
# ============================================

SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_NAME = 'sessionid'
SESSION_COOKIE_AGE = 1209600  # 2 weeks
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = False  # Set to True in production with HTTPS
SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_SAVE_EVERY_REQUEST = True


# ============================================
# DJANGO REST FRAMEWORK
# ============================================

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Public API
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 16,
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
}


# ============================================
# DEFAULT PRIMARY KEY
# ============================================

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'