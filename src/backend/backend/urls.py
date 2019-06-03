from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from api import views


router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users')
router.register(r'profiles', views.ProfileView, 'profiles')
router.register(r'posts', views.PostView, 'posts')
router.register(r'comments', views.CommentView, 'comments')
router.register(r'communities', views.CommunityView, 'communities')

urlpatterns = [
    path('', views.root),
    path('admin/', admin.site.urls),
    path('auth/', obtain_jwt_token),
    path('refresh/', refresh_jwt_token),
    path('verify/', verify_jwt_token),
    path('api/', include(router.urls)),
    path('api/countries/', views.get_countries_list),
    path('api/cities/', views.get_cities_list)
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

