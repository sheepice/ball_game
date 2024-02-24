from django.shortcuts import render

def index_admin(request):
    Method = request.method
    if Method == 'GET':
        return render(request, 'volunteeraction/index_admin.html')

    return render(request, 'volunteeraction/index_admin.html')
