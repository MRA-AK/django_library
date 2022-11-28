from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now


class CommonInfo(models.Model):
    """Abstract base class for models common info"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Author(CommonInfo):
    """Books author"""
    full_name = models.CharField(max_length=255)

    def __str__(self):
        return self.full_name


class Publisher(CommonInfo):
    """Books publisher"""
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Category(CommonInfo):
    """Books category"""
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name

class Book(CommonInfo):
    name = models.CharField(max_length=255)
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, on_delete=models.RESTRICT)
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return self.name


class Borrow(CommonInfo):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    start_at = models.DateTimeField(default=now)
    end_at = models.DateTimeField()

    def __str__(self):
        return self.book.name
