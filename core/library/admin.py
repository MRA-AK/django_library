from django.contrib import admin
from .models import (
    Author, Publisher,
    Category, Book,
    Borrow
)


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    """
    Show Author model in django admin panel.
    """
    list_display = ["full_name"]
    search_fields = ["full_name"]


@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    """
    Show Publisher model in django admin panel.
    """
    list_display = ["name"]
    search_fields = ["name"]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Show Category model in django admin panel.
    """
    list_display = ["name"]
    search_fields = ["name"]

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    """
    Show Book model in django admin panel.
    """
    list_display = [
        "name",
        "publisher",
    ]
    search_fields = ["name", "authors", "publisher", "categories"]
    list_filter = ["authors", "publisher", "categories"]


@admin.register(Borrow)
class BorrowAdmin(admin.ModelAdmin):
    """
    Show Borrow model in django admin panel.
    """
    list_display = [
        "user",
        "book",
        "start_at",
        "end_at"
    ]
    search_fields = ["user", "book", "start_at", "end_at"]
    list_filter = ["user",]
