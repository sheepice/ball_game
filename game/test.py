import os
import sys
import django
sys.path.append('/home/acs/ball_game')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'acapp.settings')
django.setup()

from game.model.volunteers.volunteers import StuVolunteer

StuVolunteer.objects.create(StuName="王佳威", StuId="21281201", NumId="1", StuAge=20, StuAdress1="广西柳州市城站路百草", StuAdress2="北京市北京交通大学嘉园B", StuShirt="3XL", StuTrousers="2XL", StuGender="男", Action_id = 1, StuCollege="22")
