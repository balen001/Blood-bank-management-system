from .models import Donor, Patient
from rest_framework import serializers

class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ['id','first_name', 'last_name', 'email','password', 'bloodType', 'emergencyContact', 'disease', 'noOfDonations']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            'bloodType': {'required': False},
            'emergencyContact': {'required': False},
            'disease': {'required': False},
            'password': {'write_only': True},
            'noOfDonations': {'required': False}
            
        }
    
    def create(self, validated_data):
        return Donor.objects.create(**validated_data)

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'bloodType', 'emergencyContact', 'disease', 'allergies']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            'bloodType': {'required': False},
            'emergencyContact': {'required': False},
            'disease': {'required': False},
            'password': {'write_only': True},
            'allergies': {'required': False}
        }

    def create(self, validated_data):
        return Patient.objects.create(**validated_data)
    

