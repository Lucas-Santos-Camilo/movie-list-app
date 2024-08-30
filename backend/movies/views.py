from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import FavoriteMovie
from .serializers import FavoriteMovieSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated

class FavoriteMovieViewSet(viewsets.ModelViewSet):
    queryset = FavoriteMovie.objects.all()
    serializer_class = FavoriteMovieSerializer
    permission_classes = [IsAuthenticated]  # Permite acesso apenas a usuários autenticados

    @action(detail=True, methods=['post'])
    def add_favorite(self, request, pk=None):
        movie = self.get_object()
        user = request.user  # Obtém o usuário autenticado

        if FavoriteMovie.objects.filter(user=user, movie_id=movie.id).exists():
            return Response({'status': 'Movie already in favorites'}, status=status.HTTP_400_BAD_REQUEST)

        # Associa o filme ao usuário autenticado
        FavoriteMovie.objects.create(user=user, movie=movie)
        return Response({'status': 'Movie added to favorites'}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'])
    def remove_favorite(self, request, pk=None):
        movie = self.get_object()
        user = request.user  # Obtém o usuário autenticado

        favorite_movie = FavoriteMovie.objects.filter(user=user, movie_id=movie.id).first()
        if not favorite_movie:
            return Response({'status': 'Movie not in favorites'}, status=status.HTTP_404_NOT_FOUND)

        favorite_movie.delete()
        return Response({'status': 'Movie removed from favorites'}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'], url_path='your-list')
    def list_favorites(self, request):
        user = request.user  # Obtém o usuário autenticado
        favorite_movies = FavoriteMovie.objects.filter(user=user)
        serializer = FavoriteMovieSerializer(favorite_movies, many=True)
        return Response(serializer.data)
