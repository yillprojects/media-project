from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from cities_light.models import Country, City

from .serializers import UserSerializer, ProfileSerializer, PostSerializer, \
    CommentSerializer, ReplySerializer, CommunitySerializer
from .models import Profile, Post,  Community, Comment, Reply


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
        {'success': False, 'message': message, 'data': []},
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

# checks if data contains all the required fields
def check_for_keys(data, keys):
    for key in keys:
        if key not in data:
            return False


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

    @action(methods=['POST'], detail=False)
    def register(self, request):
        for key in ['email', 'first_name', 'last_name']:
            if key not in request.data:
                return response['invalid_data']

        serialized = UserSerializer(data=request.data)
        if serialized.is_valid():

            is_email_busy = User.objects.filter(email=request.data['email']).exists()
            if is_email_busy:
                return response['ok_message']('Email is busy')

            user = User.objects.create_user(**serialized.data)
            Profile.objects.create(
                user=user, first_name=request.data['first_name'], last_name=request.data['last_name']
            )
            return response['created']

        if 'email' in serialized.errors:
            return response['ok_message']('Invalid email')

        if 'username' in serialized.errors:
            return response['ok_message']('Username is busy')

        return response['invalid_data']


class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    @action(methods=['POST'], detail=True)
    def get_fields(self, request, pk=None):

        profile = self.get_object()

        requested_fields = request.data['fields']
        serialized = ProfileSerializer(profile, fields=requested_fields)

        return response['ok_data'](serialized.data)

    @action(methods=['POST'], detail=True)
    def set_location(self, request, pk=None):
        for key in ['country']:
            if key not in request.data:
                return response['invalid_data']

        profile = self.get_object()
        country = Country.objects.get(id=request.data['country'])
        profile.country = country
        profile.save()

        profile.city = None
        profile.save()
        if 'city' in request.data:
            city = City.objects.get(id=request.data['city'])
            profile.city = city
            profile.save()

        profile.save(update_fields=['city', 'country'])
        serialized = ProfileSerializer(profile)
        return response['ok_data'](serialized.data)

    @action(methods=['POST'], detail=True)
    def follow(self, request, pk=None):
        for key in ['receiver']:
            if key not in request.data:
                return response['invalid_data']

        receiver = self.get_object()

        sender = Profile.objects.get(id=request.data['receiver'])

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

    @action(methods=['GET'], detail=True)
    def posts(self, request, pk=None):

        profile = self.get_object()

        serialized = PostSerializer(profile.posts, many=True)
        return response['ok_data'](serialized.data)

    @action(methods=['GET'], detail=True)
    def newsfeed(self, request, pk=None):

        profile = self.get_object()

        authors_list = profile.friends.all()
        author = Profile.objects.filter(id=pk)
        authors_list |= author

        posts = Post.objects.filter(author__in=authors_list)
        serialized = PostSerializer(posts, many=True)
        return response['ok_data'](serialized.data)

    @action(methods=['GET'], detail=True)
    def friends(self, request, pk=None):

        profile = self.get_object()

        serialized = ProfileSerializer(profile.friends, many=True,
                                       fields=('avatar', 'id', 'header', 'full_name', 'friends_cnt', 'location'))
        return response['ok_data'](serialized.data)

    @action(methods=['GET'], detail=True)
    def friends_short(self, request, pk=None):

        profile = self.get_object()

        serialized = ProfileSerializer(profile.friends, many=True, fields=('avatar', 'id'))
        return response['ok_data'](serialized.data)

    @action(methods=['GET'], detail=True)
    def communities(self, request, pk=None):

        profile = self.get_object()

        serialized = CommunitySerializer(profile.communities, many=True,
                                         fields=('name', 'address', 'occupation', 'avatar'))
        return response['ok_data'](serialized.data)

    @action(methods=['POST'], detail=True)
    def add_community(self, request, pk=None):
        for key in ['community']:
            if key not in request.data:
                return response['invalid_data']

        profile = self.get_object()

        try:
            community = Community.objects.get(address=request.data['community'])
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong community address')

        profile.communities.add(community)
        return response['ok']


