# 用 Django 自带的基类扩充
from django.db import models # 从django的数据库中引入models
from django.contrib.auth.models import User # 从django中引入这个基本的User类

class Player(models.Model): # 要从models.Model这个类来继承
        user = models.OneToOneField(User, on_delete  = models.CASCADE)
        photo = models.URLField(max_length = 256, blank = True)
        openid = models.CharField(default="", max_length=50, blank=True, null=True)
        score = models.IntegerField(default=1500)
        followerCount = models.IntegerField(default=0)
        def __str__(self): # 返回一个对象的描述信息
            return str(self.user)
