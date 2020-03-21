from django.urls import path

from . import views

urlpatterns = [
    path("person/", views.PersonList.as_view(), name="person_list"),
    path("person/<int:pk>/", views.PersonDetail.as_view(), name="person_detail"),
    path("track/", views.PossibleTrackList.as_view(), name="person_list"),
    path("track/<int:pk>/", views.PossibleTrackDetail.as_view(), name="person_detail"),
    path("preference/", views.PossiblePreferenceList.as_view(), name="person_list"),
    path(
        "preference/<int:pk>/",
        views.PossiblePreferenceDetail.as_view(),
        name="person_detail",
    ),
    path("subject/", views.PossibleSubjectList.as_view(), name="person_list"),
    path(
        "subject/<int:pk>/", views.PossibleSubjectDetail.as_view(), name="person_detail"
    ),
    path("status/", views.PossibleStatusList.as_view(), name="person_list"),
    path(
        "status/<int:pk>/", views.PossibleStatusDetail.as_view(), name="person_detail"
    ),
]
