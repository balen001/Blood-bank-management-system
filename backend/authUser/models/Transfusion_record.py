from django.db import models
from .Patient import Patient
class Transfusion_record(models.Model):

    receivedAmount = models.IntegerField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='Transfusion_records')
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)

