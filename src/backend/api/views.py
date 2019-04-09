# from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from .serializers import UserSerializer


def create_response_data(req_message='', req_data=None):
    return {
        'message': req_message,
        'data': req_data
    }


@api_view(['GET', 'POST'])
def general(request):
    if 'appointment' not in request.data:
        return Response(create_response_data('appointment missed', request.data), status=status.HTTP_400_BAD_REQUEST)

    if request.data['appointment'] == 'register':
        is_username_free = len(User.objects.filter(username=request.data['username'])) == 0
        if is_username_free:

            serialized = UserSerializer(data=request.data)
            if serialized.is_valid():
                serialized.save()
                return Response(create_response_data('user registered', request.data), status.HTTP_201_CREATED)

            return Response(create_response_data('invalid data', request.data), status=status.HTTP_400_BAD_REQUEST)

        return Response(create_response_data('busy username', request.data), status.HTTP_200_OK)

    if request.data['appointment'] == 'check':

        is_user_registered = \
            len(User.objects.filter(username=request.data['username'])) != 0
        if not is_user_registered:
            return Response(create_response_data('no user', request.data), status=status.HTTP_200_OK)

        is_password_match = \
            User.objects.filter(username=request.data['username'])[0] == request.data['password']
        if not is_password_match:
            return Response(create_response_data('wrong password', request.data), status=status.HTTP_200_OK)

        return Response(create_response_data('match', request.data), status=status.HTTP_200_OK)






