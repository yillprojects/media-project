from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from cities_light.models import Country, City
from picklefield import PickledObjectField


class Location(models.Model):
    country = models.OneToOneField(Country, on_delete=models.CASCADE)
    city = models.OneToOneField(City, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.city)


class Community(models.Model):
    name = models.CharField(max_length=50)
    occupation = models.CharField(max_length=50)  # TODO: change to choices tuple
    url = models.CharField(max_length=25, unique=True)
    avatar = models.ImageField(upload_to='communities/avatars', null=True)

    def __str__(self):
        return self.url


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=25, default='Name', blank=True)
    last_name = models.CharField(max_length=25, default='Surname', blank=True)
    friends = models.ManyToManyField('self', symmetrical=True)
    followers = models.ManyToManyField('self', symmetrical=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True, related_name='profiles')
    avatar = models.ImageField(upload_to='profiles/avatars', null=True)
    header = models.ImageField(upload_to='profiles/headers', null=True)
    status = models.CharField(max_length=20, default="", blank=True)
    communities = models.ManyToManyField(Community, related_name='members')
    email = models.EmailField(blank=True)
    website = models.TextField(blank=True)
    about = models.TextField(blank=True)
    shows = models.TextField(blank=True)
    bands = models.TextField(blank=True)
    facebook = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    dribbble = models.URLField(blank=True)

    def set_location(self, city_name, country_name):
        try:
            city = City.objects.get(name=city_name, country__name=country_name)
        except ObjectDoesNotExist:
            return False

        country = Country.objects.get(name=country_name)
        location, is_created = Location.objects.get_or_create(country=country, city=city)
        self.location = location
        self.save()
        return True

    def get_data(self):
        return {
            'name': '{} {}'.format(self.first_name, self.last_name),
            'id': self.user.id,
        }

    def save(self, *args, **kwargs):
        self.email = self.user.email
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username


class Post(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='posts', null=True)
    text = models.TextField()
    liked_by = models.ManyToManyField(Profile, related_name='liked_posts')
    likes = models.PositiveIntegerField(default=0)
    reposts = models.PositiveIntegerField(default=0)
    created_time = models.DateTimeField(default=timezone.now, editable=False)

    def pretty_time(self):
        return '{:%Y-%m-%dT%H:%M:%S}'.format(self.created_time)

    def __str__(self):
        return self.text[:17] + ('...' if len(str(self.text)) > 17 else '')


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments', null=True)
    text = models.TextField()
    likes = models.PositiveIntegerField(default=0)
    created_time = models.DateTimeField(default=timezone.now, editable=False)

    def pretty_time(self):
        return '{:%Y-%m-%dT%H:%M:%S}'.format(self.created_time)