class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    @action(methods=['POST'], detail=True)
    def get_fields(self, request, pk=None):

        try:
            post = Post.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong username')

        requested_fields = request.data['fields']
        serialized = PostSerializer(post, fields=requested_fields)

        return response['ok_data'](serialized.data)

    @action(methods=['POST'], detail=False)
    def add(self, request):
        for key in ['text']:
            if key not in request.data:
                return response['invalid_data']

        author = Profile.objects.get(user=request.user)
        post = Post.objects.create(text=request.data['text'], author=author)
        serialized = PostSerializer(post)
        return response['ok_data'](serialized.data)

    @action(methods=['PATCH'], detail=True)
    def like(self, request, pk=None):
        post = self.get_object()
        profile = Profile.objects.get(user=request.user)

        if post.liked_by.filter(id=profile.id).exists():
            post.likes -= 1
            post.liked_by.remove(profile)
            post.save()
        else:
            post.liked_by.add(profile)
            post.likes += 1
            post.save()

        return response['ok_data'](post.likes)

    @action(methods=['POST'], detail=True)
    def add_comment(self, request, pk=None):
        for key in ['text']:
            if key not in request.data:
                return response['invalid_data']

        post = self.get_object()

        try:
            author = Profile.objects.get(user=request.user)
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong author username')

        comment = Comment.objects.create(post=post, author=author, text=request.data['text'])
        serialized = CommentSerializer(comment)
        return response['ok_data'](serialized.data)


class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    @action(methods=['PATCH'], detail=True)
    def like(self, request, pk=None):

        comment = self.get_object()

        try:
            profile = Profile.objects.get(user=request.user)
        except ObjectDoesNotExist:
            return response['ok_message']('Wrong username')

        if comment.liked_by.filter(id=profile.id).exists():
            comment.likes -= 1
            comment.liked_by.remove(profile)
            comment.save()
        else:
            comment.liked_by.add(profile)
            comment.likes += 1
            comment.save()

        return response['ok_data'](comment.likes)

    @action(methods=['POST'], detail=True)
    def add_reply(self, request, pk=None):
        for key in ['text']:
            if key not in request.data:
                return response['invalid_data']

        comment = self.get_object()
        author = Profile.objects.get(user=request.user)

        reply = Reply.objects.create(comment_field=comment, author=author, text=request.data['text'])
        serialized = ReplySerializer(reply)
        return response['ok_data'](serialized.data)


class CommunityView(viewsets.ModelViewSet):
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()


@api_view(['PATCH'])
def like_reply(request, **kwargs):
    profile = Profile.objects.get(user=request.user)

    try:
        reply = Reply.objects.get(id=kwargs['id'])
    except ObjectDoesNotExist:
        return response['invalid_data_message']('Invalid reply id.')

    if reply.liked_by.filter(id=profile.id).exists():
        reply.liked_by.remove(profile)
        reply.likes -= 1
        reply.save()
    else:
        reply.liked_by.add(profile)
        reply.likes += 1
        reply.save()

    return response['ok_data'](reply.likes)


@api_view(['GET'])
def get_countries_list(request):
    response_data = [{
        'name': country.name,
        'id': country.id
    } for country in Country.objects.all()]
    return response['ok_data'](response_data)


@api_view(['GET', 'POST'])
def get_cities_list(request):
    if request.method == 'GET':
        response_data = [{
            'name': city.name,
            'id': city.id
        } for city in City.objects.all()]
        return response['ok_data'](response_data)

    if 'country' in request.data:
        cities = City.objects.filter(country__id=request.data['country'])
        response_data = [{
            'name': city.name,
            'id': city.id
        } for city in cities]
        return response['ok_data'](response_data)

    return response['invalid_data']


@api_view(['GET', 'POST'])
def root(request):
    return Response('Hello World!')


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'id': user.profile.id
    }

