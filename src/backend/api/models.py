from django.db import models
from django.contrib.auth.models import User
from cities_light.models import Country, City


class Residence(models.Model):
    country = models.OneToOneField(Country, on_delete=models.CASCADE)
    city = models.OneToOneField(City, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.city)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=False)
    first_name = models.CharField(max_length=25, blank=False)
    last_name = models.CharField(max_length=25, blank=False)
    friends = models.ManyToManyField('self', blank=True)
    residence = models.ForeignKey(Residence, on_delete=models.CASCADE, blank=True)
    # add relation to Post

    def __str__(self):
        return str(self.user)
