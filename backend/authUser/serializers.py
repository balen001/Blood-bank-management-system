from .models import Donor
from .models import Donor, Patient, Hospital, Receptionist, Doctor, Appointment, Person, Request
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from datetime import datetime


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
                  'dateOfBirth', 'gender', 'bloodType', 'emergencyContact', 'diseases', 'allergy']
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


# change password serializer for users
class ChangePasswordSerializer(serializers.Serializer):
    admin_email = serializers.CharField(max_length=128)
    admin_password = serializers.CharField(max_length=128)
    id = serializers.IntegerField()
    password = serializers.CharField(max_length=128)


# change password serializer for Superuser
class ChangeSuperuserPasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(max_length=128)
    new_password = serializers.CharField(max_length=128)


# change account serializer for admin
User = get_user_model()


class SuperUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'contact_no']
        extra_kwargs = {
            'email': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
            'contact_no': {'required': False},

        }


# retrieve detail of superuser serializer

User = get_user_model()


class SuperuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'contact_no']

# ----------------------------------------Hospital-----------------------------

# Hospital adding serializer


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


# -------------------------------------------Receptionist----------------------------------
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


# -------------------------------------------Doctor-------------------------


class AddDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'contact_no', 'dateOfBirth',
                  'gender', 'speciality', 'hospital']
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






# -------------------------------------------Appointment-------------------------


class TimeFieldAMPM(serializers.Field):
    def to_representation(self, value):
        # Convert 24-hour format to 12-hour format with AM/PM
        return value.strftime('%I:%M %p')

    def to_internal_value(self, data):
        # Convert 12-hour format with AM/PM to 24-hour format
        try:
            return datetime.strptime(data, '%I:%M %p').time()
        except ValueError:
            raise serializers.ValidationError(
                "Time must be in the format HH:MM AM/PM")


class TimeFieldAMPM(serializers.Field):
    def to_representation(self, value):
        # Convert 24-hour format to 12-hour format with AM/PM
        return value.strftime('%I:%M %p')

    def to_internal_value(self, data):
        # Convert 12-hour format with AM/PM to 24-hour format
        try:
            return datetime.strptime(data, '%I:%M %p').time()
        except ValueError:
            raise serializers.ValidationError(
                "Time must be in the format HH:MM AM/PM")


class CreateAppointmentSerializer(serializers.ModelSerializer):
    start_time = TimeFieldAMPM()
    end_time = TimeFieldAMPM()
    email = serializers.EmailField(
        write_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'date', 'start_time', 'end_time',
                  'email']

    def validate_email(self, value):
        try:
            person = Person.objects.get(email=value)
            return person
        except Person.DoesNotExist:
            raise serializers.ValidationError(
                "Person with this email does not exist.")

    # you can put this for testing
    def validate(self, data):
        # Ensure no overlapping appointments
        date = data.get('date')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        person = self.validate_email(data.get('email'))

        overlapping_appointments = Appointment.objects.filter(
            date=date,
            start_time__lte=end_time,
            end_time__gte=start_time
        ).exclude(id=self.instance.id if self.instance else None)

        if overlapping_appointments.exists():
            raise serializers.ValidationError(
                "An appointment already exists for this time slot.")

        data['person'] = person  # Add person to the validated data
        return data


class DateSerializer(serializers.Serializer):
    date = serializers.DateField()


# fetching todays appointments

class TodayAppointmentSerializer(serializers.ModelSerializer):
    person_first_name = serializers.CharField(source='person.first_name')
    person_last_name = serializers.CharField(source='person.last_name')
    person_id = serializers.IntegerField(source='person.id')
    person_email = serializers.CharField(source='person.email')

    class Meta:
        model = Appointment
        fields = ['id', 'date', 'start_time', 'end_time', 'person_first_name',
                  'person_last_name', 'person_id', 'person_email']
        


class AppointmentsSerializer(serializers.ModelSerializer):
    start_time = TimeFieldAMPM()
    end_time = TimeFieldAMPM()
    class Meta:
        model = Appointment
        fields = ['id', 'date', 'start_time', 'end_time']

# ------------------------------Donor-------------------------------------


class PersonDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        # exclude = ['password']
        fields = ['id', 'first_name', 'last_name', 'email', 'diseases', 'gender',
                  'dateOfBirth', 'bloodType', 'emergencyContact', 'address',  'contact_no', 'city']

        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'email': {'required': False},
            'password': {'write_only': False},
            'contact_no': {'required': False},
            'dateOfBirth': {'required': False},
            'gender': {'required': False},
            'city': {'required': False},
            'emergencyContact': {'required': False},

        }

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # exclude = ['password']
        fields = ['id', 'first_name', 'last_name', 'email', 'gender',
                  'dateOfBirth', 'address',  'contact_no', 'city']

        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'email': {'required': False},
            'password': {'write_only': False},
            'contact_no': {'required': False},
            'dateOfBirth': {'required': False},
            'gender': {'required': False},
            'city': {'required': False},
        
        }



#---------------------------------patient----------------------------


class PatientDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        # exclude = ['password']
        fields = ['id', 'first_name', 'last_name', 'email', 'diseases', 'gender',
                  'dateOfBirth', 'bloodType', 'allergy' , 'emergencyContact', 'address',  'contact_no', 'city']

        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'email': {'required': False},
            'password': {'write_only': False},
            'contact_no': {'required': False},
            'dateOfBirth': {'required': False},
            'gender': {'required': False},
            'city': {'required': False},
            'emergencyContact': {'required': False},
            'allergy': {'required': False},
            
        }


#request serializer
class RequestSerializer(serializers.ModelSerializer):
    dedicate_blood_hospital = serializers.CharField(source='dedicatedBloodBag.hospital.name', read_only=True)
    patientFirstName = serializers.CharField(source='patient.first_name', read_only=True)
    patientLastName = serializers.CharField(source='patient.last_name', read_only=True)
    patientEmail = serializers.CharField(source='patient.email', read_only=True)
    patientBloodType = serializers.CharField(source='patient.bloodType', read_only=True)
    class Meta:
        model = Request
        fields = ['date','neededAmount', 'requestReason', 'patientFirstName', 'patientBloodType', 'patientEmail' ,'patientLastName' , 'dedicate_blood_hospital', 'patient', 'status', 'dedicatedBloodBag']

        extra_kwargs = {
            'status': {'required': False},
            'date': {'required': False},
            'dedicatedBloodBag': {'required': False},
            'dedicate_blood_hospital': {'required': False},
            'patientFirstName': {'required': False},
            'patientLastName': {'required': False},
            'patientEmail': {'required': False},
            'patientBloodType': {'required': False},
        }










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
