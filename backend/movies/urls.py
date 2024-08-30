from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FavoriteMovieViewSet

router = DefaultRouter()
router.register(r'favorite-movies', FavoriteMovieViewSet, basename='favorite-movie')

urlpatterns = [
    path('', include(router.urls)),
]