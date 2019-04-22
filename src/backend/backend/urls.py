from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users')
router.register(r'profiles', views.ProfileView, 'profiles')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/locations/countries/', views.get_countries_list),
    path('api/locations/regions/', views.get_regions_list)
    # path('api/locations/', include('cities_light.contrib.restframework3'))
]

