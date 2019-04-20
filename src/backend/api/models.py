from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=False)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    friends = models.ManyToManyField('self')
    # add relation to Post
