from django.db import models
from django.contrib.auth.models import User

class FavoriteMovie(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorite_movies')
    title = models.CharField(max_length=255)
    movie_id = models.IntegerField()
    rating = models.FloatField()
    poster_path = models.CharField(max_length=255, blank=True, null=True) 

    def __str__(self):
        return f"{self.title} - {self.user.username}"
