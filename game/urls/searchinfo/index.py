from django.urls import path
from game.views.searchinfo.index import index

urlpatterns=[
    path("index/",index, name="searchinfo_index")
        ]
