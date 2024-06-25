from django.db import models
from .Medical_staff import Medical_staff

class Doctor(Medical_staff):
    
    speciality = models.CharField(max_length=250)


