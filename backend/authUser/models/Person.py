from django.db import models
from .User import User

class Person(User):

    bloodType = models.CharField(max_length=3)
    emergencyContact = models.CharField(max_length=100)
    disease = models.CharField(max_length=200)




    class Meta:
        abstract = True
