# your_app_name/views.py
from django.shortcuts import render, redirect
from game.model.students.students import Person
def index(request):
    if request.method == 'POST':
        id_number = request.POST['id_number']
        try:
            person = Person.objects.get(id_number=id_number)
            context = {
                'name': person.name,
                'image_url': person.image_url,
                'gender': person.gender,
                'shirt_size': person.shirt_size,
                'pants_size': person.pants_size,
            }
            return render(request, 'searchinfo/person_info.html', context)
        except Person.DoesNotExist:
            error_message = '该身份证号不存在，请重新输入。'
            return render(request, 'searchinfo/index.html', {'error_message': error_message})
    return render(request, 'searchinfo/index.html')

