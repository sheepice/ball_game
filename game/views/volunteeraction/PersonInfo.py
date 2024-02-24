from django.shortcuts import render
from game.model.volunteers.volunteers import StuVolunteer

def PersonInfo(request):
    Method = request.method
    if Method == 'GET':
        return render(request, 'volunteeraction/PersonInfo.html')
    if Method == 'POST':
        post_data = request.POST
        NumId = post_data.get('confirm_info')
        print(type(NumId))
        is_submit = True
        StuVolunteer.objects.filter(NumId=NumId).update(is_submit=is_submit)
        NowStu = StuVolunteer.objects.filter(NumId=NumId).first()
        return render('volunteeraction/PersonInfo.html', {'NowStu':NowStu})
    return render(request, 'volunteeraction/PersonInfo.html')
