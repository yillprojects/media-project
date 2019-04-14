from rest_framework import viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from .serializers import UserSerializer


def create_response_data(req_message='', req_data=None, is_success=False):
    return {
        'message': req_message,
        'data': req_data,
        'success': is_success
    }


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(methods=['POST'], detail=True)
    def fuck(self, request):
        user = self.get_object()
        User.objects.create_user('fucked ' + request.data['username'], password=request.data['password'])


@api_view(['GET', 'POST'])
def login(request):
    if request.method == 'GET':
        users = User.objects.all()
        serialized_users = UserSerializer(users, many=True)
        return Response(serialized_users.data)
    if 'appointment' not in request.data:
        return Response(create_response_data('appointment missed', request.data), status=status.HTTP_400_BAD_REQUEST)

    if request.data['appointment'] == 'register':
        is_username_free = len(User.objects.filter(username=request.data['username'])) == 0
        if is_username_free:

            serialized = UserSerializer(data=request.data)
            if serialized.is_valid():
                serialized.save()
                return Response(create_response_data('User registered', request.data, True), status.HTTP_201_CREATED)

            return Response(create_response_data('invalid data', request.data), status=status.HTTP_400_BAD_REQUEST)

        return Response(create_response_data('Username is busy', request.data), status.HTTP_200_OK)

    if request.data['appointment'] == 'check':

        is_user_registered = \
            len(User.objects.filter(username=request.data['username'])) != 0
        if not is_user_registered:
            return Response(create_response_data('Username is unknown', request.data), status=status.HTTP_200_OK)

        is_password_match = \
            len(User.objects.filter(username=request.data['username']).filter(password=request.data['password'])) != 0
        if not is_password_match:
            return Response(create_response_data('Wrong password', request.data), status=status.HTTP_200_OK)

        return Response(create_response_data('User logged in', request.data, True), status=status.HTTP_200_OK)






