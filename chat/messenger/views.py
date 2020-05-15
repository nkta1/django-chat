from django.shortcuts import render, redirect
from . models import Room


def load_chat(request):
    chats = Room.objects.all()
    return render(request, 'chat.html', {'chats': chats})


def load_room(request, room_id):
    if Room.objects.filter(id=room_id).exists():
        room = Room.objects.get(id=room_id)
        room_name = room.name
        room_description = room.description
        return render(request, 'room.html', {'room_id': room_id, 'room_name': room_name,
                                             'room_description': room_description})
    else:
        return redirect('/chat')
