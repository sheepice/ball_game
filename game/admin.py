from django.contrib import admin
from game.model.player.player import Player # 引入自己定义的数据表
from game.model.myspace.follow import Follow
from game.model.myspace.post import Post
from game.model.volunteers.volunteers import VolunteerAction
from game.model.volunteers.volunteers import StuVolunteer


admin.site.register(Player) # 注册这个数据表
admin.site.register(Follow)
admin.site.register(Post)
admin.site.register(VolunteerAction)
admin.site.register(StuVolunteer)
# Register your models here.
