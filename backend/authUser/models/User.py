from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _

# Create your models here.





class CustomUserManager(BaseUserManager):

    def create_superuser(self, email, first_name, last_name, password=None, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must be assigned to is_staff=True.'))
        if other_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must be assigned to is_superuser=True.'))
        
        return self.create_user(email, first_name, last_name, password, **other_fields)



    def create_user(self, email, first_name, last_name, password=None, **other_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        if not first_name:
            raise ValueError(_('The First Name must be set'))
        if not password:
            raise ValueError(_('The Password must be set'))
        
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **other_fields)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=100, null=False, blank=False)
    last_name = models.CharField(max_length=100, blank=True)                 #Only '' is allowed
    email = models.EmailField(_('email'), max_length=150, unique=True, null=False, blank=False)
    password = models.CharField(max_length=100, null=False, blank=False)
    contact_no = models.CharField(max_length=15, unique=True, null=True, blank=True)
    address = models.CharField(max_length=200)
    dateOfBirth = models.DateField(null=True)
    gender = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    #profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)

    
    objects = CustomUserManager()








    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['first_name', 'last_name']
    def __str__(self):
        return self.email
    
