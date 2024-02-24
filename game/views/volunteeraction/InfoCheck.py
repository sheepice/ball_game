from django.shortcuts import render
import os
import sys
from game.model.volunteers.volunteers import StuVolunteer

def InfoCheck(request):
    Method = request.method
    if Method == 'GET':
        return render(request, 'volunteeraction/InfoCheck.html')
    elif Method == 'POST':
        post_data = request.POST
        NumId = post_data.get('NumId')
        if StuVolunteer.objects.filter(NumId=NumId, Action_id=1).exists():
            print("yes")
            Student = StuVolunteer.objects.filter(NumId=NumId, Action_id=1).first()
            return render(request, 'volunteeraction/PersonInfo.html', {'Student':Student})
        else:
            print("no")
            error_message = "并没有此志愿者的信息，请确认信息无误！！"
            return render(request, 'volunteeraction/InfoCheck.html', {'error_message':error_message})

    return render(request, 'volunteeraction/InfoCheck.html')
