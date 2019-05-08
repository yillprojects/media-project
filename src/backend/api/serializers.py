from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Location


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


class ProfileSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only='True')
    user = serializers.StringRelatedField()
    friends = serializers.StringRelatedField(many=True)
    followers = serializers.StringRelatedField(many=True)

    class Meta:
        model = Profile
        fields = '__all__'
