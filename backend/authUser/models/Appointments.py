from django.db import models
from .Person import Person

class Appointment(models.Model):
    
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    person = models.ForeignKey(Person, related_name='appointments', on_delete=models.CASCADE)
