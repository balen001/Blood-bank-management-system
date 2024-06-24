from django.db import models
from .Hospital import Hospital

class Blood_bag(models.Model):

    bloodType = models.CharField(max_length=100)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='Blood_bags')
    created_at = models.DateTimeField(auto_now_add=True)





