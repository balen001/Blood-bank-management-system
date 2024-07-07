from django.db import models
from .Patient import Patient
class Request(models.Model):

    neededAmount = models.IntegerField()
    requestReason = models.CharField(max_length=100, blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='Requests')
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    status = models.CharField(default="Pending", max_length=100, blank=True)    #0: pending 1:accepted 2: rejected

