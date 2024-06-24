from django.db import models
from .User import User
from .Hospital import Hospital

class Medical_staff(User):

    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='Medical_staff')

    # class Meta:
    #     abstract = True

