# Generated by Django 5.0.4 on 2024-07-06 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authUser', '0004_doctor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='donor',
            name='noOfDonations',
        ),
        migrations.AlterField(
            model_name='person',
            name='diseases',
            field=models.JSONField(blank=True, null=True),
        ),
    ]