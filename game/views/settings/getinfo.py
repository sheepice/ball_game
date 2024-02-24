from django.http import JsonResponse
from game.model.player.player import Player

def getinfo_web(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            'result':"not-login",
    })
    player = Player.objects.filter(user=user)[0];
    return JsonResponse({
        'result':"suceess",
        'username':player.user.username,
        'photo':player.photo,
        })

def getinfo_other(request):
    player = Player.objects.all()[0]
    return JsonResponse({
        'result':"suceess",
        'username':player.user.username,
        'photo':player.photo,
        })

def getinfo(request):
    platform = request.GET.get('platform')
    if(platform == "WEB"):
        return getinfo_web(request)
    else:
        return getinfo_other(request)
