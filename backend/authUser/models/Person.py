from django.db import models
from .User import User

class Person(User):

    bloodType = models.CharField(max_length=3, blank=True, null=True)
    emergencyContact = models.CharField(max_length=100)
    diseases = models.JSONField(default=list, blank=True, null=True)
    




    # class Meta:
    #     abstract = True
