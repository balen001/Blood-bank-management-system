# Generated by Django 5.0.4 on 2024-05-17 23:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authUser', '0011_alter_user_contact_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donor',
            name='bloodType',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='bloodType',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
    ]
