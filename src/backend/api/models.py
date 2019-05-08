from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from cities_light.models import Country, City


class Location(models.Model):
    country = models.OneToOneField(Country, on_delete=models.CASCADE)
    city = models.OneToOneField(City, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.city)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=25, default='Name')
    last_name = models.CharField(max_length=25, default='Surname')
    friends = models.ManyToManyField('self', symmetrical=True)
    followers = models.ManyToManyField('self', symmetrical=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True, related_name='profiles')
    avatar = models.ImageField(upload_to='avatars', default='avatars/default.jpg')
    header = models.ImageField(upload_to='headers', default='headers/default.jpg')
    status = models.CharField(max_length=20, default="")
    # TODO: add relation to Post
    # TODO: ask about blank=True and null

    def set_location(self, city_name):
        try:
            city = City.objects.get(name=city_name)
        except ObjectDoesNotExist:
            return False
        country = Country.objects.get(name=city.country.name)
        location, is_created = Location.objects.get_or_create(country=country, city=city)
        self.location = location
        self.save()
        return True

    def __str__(self):
        return self.user.username


class Post(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='posts')
    text = models.TextField()
    likes = models.IntegerField(default=0)

