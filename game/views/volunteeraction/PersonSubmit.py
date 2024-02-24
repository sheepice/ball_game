
from django.shortcuts import render, redirect
from game.model.volunteers.volunteers import StuVolunteer

def PersonSubmit(request):
    if request.method == 'POST':
        post_data = request.POST
        StuName = post_data.get('StuName')
        StuId = post_data.get('StuId')
        NumId = post_data.get('NumId')
        StuAge = post_data.get('StuAge')
        StuAge = int(StuAge)
        StuCollege = post_data.get('StuCollege')
        StuAdress1 = post_data.get('StuAdress1')
        StuAdress2 = post_data.get('StuAdress2')
        StuShirt = post_data.get('StuShirt')
        StuTrousers = post_data.get('StuTrousers')
        StuGender = post_data.get('StuGender')
        img=request.FILES['ImgFile']
        img_path = '/home/acs/ball_game/static/stu/' + NumId + '.jpg'
        if img.size > 1024*500:
            error_message='照片大小不能超过500KB'
            return render(request, 'volunteeraction/PersonSubmit.html', {'error_message':error_message})
        if StuVolunteer.objects.filter(StuName=StuName).exists():
            StuVolunteer.objects.filter(StuName=StuName).update(StuName=StuName, StuId=StuId, NumId=NumId, StuAge=20, StuAdress1=StuAdress1, StuAdress2=StuAdress2, StuShirt=StuShirt, StuTrousers=StuTrousers, StuGender=StuGender, Action_id = 1, StuCollege=StuCollege)
        else:
            StuVolunteer.objects.create(StuName=StuName, StuId=StuId, NumId=NumId, StuAge=20, StuAdress1=StuAdress1, StuAdress2=StuAdress2, StuShirt=StuShirt, StuTrousers=StuTrousers, StuGender=StuGender, Action_id = 1, StuCollege=StuCollege)
        with open(img_path, 'wb') as f:
            for x in img.chunks():
                f.write(x)
        return redirect('../InfoCheck')
    return render(request, 'volunteeraction/PersonSubmit.html')
