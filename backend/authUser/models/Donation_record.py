from django.db import models
from .Donor import Donor
class Donation_record(models.Model):

    amount = models.IntegerField()
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE, related_name='Blood_bags')
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)

