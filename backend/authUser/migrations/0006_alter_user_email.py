# Generated by Django 5.0.4 on 2024-04-28 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authUser', '0005_donor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=150, unique=True, verbose_name='email'),
        ),
    ]
