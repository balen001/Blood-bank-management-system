from django.db import models
from .Person import Person



class Patient(Person):
    # allergies = models.JSONField(default=list, blank=True)
    allergy = models.CharField(max_length=100, blank=True)

