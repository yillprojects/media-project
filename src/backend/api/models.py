from django.db import models
from django.contrib.auth.models import User
from cities_light.models import Country, City


class Residence(models.Model):
    country = models.OneToOneField(Country, on_delete=models.CASCADE)
    city = models.OneToOneField(City, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.city)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=25, default='Name')
    last_name = models.CharField(max_length=25, default='Surname')
    friends = models.ManyToManyField('self')
    residence = models.ForeignKey(Residence, on_delete=models.CASCADE, null=True)
    avatar = models.ImageField(upload_to='avatars', default='avatars/default.jpg')
    header = models.ImageField(upload_to='headers', default='headers/default.jpg')
    status = models.CharField(max_length=20, default="")
    # TODO: add relation to Post
    # TODO: ask about blank=True and null

    def __str__(self):
        return str(self.user)
