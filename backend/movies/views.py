from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import FavoriteMovie
from .serializers import FavoriteMovieSerializer

class FavoriteMovieViewSet(viewsets.ModelViewSet):
    queryset = FavoriteMovie.objects.all()
    serializer_class = FavoriteMovieSerializer

    @action(detail=True, methods=['post'])
    def add_favorite(self, request, pk=None):
        movie = self.get_object()
        # Aqui você pode adicionar lógica para associar o filme ao usuário
        # Exemplo: movie.user = request.user
        movie.save()
        return Response({'status': 'Movie added to favorites'}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'])
    def remove_favorite(self, request, pk=None):
        movie = self.get_object()
        # Aqui você pode adicionar lógica para desassociar o filme do usuário
        # Exemplo: movie.user = None
        movie.delete()
        return Response({'status': 'Movie removed from favorites'}, status=status.HTTP_204_NO_CONTENT)
