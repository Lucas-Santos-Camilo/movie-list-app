import requests # type: ignore

TMDB_API_KEY = 'c1270f490dff37ccb01ff7fbe275ec99'
TMDB_BASE_URL = 'https://api.themoviedb.org/3'

def search_movies(query):
    response = requests.get(f'{TMDB_BASE_URL}/search/movie', params={
        'api_key': TMDB_API_KEY,
        'query': query
    })
    return response.json()
