# Generated by Django 5.0.4 on 2024-07-06 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authUser', '0006_alter_person_diseases'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='city',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
