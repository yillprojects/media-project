from rest_framework import viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from .serializers import UserSerializer


def create_response_data(req_message='', req_data=None, is_success=False):
    return {
        'message': req_message,
        'user': req_data,
        'success': is_success
    }


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(methods=['POST'], detail=False)
    def register(self, request):
        serialized = UserSerializer(data=request.data)
        if serialized.is_valid():
            user = User.objects.create_user(
                **serialized.data
            )
            user.save()
            return Response(create_response_data('User registered', request.data, True), status=status.HTTP_201_CREATED)
        return Response(create_response_data('Invalid data', request.data), status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=False)
    def check(self, request):
        is_user_registered = len(User.objects.filter(username=request.data['username'])) != 0
        if not is_user_registered:
            return Response(create_response_data('Username is unknown', request.data), status=status.HTTP_200_OK)

        user = User.objects.get(username=request.data['username'])
        is_password_match = user.check_password(request.data['password'])
        if not is_password_match:
            return Response(create_response_data('Wrong password', request.data), status=status.HTTP_200_OK)

        return Response(create_response_data('User logged in', request.data, True), status=status.HTTP_200_OK)





