from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404
from django.views.generic.list import ListView

from .models import Book, Borrow, Category


class BookListView(LoginRequiredMixin, ListView):
    """
    A class based view for showing a list of available tasks.
    """

    model = Book
    context_object_name = "books"
    template_name = "library/book_list.html"


class MyBookListView(LoginRequiredMixin, ListView):
    """
    A class based view for showing a list of borrowed books to the user.
    """

    model = Borrow
    context_object_name = "borrowed_books"
    template_name = "library/my_books.html"

    def get_queryset(self):
        return Borrow.objects.filter(user=self.request.user)


class BookFilterNameView(LoginRequiredMixin, ListView):
    """
    A class based view to filter the books based on name.
    """

    model = Book
    context_object_name = "books"
    template_name = "library/book_list.html"

    def get_queryset(self):
        return Book.objects.filter(name__icontains=self.kwargs["name"]).distinct()


class BookFilterCateforyView(LoginRequiredMixin, ListView):
    """
    A class based view to filter the books based on a category.
    """

    model = Book
    context_object_name = "books"
    template_name = "library/book_list.html"

    def get_queryset(self):
        category = get_object_or_404(Category, name=self.kwargs["cat_name"])
        return Book.objects.filter(categories=category)


class BookFilterAuthorView(LoginRequiredMixin, ListView):
    """
    A class based view to filter the books based on an auhtor.
    """

    model = Book
    context_object_name = "books"
    template_name = "library/book_list.html"

    def get_queryset(self):
        return Book.objects.filter(
            authors__full_name__icontains=self.kwargs["author_name"]
        ).distinct()


class BookFilterPublisherView(LoginRequiredMixin, ListView):
    """
    A class based view to filter the books based on a publisher.
    """

    model = Book
    context_object_name = "books"
    template_name = "library/book_list.html"

    def get_queryset(self):
        return Book.objects.filter(
            publisher__name__icontains=self.kwargs["pub_name"]
        ).distinct()
