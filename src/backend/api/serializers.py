from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Location, Post, Comment, Community


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class UserSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'id')


class LocationSerializer(DynamicFieldsModelSerializer):
    country = serializers.StringRelatedField()
    city = serializers.SlugRelatedField(slug_field='name', read_only='True')

    class Meta:
        model = Location
        fields = ('country', 'city')


class CommunitySerializer(DynamicFieldsModelSerializer):
    avatar = serializers.ImageField(use_url=False)
    members = serializers.StringRelatedField(many=True)

    class Meta:
        model = Community
        fields = '__all__'


class ProfileSerializer(DynamicFieldsModelSerializer):
    location = LocationSerializer(read_only='True')
    friends = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    followers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    avatar = serializers.ImageField(use_url=False)
    header = serializers.ImageField(use_url=False)
    communities = serializers.StringRelatedField(many=True)
    liked_posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    full_name = serializers.CharField()
    friends_cnt = serializers.IntegerField()

    class Meta:
        model = Profile
        fields = '__all__'


class CommentSerializer(DynamicFieldsModelSerializer):
    author = serializers.DictField(source='author.get_data')
    # username = serializers.CharField(source='author.user')
    avatar = serializers.ImageField(source='author.avatar', use_url=False)

    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(DynamicFieldsModelSerializer):
    author = serializers.DictField(source='author.get_data')
    avatar = serializers.ImageField(source='author.avatar', use_url=False)
    comments = CommentSerializer(many=True)
    liked_by = serializers.StringRelatedField(many=True)

    class Meta:
        model = Post
        fields = '__all__'


