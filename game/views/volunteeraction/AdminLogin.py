from django.shortcuts import render, redirect

def AdminLogin(request):
    Method = request.method
    if Method == "GET":
        return render(request, 'volunteeraction/AdminLogin.html')
    elif Method == "POST":
        Username = request.POST.get('Username')
        passwd = request.POST.get('passwd')
        print(Username, passwd)
        if Username == 'bjtuqingtuan' and passwd == '520@bjtuqingtuan':
            return render(request, 'volunteeraction/index_admin.html')
        else:
            error_message = '管理员账号或者密码错误！！'
            return render(request, 'volunteeraction/AdminLogin.html', {'error_message':error_message})
    return render(request, 'volunteeraction/AdminLogin.html')
