from django.db import models
from django.contrib.auth.models import User
from cities_light.models import Country, Region, City


class Residence(models.Model):
    country = models.OneToOneField(Country, on_delete=models.CASCADE)
    city = models.OneToOneField(City, on_delete=models.CASCADE)
    region = models.OneToOneField(Region, on_delete=models.CASCADE)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=False)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    friends = models.ManyToManyField('self')
    residence = models.OneToOneField(Residence, on_delete=models.CASCADE, default=None)
    # add relation to Post
