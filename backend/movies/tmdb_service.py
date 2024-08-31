import requests

TMDB_API_KEY = 'process.env.REACT_APP_TMDB_API_KEY'
TMDB_BASE_URL = 'https://api.themoviedb.org/3'

def search_movies(query):
    response = requests.get(f'{TMDB_BASE_URL}/search/movie', params={
        'api_key': TMDB_API_KEY,
        'query': query
    })
    return response.json()
