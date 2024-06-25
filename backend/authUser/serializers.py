from .models import Donor, Patient, Hospital, Receptionist, Doctor
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        print("Creating tokens...")
        token = super().get_token(user)
        token['email'] = user.email
        token['is_admin'] = user.is_admin
        return token

    def validate(self, attrs):
        print("Validating user credentials for token creation...")
        data = super().validate(attrs)

        print(f"User {self.user.email} authenticated, creating tokens...")
        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['email'] = self.user.email
        data['is_admin'] = self.user.is_admin

        return data


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
            'contact_no': {'required': False},
            'dateOfBirth': {'required': False},  # 'dateOfBirth': '2000-01-01
            'gender': {'required': True},
            'bloodType': {'required': True},
            'diseases': {'required': False},
            'allergies': {'required': False},

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
        validated_data['password'] = make_password(validated_data['password'])
        # print("Creating Donor..: " + str(validated_data))
        return Donor.objects.create(**validated_data)


class PatientRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'contact_no',
                  'dateOfBirth', 'gender', 'bloodType', 'emergencyContact', 'diseases', 'allergies']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},  # it should at least receive ''
            'email': {'required': True},
            'password': {'write_only': True},
            'contact_no': {'required': False},
            'dateOfBirth': {'required': False},  # 'dateOfBirth': '2000-01-01
            'gender': {'required': True},
            'bloodType': {'required': True},
            'emergencyContact': {'required': False},
            'diseases': {'required': False},


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
        validated_data['password'] = make_password(validated_data['password'])
        # print("Creating Patient..: " + str(validated_data))
        return Patient.objects.create(**validated_data)



#----------------------------------------Hospital-----------------------------

#Hospital adding serializer
class AddHospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['id', 'name',  'contact_no', 'city']
        extra_kwargs = {
            'name': {'required': True},
            'contact_no': {'required': True},
            'city': {'required': True},

        }

    def create(self, validated_data):
        # print("Creating Hospital..: " + str(validated_data))
        return Hospital.objects.create(**validated_data)










#-------------------------------------------Receptionist----------------------------------
# Receptionist serializer
class AddReceptionistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receptionist
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'contact_no', 'dateOfBirth',
                  'gender', 'hospital']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},  # it should at least receive ''
            'email': {'required': True},
            'password': {'write_only': True},
            'contact_no': {'required': False},
            'dateOfBirth': {'required': False},  # 'dateOfBirth': '2000-01-01
            'gender': {'required': True},
            'hospital': {'required': True},
            'is_staff': {'default': True, 'required': False},

        }

    def create(self, validated_data):

        print("from create: ")
        print(validated_data)

        


        validated_data['password'] = make_password(
            validated_data.get('password'))


        validated_data['is_staff'] = True

        # print("Creating Receptionist..: " + str(validated_data))
        return Receptionist.objects.create(**validated_data)
    


# {
    
#             "first_name": "Balen",
#             "last_name": "Ahmed",
#             "email": "receptionist@gmail.com",
#             "password": "Slaw@1212",
#             "contact_no": "+9647503068963",
#             "dateOfBirth": "2000-01-01",
#             "gender": "Male",
#             "hospital": 17    //Remember 17 is a number NOT string!!!!!!!!!!!!!!!!!!!!!!!
    
#     }













#-------------------------------------------Doctor-------------------------



class AddDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'contact_no', 'dateOfBirth',
                  'gender', 'speciality' ,'hospital']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},  # it should at least receive ''
            'email': {'required': True},
            'password': {'write_only': True},
            'contact_no': {'required': False},
            'dateOfBirth': {'required': False},  # 'dateOfBirth': '2000-01-01
            'gender': {'required': True},
            'hospital': {'required': True},
            'speciality': {'required': True},
            'is_staff': {'default': True, 'required': False},

        }

    def create(self, validated_data):

        print("from create doctor ser: ")
        print(validated_data)

        


        validated_data['password'] = make_password(
            validated_data.get('password'))


        validated_data['is_staff'] = True

        # print("Creating Receptionist..: " + str(validated_data))
        return Doctor.objects.create(**validated_data)


# {
    
#             "first_name": "Rebin",
#             "last_name": "Ahmed",
#             "email": "rebin@gmail.com",
#             "password": "Slaw@1212",
#             "contact_no": "+96475027515363",
#             "dateOfBirth": "2000-01-01",
#             "gender": "Male",
#             "speciality": "BDS",
#             "hospital": 17        //Remember 17 is a number NOT string!!!!!!!!!!!!!!!!!!!!!!!
    
# }













# class AdminRegistrationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Admin
#         fields = ['id', 'first_name', 'last_name', 'email', 'password', 'contact_no', 'dateOfBirth', 'gender', 'is_active', 'is_staff', 'is_admin']
#         extra_kwargs = {
#             'first_name': {'required': True},
#             'last_name': {'required': True},  # it should at least receive ''
#             'email': {'required': True},
#             'password': {'write_only': True},
#             'contact_no': {'required': False},
#             'dateOfBirth': {'required': False},  # 'dateOfBirth': '2000-01-01
#             'gender': {'required': True},

#         }

# #         # first_name = models.CharField(max_length=100, null=False, blank=False)
# #         # last_name = models.CharField(max_length=100, blank=True) #Only '' is allowed
# #         # email = models.EmailField(_('email'), max_length=150, unique=True, null=False, blank=False)
# #         # password = models.CharField(max_length=100, null=False, blank=False)
# #         # contact_no = models.CharField(max_length=15, unique=True, null=True)
# #         # address = models.CharField(max_length=200)
# #         # gender = models.CharField(max_length=10)
# #         # dateOfBirth = models.DateField(null=True)
#         # is_active = models.BooleanField(default=True)
#         # is_staff = models.BooleanField(default=False)
#         # is_admin = models.BooleanField(default=False)
# #         # created_at = models.DateTimeField(auto_now_add=True)
# #         # bloodType = models.CharField(max_length=3)
# #         # emergencyContact = models.CharField(max_length=100)
# #         # diseases = models.CharField(max_length=200)
# #         # allergies = models.JSONField(blank=True, null=True)

    # def create(self, validated_data):
    #     validated_data['password'] = make_password(validated_data['password'])
    #     #print("Creating Admin..: " + str(validated_data))
    #     return Admin.objects.create(**validated_data)
