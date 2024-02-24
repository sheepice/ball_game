from django.shortcuts import render

def InputComment(request):
    score = 10
    movie_type = ''''''
    if request.method == 'POST':
        post_data = request.POST
        comment = ''''''
        comment = post_data.get('floatingTextarea2')
        select_option = post_data.get('flexRadioDefault')
        movie_type = ''''''
        if select_option == 'c1':
            movie_type = '''喜剧'''
        elif select_option == 'c2':
            movie_type = '''悬疑'''
        elif select_option == 'c3':
            movie_type = '''动作冒险'''
        elif select_option == 'c4':
            movie_type = '''动画'''
        elif select_option == 'c5':
            movie_type = '''爱情'''
        else:
            movie_type = '''剧情'''
        return render(request, 'volunteeraction/InputComment.html', {'score':10, 'comment':comment, 'movie_type':movie_type})
    return render(request, 'volunteeraction/InputComment.html', {'movie_type': movie_type})
