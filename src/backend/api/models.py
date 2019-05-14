from django.utils import timezone
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
        return '{} {}'.format(self.first_name, self.last_name)


class Post(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, related_name='posts')
    text = models.TextField()
    likes = models.PositiveIntegerField(default=0)
    reposts = models.PositiveIntegerField(default=0)
    created_time = models.DateTimeField(default=timezone.now, editable=False)

    def pretty_time(self):
        return '{:%d-%m-%Y-%H-%M-%S}'.format(self.created_time)

    def __str__(self):
        return self.text[:17] + ('...' if len(self.text) > 17 else '')


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, related_name='comments')
    text = models.TextField()
    likes = models.PositiveIntegerField(default=0)
    created_time = models.DateTimeField(default=timezone.now, editable=False)

    def pretty_time(self):
        return '{:%d-%m-%Y-%H-%M-%S}'.format(self.created_time)
