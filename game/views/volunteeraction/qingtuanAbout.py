from django.shortcuts import render

def qingtuanAbout(request):
    Method = request.method
    if Method == 'GET':
        return render(request, 'volunteeraction/qingtuanAbout.html')

    return render(request, 'volunteeraction.qingtuanAbout.html')
