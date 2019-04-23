from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from cities_light.models import Country, City

from .serializers import UserSerializer, ProfileSerializer, CountrySerializer, CitySerializer, ResidenceSerializer
from .models import Profile, Residence


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


response = {
    'user': user_data,
    'invalid_data': invalid_data,
    'invalid_data_message': invalid_data_message,
    'ok': ok,
    'ok_data': ok_data
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

            is_email_unique = len(User.objects.filter(email=request.data['email'])) == 0
            if not is_email_unique:
                return response['user']('Email is busy')

            user = User.objects.create_user(
                **serialized.data
            )
            user.save()
            return response['user']('User registered', True, status.HTTP_201_CREATED)

        if 'email' in serialized.errors:
            return response['user']('Invalid email')

        if 'username' in serialized.errors:
            return response['user']('Username is busy')

        return response['invalid_data']

    @action(methods=['POST'], detail=False)
    def check(self, request):
        is_user_registered = len(User.objects.filter(username=request.data['username'])) != 0
        if not is_user_registered:
            return response['user']('Unknown username')

        user = User.objects.get(username=request.data['username'])
        is_password_match = user.check_password(request.data['password'])
        if not is_password_match:
            return response['user']('Wrong password')

        return response['user']('User logged in', True)


class ResidenceView(viewsets.ModelViewSet):
    serializer_class = ResidenceSerializer
    queryset = Residence.objects.all()


class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    @action(methods=['POST'], detail=True)
    def set_residence(self, request, pk):
        if 'country' not in request.data or 'city' not in request.data:
            return response['invalid_data']

        print(request.data)
        city_id = request.data['city']
        city = City.objects.get(id=int(city_id))
        country_id = request.data['country']
        country = Country.objects.get(id=int(country_id))
        if city.country.id != country_id:
            return response['invalid_data_message']('Wrong location')

        residence, is_created = Residence.objects.get_or_create(country=country, city=city)
        profile = self.get_object()
        profile.residence = residence
        profile.save()
        return response['ok']


@api_view(['GET'])
def get_countries_list(request):
    countries = Country.objects.all()
    serialized = CountrySerializer(countries, many=True)
    return response['ok_data'](serialized.data)


@api_view(['GET', 'POST'])
def get_cities_list(request):
    if request.method == 'GET':
        cities = City.objects.all()
        serialized = CitySerializer(cities, many=True)
        return response['ok_data'](serialized.data)

    if 'country' in request.data:
        country_id = request.data['country']
        cities = City.objects.filter(country=country_id)
        print(cities)
        serialized = CitySerializer(cities, many=True)
        return response['ok_data'](serialized.data)

    return response['invalid_data']


