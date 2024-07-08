from django.db import models
from .Person import Person



class Patient(Person):

    allergy = models.CharField(max_length=100, blank=True)

