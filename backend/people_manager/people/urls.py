from django.urls import path

from . import views

urlpatterns = [
    path("person/", views.get_all_people, name="get_all_people"),
    path("settings/", views.get_people_settings, name="get_people_settings"),
]
