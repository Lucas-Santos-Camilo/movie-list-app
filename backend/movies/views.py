from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import FavoriteMovie
from .serializers import FavoriteMovieSerializer

class FavoriteMovieViewSet(viewsets.ModelViewSet):
    queryset = FavoriteMovie.objects.all()
    serializer_class = FavoriteMovieSerializer
