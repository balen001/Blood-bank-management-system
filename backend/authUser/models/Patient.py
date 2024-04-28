from django.db import models
from .Person import Person



class Patient(Person):
    allergies = models.JSONField(blank=True, null=True)

