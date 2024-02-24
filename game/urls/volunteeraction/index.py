from django.urls import path
from game.views.volunteeraction.index import index
from game.views.volunteeraction.AdminLogin import AdminLogin
from game.views.volunteeraction.index_admin import index_admin
from game.views.volunteeraction.InfoCheck import InfoCheck
from game.views.volunteeraction.PersonInfo import PersonInfo
from game.views.volunteeraction.qingtuanAbout import qingtuanAbout
from game.views.volunteeraction.PersonSubmit import PersonSubmit
from game.views.volunteeraction.InputComment import InputComment

urlpatterns = [
    path("index/", index, name="volunteeraction_index"),
    path("AdminLogin/", AdminLogin, name="volunteeraction_AdminLogin"),
    path("index_admin/", index_admin, name="volunteeraction_index_admin"),
    path("InfoCheck/", InfoCheck, name="volunteeraction_InfoCheck"),
    path("PersonInfo/", PersonInfo, name="volunteeraction_PersonInfo"),
    path('PersonSubmit/', PersonSubmit, name="volunteeraction_PersonSubmit"),
    path("qingtuanAbout/", qingtuanAbout, name="volunteeraction_qingtuanAbout"),
    path("InputComment/", InputComment, name="InputComment"),
    ]
