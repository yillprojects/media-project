from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from cities_light.models import Country, Region, City
from cities_light.contrib.restframework3 import CitySerializer, RegionSerializer

from .serializers import UserSerializer, ProfileSerializer, ResidenceSerializer, CountrySerializer
from .models import Profile, Residence


def user_data(req_message='', req_data=None, is_success=False):
    return {
        'message': req_message,
        'user': req_data,
        'success': is_success
    }


response = {
    'user': user_data
}


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(methods=['POST'], detail=False)
    def register(self, request):
        serialized = UserSerializer(data=request.data)
        if serialized.is_valid():
            is_email_unique = len(User.objects.filter(email=request.data['email'])) == 0
            if not is_email_unique:
                return Response(response['user']('Email is busy', request.data), status=status.HTTP_200_OK)
            user = User.objects.create_user(
                **serialized.data
            )
            user.save()
            return Response(response['user']('User registered', request.data, True), status=status.HTTP_201_CREATED)
        if 'email' in serialized.errors:
            return Response(response['user']('Invalid email', request.data), status=status.HTTP_200_OK)
        if 'username' in serialized.errors:
            return Response(response['user']('Username is busy', request.data), status=status.HTTP_200_OK)
        return Response(response['user']('Invalid data', request.data), status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=False)
    def check(self, request):
        is_user_registered = len(User.objects.filter(username=request.data['username'])) != 0
        if not is_user_registered:
            return Response(response['user']('Username is unknown', request.data),
                            status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(username=request.data['username'])
        is_password_match = user.check_password(request.data['password'])
        if not is_password_match:
            return Response(response['user']('Wrong password', request.data), status=status.HTTP_200_OK)

        return Response(response['user']('User logged in', request.data, True), status=status.HTTP_200_OK)


class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


@api_view(['GET, POST'])
def get_countries_list(request):
    countries = Country.objects.all()
    serialized = CountrySerializer(countries, many=True)
    return Response(serialized.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_regions_list(request):
    regions = Region.objects.all()
    serialized = RegionSerializer(regions, many=True)
    return Response(serialized.data, status=status.HTTP_200_OK)

    # @action(methods=['GET', 'POST'], detail=False, url_path='residence/country')
    # def country(self, request):
    #     if request.method == 'GET':
    #         countries = Country.objects.all()
    #         serialized = CountrySerializer(countries, many=True)
    #         return Response(serialized.data, status=status.HTTP_200_OK)



