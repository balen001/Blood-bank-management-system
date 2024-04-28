from django.db import models
from .Person import Person



class Donor(Person):
    noOfDonations = models.IntegerField(default=0, blank=True, null=True)