from django.db import models

class Hospital(models.Model):

    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    contact_no = models.CharField(max_length=15, unique=True, null=True, blank=True)
    
    
