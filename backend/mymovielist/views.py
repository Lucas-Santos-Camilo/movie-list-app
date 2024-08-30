# mymovielist/views.py

from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return HttpResponse("Welcome to the homepage!")

def your_list(request):
    return HttpResponse("This is your list.")