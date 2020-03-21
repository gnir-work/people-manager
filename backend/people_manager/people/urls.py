from django.urls import path

from . import views

urlpatterns = [
    path('', views.person_list, name='person_list'),
    path('<int:pk>/', views.person_detail, name='person_detail'),
]