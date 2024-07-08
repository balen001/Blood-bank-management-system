from django.db import models
from .Person import Person


class Notification(models.Model):

    message = models.CharField(max_length=250)
    recipient = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='notifications', null=True)

    created_at = models.DateTimeField(auto_now_add=True)



    # Assuming you have a Notification instance named notification
    # persons = notification.recipients.all()

    # Assuming you have a Person instance named person
    # notifications = person.notifications.all()