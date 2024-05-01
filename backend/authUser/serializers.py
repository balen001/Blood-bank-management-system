from .models import Donor, Patient
from rest_framework import serializers


class DonorRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ['id', 'first_name', 'last_name', 'email', 'password',
                  'contact_no', 'dateOfBirth', 'gender', 'bloodType', 'diseases']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},  # it should at least receive ''
            'email': {'required': True},
            'password': {'write_only': True},
            'contact_no': {'required': True},
            'dateOfBirth': {'required': False},  # 'dateOfBirth': '2000-01-01
            'gender': {'required': True},
            'bloodType': {'required': True},
            'diseases': {'required': False},

            # first_name = models.CharField(max_length=100, null=False, blank=False)
            # last_name = models.CharField(max_length=100, blank=True) #Only '' is allowed
            # email = models.EmailField(_('email'), max_length=150, unique=True, null=False, blank=False)
            # password = models.CharField(max_length=100, null=False, blank=False)
            # contact_no = models.CharField(max_length=15, unique=True, null=True)
            # address = models.CharField(max_length=200)
            # gender = models.CharField(max_length=10)
            # dateOfBirth = models.DateField(null=True)
            # is_active = models.BooleanField(default=True)
            # is_staff = models.BooleanField(default=False)
            # is_admin = models.BooleanField(default=False)
            # created_at = models.DateTimeField(auto_now_add=True)
            # bloodType = models.CharField(max_length=3)
            # emergencyContact = models.CharField(max_length=100)
            # diseases = models.CharField(max_length=200)


        }

    def create(self, validated_data):
        return Donor.objects.create(**validated_data)


class PatientRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'contact_no', 'dateOfBirth', 'gender', 'bloodType', 'emergencyContact', 'diseases', 'allergies']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},  # it should at least receive ''
            'email': {'required': True},
            'password': {'write_only': True},
            'contact_no': {'required': True},
            'dateOfBirth': {'required': False},  # 'dateOfBirth': '2000-01-01
            'gender': {'required': True},
            'bloodType': {'required': True},
            'emergencyContact': {'required': False},
            'diseases': {'required': False},
            'allergies': {'required': False},

        }

        # first_name = models.CharField(max_length=100, null=False, blank=False)
        # last_name = models.CharField(max_length=100, blank=True) #Only '' is allowed
        # email = models.EmailField(_('email'), max_length=150, unique=True, null=False, blank=False)
        # password = models.CharField(max_length=100, null=False, blank=False)
        # contact_no = models.CharField(max_length=15, unique=True, null=True)
        # address = models.CharField(max_length=200)
        # gender = models.CharField(max_length=10)
        # dateOfBirth = models.DateField(null=True)
        # is_active = models.BooleanField(default=True)
        # is_staff = models.BooleanField(default=False)
        # is_admin = models.BooleanField(default=False)
        # created_at = models.DateTimeField(auto_now_add=True)
        # bloodType = models.CharField(max_length=3)
        # emergencyContact = models.CharField(max_length=100)
        # diseases = models.CharField(max_length=200)
        # allergies = models.JSONField(blank=True, null=True)

    def create(self, validated_data):
        return Patient.objects.create(**validated_data)
