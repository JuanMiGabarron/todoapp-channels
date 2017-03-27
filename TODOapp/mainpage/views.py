from django.shortcuts import render, HttpResponse
from mainpage.models import Todo
from django.core import serializers

import json


def index(request):
    return render(request, 'mainpage/index.html')