# Generated by Django 5.0.4 on 2024-04-28 09:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admin', '0003_logentry_add_action_flag_choices'),
        ('auth', '0012_alter_user_first_name_max_length'),
        ('authUser', '0002_alter_user_last_name'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='SuperUser',
        ),
    ]
