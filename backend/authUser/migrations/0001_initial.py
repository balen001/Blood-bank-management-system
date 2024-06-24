# Generated by Django 5.0.4 on 2024-06-24 17:38

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(blank=True, max_length=100)),
                ('email', models.EmailField(max_length=150, unique=True, verbose_name='email')),
                ('password', models.CharField(max_length=100)),
                ('contact_no', models.CharField(blank=True, max_length=15, null=True, unique=True)),
                ('address', models.CharField(max_length=200)),
                ('dateOfBirth', models.DateField(null=True)),
                ('gender', models.CharField(max_length=10)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('contact_no', models.CharField(blank=True, max_length=15, null=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Medical_staff',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('hospital', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Medical_staff', to='authUser.hospital')),
            ],
            options={
                'abstract': False,
            },
            bases=('authUser.user',),
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('bloodType', models.CharField(blank=True, max_length=3, null=True)),
                ('emergencyContact', models.CharField(max_length=100)),
                ('diseases', models.CharField(blank=True, max_length=200, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('authUser.user',),
        ),
        migrations.CreateModel(
            name='Blood_bag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bloodType', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('hospital', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Blood_bags', to='authUser.hospital')),
            ],
        ),
        migrations.CreateModel(
            name='Receptionist',
            fields=[
                ('medical_staff_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authUser.medical_staff')),
            ],
            options={
                'abstract': False,
            },
            bases=('authUser.medical_staff',),
        ),
        migrations.CreateModel(
            name='Donor',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authUser.person')),
                ('noOfDonations', models.IntegerField(blank=True, default=0, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('authUser.person',),
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authUser.person')),
                ('allergies', models.JSONField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('authUser.person',),
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=250)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('recipients', models.ManyToManyField(related_name='notifications', to='authUser.person')),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='authUser.person')),
            ],
        ),
    ]
