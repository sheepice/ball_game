from django.urls import path, include
from game.views.index import index

urlpatterns = [
    path('', index, name="index"),
    path('menu/', include("game.urls.menu.index")),
    path('playground/', include("game.urls.playground.index")),
    path('settings/', include("game.urls.settings.index")),
    path("myspace/", include("game.urls.myspace.index")),
    path("students/",include("game.urls.searchinfo.index")),
    path("bjtuqingtuan/", include("game.urls.volunteeraction.index"))
]
