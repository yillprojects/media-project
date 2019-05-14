from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Location, Post, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'id')


class LocationSerializer(serializers.ModelSerializer):
    country = serializers.StringRelatedField()
    city = serializers.SlugRelatedField(slug_field='name', read_only='True')

    class Meta:
        model = Location
        fields = ('country', 'city')


# TODO Q: data splitting

class ProfileSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only='True')
    user = serializers.StringRelatedField()
    friends = serializers.StringRelatedField(many=True)
    followers = serializers.StringRelatedField(many=True)
    avatar = serializers.ImageField(use_url=False)
    header = serializers.ImageField(use_url=False)

    class Meta:
        model = Profile
        fields = '__all__'


class ProfileHeaderSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only='True')
    avatar = serializers.ImageField(use_url=False)
    header = serializers.ImageField(use_url=False)

    class Meta:
        model = Profile
        fields = ('location', 'first_name', 'last_name', 'avatar', 'header')


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    username = serializers.CharField(source='author.user')
    avatar = serializers.ImageField(source='author.avatar', use_url=False)
    created_time = serializers.CharField(source='pretty_time')

    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    username = serializers.CharField(source='author.user')
    avatar = serializers.ImageField(source='author.avatar', use_url=False)
    created_time = serializers.CharField(source='pretty_time')
    comments = CommentSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'


