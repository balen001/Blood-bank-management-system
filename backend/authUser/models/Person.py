from django.db import models
from .User import User

class Person(User):

    bloodType = models.CharField(max_length=3)
    emergencyContact = models.CharField(max_length=100)
    diseases = models.CharField(max_length=200, blank=True, null=True)
    allergies = models.JSONField(blank=True, null=True)




    class Meta:
        abstract = True
