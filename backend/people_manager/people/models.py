from django.db import models

# Create your models here.

class Person(models.Model):
  personal_id = models.CharField(max_length=20, primary_key=True)
  full_name = models.CharField(max_length=200)