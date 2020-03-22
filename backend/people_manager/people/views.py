from .models import (
    Person,
    PossiblePreference,
    PossibleSubject,
    PossibleTrack,
    PossibleStatus,
    PossibleAvailability,
)
from django.http import JsonResponse
from django.core.serializers import serialize


def get_all_people(request):
    return JsonResponse(
        {"people": [person.to_json() for person in Person.objects.all()]}
    )

def get_people_settings(request):
    relevant_subjects = _format_settings(PossibleSubject.objects.filter(relevant=True))
    relevant_tracks = _format_settings(PossibleTrack.objects.filter(relevant=True))
    relevant_preferences = _format_settings(PossiblePreference.objects.filter(relevant=True))
    relevant_status = _format_settings(PossibleStatus.objects.all())
    relevant_availabilities = _format_settings(PossibleAvailability.objects.all())
    return JsonResponse(
        {
            "settings": {
                "possibleSubjects": relevant_subjects,
                "possibleTracks": relevant_tracks,
                "possiblePreferences": relevant_preferences,
                "possibleStatus": relevant_status,
                "possibleAvailabilities": relevant_availabilities,
            }
        }
    )

def _format_settings(settings):
    return [str(setting) for setting in settings]