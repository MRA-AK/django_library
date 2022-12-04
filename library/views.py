from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.views.generic.list import ListView

from .models import Author, Book, Borrow, Category, Publisher


class BookListView(LoginRequiredMixin, ListView):
    """
    A class based view for showing a list of available tasks.
    """

    model = Book
    context_object_name = "books"
    template_name = "library/book_list.html"

    def get_context_data(self, *args, **kwargs):
        context = super(BookListView, self).get_context_data(*args, **kwargs)
        context["categories"] = Category.objects.all()
        context["authors"] = Author.objects.all()
        context["publishers"] = Publisher.objects.all()
        return context


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

    def get_context_data(self, *args, **kwargs):
        context = super(BookFilterNameView, self).get_context_data(*args, **kwargs)
        context["categories"] = Category.objects.all()
        context["authors"] = Author.objects.all()
        context["publishers"] = Publisher.objects.all()
        return context


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

    def get_context_data(self, *args, **kwargs):
        context = super(BookFilterCateforyView, self).get_context_data(*args, **kwargs)
        context["categories"] = Category.objects.all()
        context["authors"] = Author.objects.all()
        context["publishers"] = Publisher.objects.all()
        return context


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

    def get_context_data(self, *args, **kwargs):
        context = super(BookFilterAuthorView, self).get_context_data(*args, **kwargs)
        context["categories"] = Category.objects.all()
        context["authors"] = Author.objects.all()
        context["publishers"] = Publisher.objects.all()
        return context


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

    def get_context_data(self, *args, **kwargs):
        context = super(BookFilterPublisherView, self).get_context_data(*args, **kwargs)
        context["categories"] = Category.objects.all()
        context["authors"] = Author.objects.all()
        context["publishers"] = Publisher.objects.all()
        return context


class BookSearchView(LoginRequiredMixin, ListView):
    """
    A class based view to searching on the books.
    """

    model = Book
    context_object_name = "books"
    template_name = "library/book_list.html"

    def get_queryset(self):
        keyword = self.kwargs["keyword"]
        result = Book.objects.filter(
            Q(name__icontains=keyword)
            | Q(publisher__name__icontains=keyword)
            | Q(authors__full_name__icontains=keyword)
            | Q(categories__name__icontains=keyword)
        )
        return result.distinct()

    def get_context_data(self, *args, **kwargs):
        context = super(BookSearchView, self).get_context_data(*args, **kwargs)
        context["categories"] = Category.objects.all()
        context["authors"] = Author.objects.all()
        context["publishers"] = Publisher.objects.all()
        return context
