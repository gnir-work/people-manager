from rest_framework import serializers
from .models import (
    Person,
    PossiblePreference,
    PossibleSubject,
    PossibleTrack,
    PossibleStatus,
)


POSSIBLE_STRING_ARRAY_FIELDS = ["name", "relevant"]


class PossibleSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = PossibleSubject
        fields = POSSIBLE_STRING_ARRAY_FIELDS


class PossibleTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = PossibleTrack
        fields = POSSIBLE_STRING_ARRAY_FIELDS


class PossiblePreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PossiblePreference
        fields = POSSIBLE_STRING_ARRAY_FIELDS


class PossibleStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PossibleStatus
        fields = ["name"]


class PersonSerializer(serializers.ModelSerializer):
    subjects = PossibleSubjectSerializer(many=True)
    tracks = PossibleTrackSerializer(many=True)
    preferences = PossiblePreferenceSerializer(many=True)
    status = serializers.StringRelatedField(many=False)

    class Meta:
        model = Person
        fields = [
            "full_name",
            "personal_id",
            "phone",
            "status",
            "team",
            "availability",
            "wasSegel",
            "remarks",
            "subjects",
            "preferences",
            "tracks",
        ]
