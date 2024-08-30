from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import FavoriteMovie
from .serializers import FavoriteMovieSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

class FavoriteMovieViewSet(viewsets.ModelViewSet):
    queryset = FavoriteMovie.objects.all()
    serializer_class = FavoriteMovieSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['post'])
    def add_favorite(self, request, pk=None):
        movie = self.get_object()
        general_user = User.objects.get(username='general_user')

        if FavoriteMovie.objects.filter(user=general_user, movie_id=movie.id).exists():
            return Response({'status': 'Movie already in favorites'}, status=status.HTTP_400_BAD_REQUEST)

        FavoriteMovie.objects.create(user=general_user, movie=movie)
        return Response({'status': 'Movie added to favorites'}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'])
    def remove_favorite(self, request, pk=None):
        movie = self.get_object()
        general_user = User.objects.get(username='general_user')

        favorite_movie = FavoriteMovie.objects.filter(user=general_user, movie_id=movie.id).first()
        if not favorite_movie:
            return Response({'status': 'Movie not in favorites'}, status=status.HTTP_404_NOT_FOUND)

        favorite_movie.delete()
        return Response({'status': 'Movie removed from favorites'}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'], url_path='your-list')
    def list_favorites(self, request):
        general_user = User.objects.get(username='general_user')
        favorite_movies = FavoriteMovie.objects.filter(user=general_user)
        serializer = FavoriteMovieSerializer(favorite_movies, many=True)
        return Response(serializer.data)
