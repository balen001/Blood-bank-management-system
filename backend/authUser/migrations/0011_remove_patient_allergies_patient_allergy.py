# Generated by Django 5.0.4 on 2024-07-07 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authUser', '0010_alter_patient_allergies'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='allergies',
        ),
        migrations.AddField(
            model_name='patient',
            name='allergy',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]