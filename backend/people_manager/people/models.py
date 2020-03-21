from django.db import models

# Create your models here.

class Person(models.Model):
  full_name = models.CharField(max_length=200)