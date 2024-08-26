from django.db import models
from django.contrib.auth.models import User

class FavoriteMovie(models.Model):
    title = models.CharField(max_length=255)
    movie_id = models.IntegerField()
    rating = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
