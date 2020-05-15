from django.urls import path
from . import views

urlpatterns = [
    path('', views.load_chat, name='chat'),
    path('<int:room_id>/', views.load_room, name='chat_room')
]