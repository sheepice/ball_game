from game.model.player.player import Player
from rest_framework.views import APIView
from rest_framework.response import Response


class UserList(APIView):
    def get(self, request):
        players = Player.objects.all().exclude(photo="").order_by('id')[:100]
        users = []
        for player in players:
            users.append({
                'id': player.user.id,
                'username': player.user.username,
                'photo': player.photo,
                'followerCount': player.followerCount
            })
        return Response(users)

