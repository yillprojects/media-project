from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from cities_light.models import Country, City

from .serializers import UserSerializer, ProfileSerializer, PostSerializer, ProfileHeaderSerializer, \
    CommentSerializer, CommunitySerializer
from .models import Profile, Post, Comment, Community


def user_data(resp_message='', is_success=False, resp_status=status.HTTP_200_OK):
    return Response(
        {'message': resp_message, 'success': is_success},
        status=resp_status
    )


invalid_data = Response(
    {'success': False, 'message': 'Invalid data'},
    status=status.HTTP_400_BAD_REQUEST
)


def invalid_data_message(message):
    return Response(
        {'success': False, 'message': message},
        status=status.HTTP_400_BAD_REQUEST
    )


ok = Response(
    {'success': True},
    status=status.HTTP_200_OK
)


def ok_data(data):
    return Response(
        {'success': True, 'data': data},
        status=status.HTTP_200_OK
    )


def ok_message(message):
    return Response(
        {'success': False, 'message': message},
        status=status.HTTP_200_OK
    )


created = Response(
        {'success': True},
        status=status.HTTP_201_CREATED
    )

response = {
    'user': user_data,
    'invalid_data': invalid_data,
    'invalid_data_message': invalid_data_message,
    'ok': ok,
    'ok_data': ok_data,
    'ok_message': ok_message,
    'created': created
}


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(methods=['POST'], detail=False)
    def register(self, request):
        for key in ['email']:
            if key not in request.data:
                return response['invalid_data']

        serialized = UserSerializer(data=request.data)
        if serialized.is_valid():

            is_email_busy = User.objects.filter(email=request.data['email']).exists()
            if is_email_busy:
                return response['ok_message']('Email is busy')

            user = User.objects.create_user(**serialized.data)
            Profile.objects.create(user=user)
            return response['created']

        if 'email' in serialized.errors:
            return response['ok_message']('Invalid email')

        if 'username' in serialized.errors:
            return response['ok_message']('Username is busy')

        return response['invalid_data']

    @action(methods=['POST'], detail=False)
    def check(self, request):
        for key in ['password', 'username']:
            if key not in request.data:
                return response['invalid_data']

        try:
            user = User.objects.get(username=request.data['username'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong username')

        is_password_match = user.check_password(request.data['password'])
        if not is_password_match:
            return response['ok_message']('Wrong password')

        return response['ok']


class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    @action(methods=['POST'], detail=False)
    def set_location(self, request):
        for key in ['city', 'country', 'username']:
            if key not in request.data:
                return response['invalid_data']

        try:
            user = Profile.objects.get(user__username=request.data['username'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong username')

        if not user.set_location(request.data['city'], request.data['country']):
            return response['ok_message']('Wrong location')

        return response['ok']

    @action(methods=['POST'], detail=False)
    def follow(self, request):
        for key in ['sender', 'receiver']:
            if key not in request.data:
                return response['invalid_data']

        try:
            receiver = Profile.objects.get(user__username=request.data['receiver'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong receiver username')

        try:
            sender = Profile.objects.get(user__username=request.data['sender'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong sender username')

        if sender in receiver.followers.all():
            receiver.followers.remove(sender)

        elif receiver in sender.followers.all():
            receiver.followers.remove(sender)
            sender.followers.remove(receiver)
            receiver.friends.add(sender)

        elif sender in receiver.friends.all():
            receiver.friends.remove(sender)
            sender.followers.add(receiver)

        else:
            receiver.followers.add(sender)
        return response['ok']

    @action(methods=['POST'], detail=False)
    def headers(self, request):
        for key in ['username']:
            if key not in request.data:
                return response['invalid_data']

        try:
            profile = Profile.objects.get(user__username=request.data['username'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong username')

        serialized = ProfileHeaderSerializer(profile)
        return response['ok_data'](serialized.data)

    @action(methods=['POST'], detail=False)
    def friends_short_list(self, request):
        for key in ['username']:
            if key not in request.data:
                return response['invalid_data']

        try:
            profile = Profile.objects.get(user__username=request.data['username'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong username')

        serialized = ProfileSerializer(profile.friends, many=True, fields=('avatar', 'user'))
        return response['ok_data'](serialized.data)

    @action(methods=['POST'], detail=False)
    def communities(self, request):
        for key in ['username']:
            if key not in request.data:
                return response['invalid_data']

        try:
            profile = Profile.objects.get(user__username=request.data['username'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong username')

        serialized = CommunitySerializer(profile.communities, many=True,
                                         fields=('name', 'address', 'occupation', 'avatar'))
        return response['ok_data'](serialized.data)

    @action(methods=['POST'], detail=False)
    def add_community(self, request):
        for key in ['username', 'community']:
            if key not in request.data:
                return response['invalid_data']

        try:
            profile = Profile.objects.get(user__username=request.data['username'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong username')

        try:
            community = Community.objects.get(address=request.data['community'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong community address')

        profile.communities.add(community)
        return response['ok']


class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    @action(methods=['POST'], detail=False)
    def get(self, request):
        for key in ['username']:
            if key not in request.data:
                return response['invalid_data']

        try:
            profile = Profile.objects.get(user__username=request.data['username'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong username')

        serialized = PostSerializer(profile.posts, many=True)
        return response['ok_data'](serialized.data)

    @action(methods=['POST'], detail=False)
    def add(self, request):
        for key in ['author', 'text']:
            if key not in request.data:
                return response['invalid_data']

        author = Profile.objects.get(user__username=request.data['author'])
        Post.objects.create(text=request.data['text'], author=author)
        return response['created']

    @action(methods=['POST'], detail=False)
    def delete(self, request):
        for key in ['id']:
            if key not in request.data:
                return response['invalid_data']

        try:
            post = Post.objects.get(pk=request.data['id'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong post id')

        post.delete()
        return response['ok']

    @action(methods=['POST'], detail=False)
    def like(self, request):
        for key in ['id', 'username']:
            if key not in request.data:
                return response['invalid_data']

        try:
            post = Post.objects.get(id=request.data['id'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong post id')

        try:
            profile = Profile.objects.get(user__username=request.data['username'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong username')

        post.liked_by.add(profile)
        post.likes += 1
        post.save()
        return response['ok']

    @action(methods=['POST'], detail=False)
    def dislike(self, request):
        for key in ['id', 'username']:
            if key not in request.data:
                return response['invalid_data']

        try:
            post = Post.objects.get(id=request.data['id'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong post id')

        try:
            profile = Profile.objects.get(user__username=request.data['username'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong username')

        post.liked_by.remove(profile)
        post.likes -= 1
        post.save()
        return response['ok']

    @action(methods=['POST'], detail=False)
    def add_comment(self, request):
        for key in ['post_id', 'text', 'author']:
            if key not in request.data:
                return response['invalid_data']

        try:
            post = Post.objects.get(pk=request.data['post_id'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong post id')

        try:
            author = Profile.objects.get(user__username=request.data['author'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong author username')

        Comment.objects.create(post=post, author=author, text=request.data['text'])
        return response['ok']

    @action(methods=['POST'], detail=False)
    def delete_comment(self, request):
        for key in ['id']:
            if key not in request.data:
                return response['invalid_data']

        try:
            comment = Comment.objects.get(pk=request.data['id'])
        except ObjectDoesNotExist:
            return response['ok']

        comment.delete()
        return response['ok']


class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class CommunityView(viewsets.ModelViewSet):
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()


@api_view(['GET'])
def get_countries_list(request):
    response_data = [country.name for country in Country.objects.all()]
    return response['ok_data'](response_data)


@api_view(['GET', 'POST'])
def get_cities_list(request):
    if request.method == 'GET':
        response_data = [city.name for city in City.objects.all()]
        return response['ok_data'](response_data)

    if 'country' in request.data:
        cities = City.objects.filter(country__name=request.data['country'])
        response_data = [city.name for city in cities]
        return response['ok_data'](response_data)

    return response['invalid_data']


