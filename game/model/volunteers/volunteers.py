from django.db import models

class VolunteerAction(models.Model):
    VA_name = models.CharField(verbose_name = "志愿活动名称", max_length = 32)
    VA_content = models.CharField(verbose_name = "活动简介", max_length = 50)

class StuVolunteer(models.Model):
    StuName = models.CharField(verbose_name = "志愿者姓名", max_length = 10)
    StuId = models.CharField(verbose_name = "志愿者学号", max_length = 8)
    NumId = models.CharField(verbose_name = "志愿者身份证号", max_length = 18)
    StuAge = models.IntegerField(verbose_name = "志愿者年龄")
    StuAdress1 = models.CharField(verbose_name = "志愿者户籍地", max_length = 50)
    StuAdress2 = models.CharField(verbose_name = "志愿者现住址", max_length = 50)
    StuShirt = models.CharField(verbose_name = "志愿者上衣尺寸", max_length = 4)
    StuTrousers = models.CharField(verbose_name = "志愿者裤子尺寸", max_length = 4)
    StuGender = models.CharField(verbose_name = "志愿者性别", max_length = 2)
    StuCollege = models.CharField(verbose_name = "志愿者学院", max_length = 20, default='-w-')
    is_submit = models.BooleanField(default=False)
    Action = models.ForeignKey(to = "VolunteerAction", to_field = "id", on_delete = models.CASCADE)
