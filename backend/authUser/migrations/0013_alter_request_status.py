# Generated by Django 5.0.4 on 2024-07-07 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authUser', '0012_alter_donation_record_donor_request_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='status',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
