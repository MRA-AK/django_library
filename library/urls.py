from django.urls import path

from .views import (BookFilterAuthorView, BookFilterCateforyView,
                    BookFilterNameView, BookFilterPublisherView, BookListView,
                    MyBookListView)

app_name = "library"

urlpatterns = [
    path("", BookListView.as_view(), name="book_list"),
    path("mybooks/", MyBookListView.as_view(), name="mybooks"),
    path("bookname/<str:name>/", BookFilterNameView.as_view(), name="name_filter"),
    path(
        "category/<str:cat_name>/",
        BookFilterCateforyView.as_view(),
        name="category_filter",
    ),
    path(
        "author/<str:author_name>/",
        BookFilterAuthorView.as_view(),
        name="author_filter",
    ),
    path(
        "publisher/<str:pub_name>/",
        BookFilterPublisherView.as_view(),
        name="publisher_filter",
    ),
]
