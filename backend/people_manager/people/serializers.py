from rest_framework import serializers
import json
from rest_framework.renderers import JSONRenderer
from .models import (
    Person,
    PossiblePreference,
    PossibleSubject,
    PossibleTrack,
    PossibleStatus,
    PossibleAvailability,
)
from collections import OrderedDict


POSSIBLE_STRING_ARRAY_FIELDS = ["name", "relevant"]


class ModifiedRelatedField(serializers.RelatedField):
    """
    A modified version of RelatedField which allows to serialize the data as a dict.
    """

    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        if queryset is None:
            # Ensure that field.choices returns something sensible
            # even when accessed with a read-only field.
            return {}

        if cutoff is not None:
            queryset = queryset[:cutoff]

        return OrderedDict([(item.pk, self.display_value(item)) for item in queryset])


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


class PossibleAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PossibleAvailability
        fields = ["name"]


class PersonStringRelatedField(serializers.RelatedField):
    model = None

    def get_queryset(self):
        return self.model.objects.all()

    def to_internal_value(self, data: str):
        return self.model.objects.get(name=data)

    def to_representation(self, value):
        return value.name


class PersonStatusField(PersonStringRelatedField):
    model = PossibleStatus


class PersonAvailabilityField(PersonStringRelatedField):
    model = PossibleAvailability


class PersonStringArrayRelatedField(ModifiedRelatedField):
    model = None

    def get_queryset(self):
        return self.model.objects.all()

    def to_internal_value(self, data: dict):
        return self.model.objects.get(name=data["name"])

    def to_representation(self, value):
        return {"name": value.name, "relevant": value.relevant}


class PersonSubjectField(PersonStringArrayRelatedField):
    model = PossibleSubject


class PersonTrackField(PersonStringArrayRelatedField):
    model = PossibleTrack


class PersonPreferenceField(PersonStringArrayRelatedField):
    model = PossiblePreference


class PersonSerializer(serializers.ModelSerializer):
    subjects = PersonSubjectField(many=True)
    tracks = PersonTrackField(many=True)
    preferences = PersonPreferenceField(many=True)
    status = PersonStatusField(many=False)
    availability = PersonAvailabilityField(many=False)

    class Meta:
        model = Person
        fields = "__all__"
