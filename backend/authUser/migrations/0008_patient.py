# Generated by Django 5.0.4 on 2024-04-28 18:46

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authUser', '0007_remove_user_username'),
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('bloodType', models.CharField(max_length=3)),
                ('emergencyContact', models.CharField(max_length=100)),
                ('disease', models.CharField(max_length=200)),
                ('allergies', models.JSONField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('authUser.user',),
        ),
    ]
