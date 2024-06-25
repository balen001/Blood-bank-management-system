# Generated by Django 5.0.4 on 2024-06-25 12:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authUser', '0003_alter_user_address'),
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('medical_staff_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authUser.medical_staff')),
                ('speciality', models.CharField(max_length=250)),
            ],
            options={
                'abstract': False,
            },
            bases=('authUser.medical_staff',),
        ),
    ]
