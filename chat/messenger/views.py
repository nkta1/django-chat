from django.shortcuts import render


def load_chat(request):
    return render(request, 'chat.html')
