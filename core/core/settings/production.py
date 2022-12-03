from decouple import config

from .base import *

DEBUG = False

ALLOWED_HOSTS = ["8185.94.98.152"]

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("DATABASE_NAME"),
        "USER": config("DATABASE_USER"),
        "PASSWORD": config("DATABASE_PASSWORD"),
        "HOST": "localhost",
        "PORT": "5432",
    }
}

# Static and media Files
STATIC_URL = "/static/"
STATIC_ROOT = "/django-project/site/public/static"

MEDIA_URL = "/media/"
MEDIA_ROOT = "/django-project/site/public/media"
