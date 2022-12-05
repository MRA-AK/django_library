from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _


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
    """Book model to store books data"""

    name = models.CharField(max_length=255)
    image = models.ImageField(default="default.jpg", upload_to="book_images")
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, on_delete=models.RESTRICT)
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return self.name


class Borrow(CommonInfo):
    """Store borrowing data"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="borrowed")
    start_at = models.DateTimeField(default=now)
    end_at = models.DateTimeField()

    def clean(self):
        super().clean()
        # Don't allow end_at before start_at
        if self.end_at < self.start_at:
            raise ValidationError(_("end_at should not be before start_at"))
        # Don't borrow a book that borrowed by another user
        borrows = Borrow.objects.filter(book=self.book)
        if borrows:
            latest_borrow = borrows.latest("end_at")
            if (self.start_at < latest_borrow.end_at) and (
                self.user != latest_borrow.user
            ):
                raise ValidationError(
                    _(
                        f"This book is borrowed bofore by {latest_borrow.user.username} user.\
                            This user will bring back the book at {latest_borrow.end_at}."
                    )
                )

    def __str__(self):
        return self.book.name
