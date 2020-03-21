from django.db import models


class PossiblePersonStringField(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        abstract = True


class PossibleStatus(PossiblePersonStringField):
    pass


class PossibleAvailability(PossiblePersonStringField):
    pass


class Person(models.Model):
    personal_id = models.CharField(max_length=20, primary_key=True)
    full_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    status = models.ForeignKey(PossibleStatus, on_delete=models.PROTECT)
    team = models.CharField(max_length=50, default="")
    availability = models.ForeignKey(PossibleAvailability, on_delete=models.PROTECT)
    wasSegel = models.BooleanField(verbose_name="was segel", default=False)
    remarks = models.CharField(max_length=1000, default="")


class PossiblePersonStringArrayField(models.Model):
    """
    All of the person fields that are a list of strings currently have the same
    fields.
    This is an abstract class which the inherit from.
    """

    name = models.CharField(max_length=50, unique=True)
    # In case this field isn't relevant as in you won't create new people with this
    # value set this field to false.
    # Please note that the field will remain in people that have it already.
    relevant = models.BooleanField(verbose_name="relevant", default=True)

    def __str__(self):
        return self.name

    class Meta:
        abstract = True


class PossibleSubject(PossiblePersonStringArrayField):
    people = models.ManyToManyField(Person, related_name="subjects")


class PossibleTrack(PossiblePersonStringArrayField):
    people = models.ManyToManyField(Person, related_name="tracks")


class PossiblePreference(PossiblePersonStringArrayField):
    people = models.ManyToManyField(Person, related_name="preferences")
