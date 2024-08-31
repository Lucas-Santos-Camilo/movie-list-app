import requests
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import FavoriteMovie
from .serializers import FavoriteMovieSerializer
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
import logging

logger = logging.getLogger(__name__)

class FavoriteMovieViewSet(viewsets.ModelViewSet):
    queryset = FavoriteMovie.objects.all()
    serializer_class = FavoriteMovieSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def add_favorite(self, request, pk=None):
        user = request.user
        title = request.data.get('title', '')
        poster_path = request.data.get('poster_path', '')

        if FavoriteMovie.objects.filter(user=user, movie_id=pk).exists():
            logger.info(f"Movie with ID {pk} already in favorites for user {user.id}")
            return Response({'status': 'Movie already in favorites'}, status=status.HTTP_400_BAD_REQUEST)

        FavoriteMovie.objects.create(user=user, title=title, movie_id=pk, rating=0.0, poster_path=poster_path)
        logger.info(f"Added movie with ID {pk} to favorites for user {user.id}")
        return Response({'status': 'Movie added to favorites'}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'])
    def remove_favorite(self, request, pk=None):
        user = request.user
        favorite_movie = FavoriteMovie.objects.filter(user=user, movie_id=pk).first()
        if not favorite_movie:
            logger.info(f"Movie with ID {pk} not found in favorites for user {user.id}")
            return Response({'status': 'Movie not in favorites'}, status=status.HTTP_404_NOT_FOUND)

        favorite_movie.delete()
        logger.info(f"Removed movie with ID {pk} from favorites for user {user.id}")
        return Response({'status': 'Movie removed from favorites'}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'], url_path='your-list')
    def list_favorites(self, request):
        user = request.user
        favorite_movies = FavoriteMovie.objects.filter(user=user)
        
        tmdb_api_key = settings.TMDB_API_KEY 
        tmdb_url = "https://api.themoviedb.org/3/movie/"
        
        session = requests.Session()
        movies_data = []
        for fav in favorite_movies:
            try:
                response = session.get(f"{tmdb_url}{fav.movie_id}", params={'api_key': tmdb_api_key})
                response.raise_for_status()  
                movie_data = response.json()
                
                movies_data.append({
                    'id': movie_data.get('id'),
                    'title': movie_data.get('title'),
                    'poster_path': movie_data.get('poster_path'),
                    'release_date': movie_data.get('release_date'),
                    'vote_average': movie_data.get('vote_average'),
                    'overview': movie_data.get('overview')
                })
            except requests.RequestException as e:
                logger.error(f"Error fetching movie details from TMDb for ID {fav.movie_id}: {e}")
                return Response({'status': 'Error fetching movie details from TMDb'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(movies_data)
