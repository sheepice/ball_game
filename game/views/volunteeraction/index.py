import os
from django.conf import settings
from django.shortcuts import render

def index(request):
    Method = request.method
    if Method == 'GET':
        return render(request, 'volunteeraction/index.html')

    return render(request, 'volunteeraction/index.html')
