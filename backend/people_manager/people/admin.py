from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from people.models import (
    Person,
    PossibleSubject,
    PossibleTrack,
    PossiblePreference,
    PossibleStatus,
    PossibleAvailability,
)

# Register your models here.
admin.site.register(PossiblePreference)
admin.site.register(PossibleSubject)
admin.site.register(PossibleTrack)
admin.site.register(PossibleStatus)
admin.site.register(PossibleAvailability)
