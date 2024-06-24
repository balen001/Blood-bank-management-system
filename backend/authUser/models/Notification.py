from django.db import models
from .Person import Person


class Notification(models.Model):

    message = models.CharField(max_length=250)
    recipients = models.ManyToManyField(Person, related_name='notifications')
    # Assuming you have a Notification instance named notification
    # persons = notification.recipients.all()

    # Assuming you have a Person instance named person
    # notifications = person.notifications.all()
    created_at = models.DateTimeField(auto_now_add=True)
