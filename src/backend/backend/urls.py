from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users')
router.register(r'profiles', views.ProfileView, 'profiles')
router.register(r'residences', views.ResidenceView, 'residences')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/locations/countries/', views.get_countries_list),
    path('api/locations/cities/', views.get_cities_list)
]

