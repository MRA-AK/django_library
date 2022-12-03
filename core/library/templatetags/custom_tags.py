from django import template
from django.utils import timezone

from library.models import Borrow

register = template.Library()


@register.filter
def is_borrowed(book):
    """Check if the book borrow instance expired or not"""
    borrowd = Borrow.objects.filter(book__name=book)
    if borrowd:
        latest_record = borrowd.latest("end_at")
        total_time = (latest_record.end_at - timezone.now()).total_seconds()
        if total_time > 0:
            return True
    return False
