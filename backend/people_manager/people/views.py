from .models import (
    Person,
    PossiblePreference,
    PossibleSubject,
    PossibleTrack,
    PossibleStatus,
    PossibleAvailability
)
from .serializers import (
    PersonSerializer,
    PossiblePreferenceSerializer,
    PossibleSubjectSerializer,
    PossibleTrackSerializer,
    PossibleStatusSerializer,
    PossibleAvailabilitySerializer
)
from rest_framework import generics, permissions
from people_manager import settings

PERMISSIONS = [permissions.IsAuthenticated] if not settings.DEBUG else []


class PersonList(generics.ListCreateAPIView):
    permission_classes = PERMISSIONS

    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class PersonDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = PERMISSIONS

    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class PossibleSubjectList(generics.ListCreateAPIView):
    permission_classes = PERMISSIONS

    queryset = PossibleSubject.objects.all()
    serializer_class = PossibleSubjectSerializer


class PossibleSubjectDetail(generics.RetrieveUpdateAPIView):
    permission_classes = PERMISSIONS

    queryset = PossibleSubject.objects.all()
    serializer_class = PossibleSubjectSerializer


class PossiblePreferenceList(generics.ListCreateAPIView):
    permission_classes = PERMISSIONS

    queryset = PossiblePreference.objects.all()
    serializer_class = PossiblePreferenceSerializer


class PossiblePreferenceDetail(generics.RetrieveUpdateAPIView):
    permission_classes = PERMISSIONS

    queryset = PossiblePreference.objects.all()
    serializer_class = PossiblePreferenceSerializer


class PossibleTrackList(generics.ListCreateAPIView):
    permission_classes = PERMISSIONS

    queryset = PossibleTrack.objects.all()
    serializer_class = PossibleTrackSerializer


class PossibleTrackDetail(generics.RetrieveUpdateAPIView):
    permission_classes = PERMISSIONS

    queryset = PossibleTrack.objects.all()
    serializer_class = PossibleTrackSerializer


class PossibleStatusList(generics.ListCreateAPIView):
    permission_classes = PERMISSIONS

    queryset = PossibleStatus.objects.all()
    serializer_class = PossibleStatusSerializer


class PossibleStatusDetail(generics.RetrieveUpdateAPIView):
    permission_classes = PERMISSIONS

    queryset = PossibleStatus.objects.all()
    serializer_class = PossibleStatusSerializer


class PossibleAvailabilityList(generics.ListCreateAPIView):
    permission_classes = PERMISSIONS

    queryset = PossibleAvailability.objects.all()
    serializer_class = PossibleAvailabilitySerializer


class PossibleAvailabilityDetail(generics.RetrieveUpdateAPIView):
    permission_classes = PERMISSIONS

    queryset = PossibleAvailability.objects.all()
    serializer_class = PossibleAvailabilitySerializer
