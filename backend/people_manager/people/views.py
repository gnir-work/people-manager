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

