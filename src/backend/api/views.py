from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from cities_light.models import Country, City

from .serializers import UserSerializer, ProfileSerializer
from .models import Profile


def user_data(resp_message='', is_success=False, resp_status=status.HTTP_200_OK):
    return Response(
        {'message': resp_message, 'success': is_success},
        status=resp_status
    )


invalid_data = Response('Invalid data', status=status.HTTP_400_BAD_REQUEST)


def invalid_data_message(resp_message):
    return Response(resp_message, status=status.HTTP_400_BAD_REQUEST)


ok = Response(status=status.HTTP_200_OK)


def ok_data(resp_data=None):
    return Response(resp_data, status=status.HTTP_200_OK)


created = Response(status=status.HTTP_201_CREATED)

response = {
    'user': user_data,
    'invalid_data': invalid_data,
    'invalid_data_message': invalid_data_message,
    'ok': ok,
    'ok_data': ok_data,
    'created': created
}


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(methods=['POST'], detail=False)
    def register(self, request):
        if 'email' not in request.data:
            return response['invalid_data']

        serialized = UserSerializer(data=request.data)
        if serialized.is_valid():

            is_email_unique = User.objects.filter(email=request.data['email']).exists()
            if not is_email_unique:
                return response['user']('Email is busy')

            user = User.objects.create_user(**serialized.data)
            user.save()
            Profile.objects.create(user=user)
            return response['user']('User registered', True, status.HTTP_201_CREATED)

        if 'email' in serialized.errors:
            return response['user']('Invalid email')

        if 'username' in serialized.errors:
            return response['user']('Username is busy')

        return response['invalid_data']

    @action(methods=['POST'], detail=False)
    def check(self, request):
        if 'username' not in request.data or 'password' not in request.data:
            return response['invalid_data']

        try:
            user = User.objects.get(username=request.data['username'])
        except ObjectDoesNotExist:
            return response['user']('Unknown username')

        is_password_match = user.check_password(request.data['password'])
        if not is_password_match:
            return response['user']('Wrong password')

        return response['user']('User logged in', True)


class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    @action(methods=['POST'], detail=False)
    def set_location(self, request):
        if 'city' not in request.data or 'username' not in request.data:
            return response['invalid_data']

        user = Profile.objects.get(user__username=request.data['username'])
        if not user.set_location(request.data['city']):
            return response['ok_data']('Unknown city')

        return response['ok']

    @action(methods=['POST'], detail=False)
    def follow(self, request):
        if 'sender' not in request.data or 'receiver' not in request.data:
            return response['invalid_data']

        try:
            receiver = Profile.objects.get(user__username=request.data['receiver'])
        except ObjectDoesNotExist:
            return response['ok_data']('Wrong receiver username')

        try:
            sender = Profile.objects.get(user__username=request.data['sender'])
        except ObjectDoesNotExist:
            return response['ok_data']('Wrong sender username')

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


