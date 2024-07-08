from django.shortcuts import render
from .models import Donor, Patient, User, Hospital, Receptionist, Doctor, Appointment, Person, Blood_bag, Donation_record, Request, Notification
from .models import Transfusion_record
from rest_framework import generics, serializers
from .serializers import DonorRegistrationSerializer, PatientRegistrationSerializer, AddHospitalSerializer, AddReceptionistSerializer, AddDoctorSerializer
from .serializers import ChangePasswordSerializer, SuperUserUpdateSerializer, SuperuserSerializer, ChangeSuperuserPasswordSerializer, CreateAppointmentSerializer
from .serializers import DateSerializer, TodayAppointmentSerializer, PersonDetailSerializer, AppointmentsSerializer, PatientDetailSerializer, RequestSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .permissions import IsSuperUser
from .utils import convert_to_ampm
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.utils import timezone

from .serializers import MyTokenObtainPairSerializer

User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        # print(request)
        # print(request.query_params.get('email'))
        # print("3----------------------------------------------------------------------------3")
        # user = request.user
        if Donor.objects.filter(email=request.query_params.get('email')).exists():

            user = Donor.objects.get(email=request.query_params.get('email'))

            return Response({'user_type': 'donor', 'userId': user.id, 'userName': user.first_name, 'userEmail': user.email})
        elif Patient.objects.filter(email=request.query_params.get('email')).exists():
            user = Patient.objects.get(email=request.query_params.get('email'))
            return Response({'user_type': 'patient', 'userId': user.id, 'userName': user.first_name, 'userEmail': user.email})

        elif Doctor.objects.filter(email=request.query_params.get('email')).exists():
            user = Doctor.objects.get(email=request.query_params.get('email'))
            return Response({'user_type': 'doctor', 'userId': user.id, 'userName': user.first_name, 'userEmail': user.email})

        elif Receptionist.objects.filter(email=request.query_params.get('email')).exists():
            user = Receptionist.objects.get(
                email=request.query_params.get('email'))
            return Response({'user_type': 'receptionist', 'userId': user.id, 'userName': user.first_name, 'userEmail': user.email})

        elif User.objects.filter(email=request.query_params.get('email')).exists():
            user = User.objects.get(email=request.query_params.get('email'))
            if user.is_admin:
                return Response({'user_type': 'admin', 'userId': user.id, 'userName': user.first_name, 'userEmail': user.email})


# class CreateDonorView(generics.CreateAPIView):
#     queryset = Donor.objects.all()
#     serializer_class = DonorSerializer
#     permission_classes = [AllowAny]

# class createPatientView(generics.CreateAPIView):
#     queryset = Patient.objects.all()
#     serializer_class = PatientSerializer
#     permission_classes = [AllowAny]


class AllUsersView(APIView):
    permission_classes = [IsAdminUser]  # later change it to IsSuperUser

    def get(self, request):
        users = []

        # get all doctors with their hospital names
        doctors = Doctor.objects.select_related('hospital').values(
            'id', 'email', 'first_name', 'last_name', 'hospital__name')
        for doctor in doctors:
            users.append({
                'id': doctor['id'],
                'email': doctor['email'],
                'first_name': doctor['first_name'],
                'last_name': doctor['last_name'],
                'userType': 'doctor',
                'userHospital': doctor['hospital__name']
            })

        # get all receptionists with their hospital names
        receptionists = Receptionist.objects.select_related('hospital').values(
            'id', 'email', 'first_name', 'last_name', 'hospital__name')
        for receptionist in receptionists:
            users.append({
                'id': receptionist['id'],
                'email': receptionist['email'],
                'first_name': receptionist['first_name'],
                'last_name': receptionist['last_name'],
                'userType': 'receptionist',
                'userHospital': receptionist['hospital__name']
            })

        # get all patients
        patients = Patient.objects.all().values(
            'id', 'email', 'first_name', 'last_name')
        for patient in patients:
            users.append({
                'id': patient['id'],
                'email': patient['email'],
                'userType': 'patient',
                'first_name': patient['first_name'],
                'last_name': patient['last_name'],
                'userHospital': 'Nan'
            })

        # get all donors
        donors = Donor.objects.all().values('id', 'email', 'first_name', 'last_name')
        for donor in donors:
            users.append({
                'id': donor['id'],
                'email': donor['email'],
                'first_name': donor['first_name'],
                'last_name': donor['last_name'],
                'userType': 'donor',
                'userHospital': 'Nan'
            })

        return Response(users, status=status.HTTP_200_OK)


# change other users password view (only for superuser)

class ChangePasswordView(APIView):
    permission_classes = [IsSuperUser]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            admin_email = serializer.validated_data['admin_email']
            admin_password = serializer.validated_data['admin_password']
            user_id = serializer.validated_data['id']
            new_password = serializer.validated_data['password']

            # Authenticate admin (superuser) by email
            admin = authenticate(
                request, username=admin_email, password=admin_password)
            if not admin or not admin.is_superuser:
                return Response({'error': 'Invalid admin credentials'}, status=status.HTTP_401_UNAUTHORIZED)

            # Retrieve the user instance (assuming it's managed by Django's User model)
            user = get_object_or_404(User, id=user_id)

            # Set the new password
            user.set_password(new_password)
            user.save()

            return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# delete user view
class DeleteUserView(APIView):
    permission_classes = [IsSuperUser]

    def post(self, request):
        user_id = request.data.get('user_id')

        if not user_id:
            return Response({'error': 'User ID is required in the request body.'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the user instance or return 404 if not found
        user = get_object_or_404(User, id=user_id)

        # Delete the user
        user.delete()

        return Response({'message': f'User has been deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


# Superuser detail view
class SuperuserDetailView(APIView):
    permission_classes = [IsSuperUser]

    def get(self, request):
        # Retrieve the superuser
        superuser = User.objects.filter(is_superuser=True).first()

        # Serialize the superuser data
        serializer = SuperuserSerializer(superuser)

        return Response(serializer.data)


# Update superuser view

class UpdateSuperUserView(APIView):
    permission_classes = [IsSuperUser]

    def put(self, request, *args, **kwargs):
        user = request.user

        if not user.is_superuser:
            return Response({'error': 'Only superusers can update their information'}, status=status.HTTP_403_FORBIDDEN)

        serializer = SuperUserUpdateSerializer(
            user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Change superuser password view
class ChangeSuperuserPasswordView(APIView):

    permission_classes = [IsSuperUser]

    def post(self, request, *args, **kwargs):
        serializer = ChangeSuperuserPasswordSerializer(data=request.data)
        if serializer.is_valid():
            current_password = serializer.validated_data['current_password']
            new_password = serializer.validated_data['new_password']

            User = get_user_model()
            superuser = User.objects.filter(is_superuser=True).first()

            if not superuser:
                return Response({'error': 'Superuser not found.'}, status=status.HTTP_404_NOT_FOUND)

            if not check_password(current_password, superuser.password):
                return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

            superuser.set_password(new_password)
            superuser.save()

            return Response({'message': 'Superuser password changed successfully.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create person view
class CreatePersonView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):

        print(request.data)

        if 'register_as' in request.data:

            if request.data['register_as'] == 'donor':
                serializer = DonorRegistrationSerializer(data=request.data)

            elif request.data['register_as'] == 'patient':
                serializer = PatientRegistrationSerializer(data=request.data)

        else:
            return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddHospitalView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, format=None):
        print(request.data)
        serializer = AddHospitalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HospitalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        hospitals = Hospital.objects.all().values('id', 'name')

        if (hospitals):
            return Response(list(hospitals), status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

        # [{"id":17,"name":"Rizgary"}]               // retrieval data


# -----------------------Receptionist-----------------------
class AddReceptionistView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, format=None):
        # print("from view: ")
        # print(request.data)
        serializer = AddReceptionistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ----------------------Doctor----------------------------------

class AddDoctorView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, format=None):
        # print("from view: ")
        # print(request.data)
        serializer = AddDoctorSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllPersonsView(APIView):
    permission_classes = [IsAdminUser]  # later change it to IsDoctor document it in testing

    def get(self, request):
        users = []

        # get all patients
        patients = Patient.objects.all().values(
            'id', 'email', 'gender', 'dateOfBirth', 'address', 'city'  , 'contact_no' ,'first_name', 'last_name', 'emergencyContact', 'bloodType', 'diseases', 'allergy' )
        for patient in patients:
            users.append({
                'id': patient['id'],
                'email': patient['email'],
                'first_name': patient['first_name'],
                'last_name': patient['last_name'],
                'diseases': patient['diseases'],
                'bloodType': patient['bloodType'],
                'emergencyContact': patient['emergencyContact'],
                'allergy': patient['allergy'],
                'gender': patient['gender'],
                'dateOfBirth': patient['dateOfBirth'],
                'contact_no': patient['contact_no'],
                'address': patient['address'],
                'city': patient['city'],
                'userType': 'patient',
                

            })

        # get all donors
        donors = Donor.objects.all().values('id', 'dateOfBirth', 'address', 'city', 'contact_no', 'email', 'gender' , 'first_name', 'last_name', 'emergencyContact', 'bloodType', 'diseases')
        for donor in donors:
            users.append({
                'id': donor['id'],
                'email': donor['email'],
                'first_name': donor['first_name'],
                'last_name': donor['last_name'],
                'bloodType': donor['bloodType'],
                'emergencyContact': donor['emergencyContact'],
                'diseases': donor['diseases'],
                'gender': donor['gender'],
                'address': donor['address'],
                'city': donor['city'],
                'dateOfBirth': donor['dateOfBirth'],
                'contact_no': donor['contact_no'],
                'userType': 'donor',
                
            })

        return Response(users, status=status.HTTP_200_OK)





# {

#             "first_name": "Rebin",
#             "last_name": "Ahmed",
#             "email": "rebin@gmail.com",
#             "password": "Slaw@1212",
#             "contact_no": "+96475027515363",
#             "dateOfBirth": "2000-01-01",
#             "gender": "Male",
#             "speciality": "BDS",
#             "hospital": 17

#     }


# ----------------------Appointment----------------------------------

# Everyone can set appointment change this later
class AppointmentCreateView(generics.CreateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = CreateAppointmentSerializer
    queryset = Appointment.objects.all()

    def perform_create(self, serializer):

        person = serializer.validated_data.pop('email', None)
        if person:
            serializer.save(person=person)
        else:
            raise serializers.ValidationError("Email is required.")


class TakenTimeslotsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = DateSerializer(data=request.data)
        if serializer.is_valid():
            date = serializer.validated_data['date']
            appointments = Appointment.objects.filter(date=date)

            taken_timeslots = []
            for appointment in appointments:
                start_time = convert_to_ampm(appointment.start_time)
                end_time = convert_to_ampm(appointment.end_time)
                taken_timeslots.append(f"{start_time} - {end_time}")

            return Response(taken_timeslots, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# to fetch todays appointments

class TodayAppointmentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        appointments = Appointment.objects.filter(date=today)
        serializer = TodayAppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# delete appointment

class DeleteAppointmentView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, appointment_id):
        # Retrieve the appointment or return 404 if not found
        appointment = get_object_or_404(Appointment, id=appointment_id)

        # Delete the appointment
        appointment.delete()

        return Response({'message': 'Appointment deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


# List appointments
class PersonAppointmentsListView(generics.ListAPIView):
    serializer_class = AppointmentsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # assuming donor_id is passed as a URL parameter
        person_id = self.kwargs['person_id']
        return Appointment.objects.filter(person__id=person_id).order_by('-date', '-start_time')


# ------------------------------donor-------------------------

class DonorDetailView(generics.RetrieveAPIView):
    parser_classes = [IsAuthenticated]

    queryset = Donor.objects.all()
    serializer_class = PersonDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'


# updates donor & patient but not receptionist and doctor
class UpdateDonorDetailsView(generics.UpdateAPIView):
    queryset = Donor.objects.all()
    serializer_class = PersonDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserDetailView(generics.RetrieveAPIView):
    parser_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = PersonDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'


class UpdateUserAccountView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = PersonDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateDonationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        donor_email = data.get('donorEmail')
        blood_type = data.get('bloodType')
        amount = data.get('amount')
        hospital_id = data.get('hospital')

        # Validate the data
        if not donor_email or not blood_type or not amount or not hospital_id:
            return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the donor
        donor = get_object_or_404(Donor, email=donor_email)

        # Check for diseases
        forbidden_diseases = [
            "HIV/AIDS", "Hepatitis B", "Hepatitis C", "Cancer", "Heart Disease",
            "Chronic Kidney Disease", "Multiple Sclerosis", "Lupus", "Hemophilia",
            "Sickle Cell Disease", "Chagas Disease"
        ]

        if any(disease in donor.diseases for disease in forbidden_diseases):
            return Response({'error': 'Donor has a disease that disqualifies them from donating blood.'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the hospital
        hospital = get_object_or_404(Hospital, id=hospital_id)

        # Create Blood_bag
        created_blood_bags = []
        for _ in range(amount):
            blood_bag = Blood_bag.objects.create(
                bloodType=blood_type,
                hospital=hospital
            )
            created_blood_bags.append(blood_bag)

        blood_bags_data = []

        for blood_bag in created_blood_bags:
            blood_bags_data.append({
                'id': blood_bag.id,
                'bloodType': blood_bag.bloodType,
                'hospital': blood_bag.hospital.name,
                'created_at': blood_bag.created_at
            }
            )

        # Create Donation_record
        donation_record = Donation_record.objects.create(
            amount=amount,
            donor=donor
        )

        return Response({
            'message': 'Donation recorded successfully.',
            'blood_bags': blood_bags_data,
            'donation_record': {
                'id': donation_record.id,
                'amount': donation_record.amount,
                'donor': donor.email,
                'date': donation_record.date,
                'time': donation_record.time
            }
        }, status=status.HTTP_201_CREATED)


# change donor/patient/Doctor/Receptionist password


class ChangeDonorPatientDoctorReceptionistPasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data.get('id')
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')

        if not user_id or not current_password or not new_password:
            return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the user instance (Donor or Patient)
        donor = Donor.objects.filter(id=user_id).first()
        patient = Patient.objects.filter(id=user_id).first()
        doctor = Doctor.objects.filter(id=user_id).first()
        receptionist = Receptionist.objects.filter(id=user_id).first()

        if donor:
            user = donor
        elif patient:
            user = patient
        elif receptionist:
            user = receptionist
        elif doctor:
            user = doctor
        else:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        if not check_password(current_password, user.password):
            return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password
        user.set_password(new_password)
        user.save()

        return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)


# ---------------------patient-------------------------------


class PatientDetailView(generics.RetrieveAPIView):
    parser_classes = [IsAuthenticated]

    queryset = Patient.objects.all()
    serializer_class = PatientDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'


class UpdatePatientDetailsView(generics.UpdateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


# -------------------Request-------------------------------------
class CreateRequestView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            patient_id = validated_data.pop('patient')
            validated_data['patient'] = patient_id
            request_instance = Request.objects.create(**validated_data)
            response_serializer = RequestSerializer(request_instance)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListPatientRequestsView(generics.ListAPIView):
    serializer_class = RequestSerializer

    def get_queryset(self):
        patient_id = self.kwargs['patient_id']
        return Request.objects.filter(patient_id=patient_id)


class ListAllRequestsView(generics.ListAPIView):

    queryset = Request.objects.all().order_by('-date', '-time')
    serializer_class = RequestSerializer


# Blood bag dedication
NOT_ELIGIBLE_ALLERGIES = [
    "Severe Allergic reaction (anaphylaxis)",
    "Allergic to human blood products",
    "Allergic to albumin",
    "Allergic to anticoagulants"
]

NOT_ELIGIBLE_DISEASES = [
    "HIV/AIDS", "Hepatitis B", "Hepatitis C", "Cancer", "Heart Disease",
    "Chronic Kidney Disease", "Multiple Sclerosis", "Lupus", "Hemophilia", "Sickle Cell Disease", "Chagas Disease"
]

# Define the blood type compatibility dictionary
BLOOD_TYPE_COMPATIBILITY = {
    "A+": ["A+", "A-", "O+", "O-"],
    "A-": ["A-", "O-"],
    "B+": ["B+", "B-", "O+", "O-"],
    "B-": ["B-", "O-"],
    "AB+": ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
    "AB-": ["AB-", "A-", "B-", "O-"],
    "O+": ["O+", "O-"],
    "O-": ["O-"]
}


class DedicateBloodBagView(APIView):

    def post(self, request):
        print(f'Received POST request with data: {request.data}')
        patient_id = request.data.get('patientId')
        patient_blood_type = request.data.get('patientBloodType')
        request_id = request.data.get('requestId')
        request_result = request.data.get('result')

        # Retrieve the patient and request instances
        try:
            patient = Patient.objects.get(id=patient_id)
            req = Request.objects.get(id=request_id)
        except Patient.DoesNotExist:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)
        except Request.DoesNotExist:
            return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if (request_result== "Accepted"):
            # Check if patient has any ineligible allergies
            if patient.allergy in NOT_ELIGIBLE_ALLERGIES:
                return Response({'message': 'Patient has an ineligible allergy'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if patient has any ineligible diseases
            if any(disease in NOT_ELIGIBLE_DISEASES for disease in patient.diseases):
                return Response({'message': 'Patient has an ineligible disease'}, status=status.HTTP_400_BAD_REQUEST)

            # Check for compatible blood bags that are not already dedicated
            compatible_blood_types = BLOOD_TYPE_COMPATIBILITY.get(
                patient_blood_type, [])
            compatible_blood_bag = Blood_bag.objects.filter(
                bloodType__in=compatible_blood_types,
                Dedicated_BloodBags__isnull=True  # Filter out blood bags that are already dedicated
            ).first()

            if not compatible_blood_bag:
                return Response({'message': 'No compatible blood bag available'}, status=status.HTTP_400_BAD_REQUEST)

            # Dedicate the compatible blood bag to the request
            req.dedicatedBloodBag = compatible_blood_bag
            req.status = "Accepted"
            req.save()


            hospital_name = compatible_blood_bag.hospital.name

            # Create notification for the patient
            message = f"A blood bag from {hospital_name} has been dedicated to your request."
            notification = Notification.objects.create(message=message, recipient=patient)

            return Response({'message': 'Blood bag dedicated successfully'}, status=status.HTTP_200_OK)
    

        elif request_result == "Rejected":
            req.status = "Rejected"
            req.save()
            message = f"Your request with request id: {request_id} has been rejected."
            notification = Notification.objects.create(message=message, recipient=patient)

            return Response({'message': 'Request rejected successfully'}, status=status.HTTP_200_OK)
        
        
        elif request_result == "Transfused":
            
            
            # Create the transfusion record
            Transfusion_record.objects.create(receivedAmount=1, patient=patient)

            dedicated_blood_bag = req.dedicatedBloodBag
            req.delete()
            if dedicated_blood_bag:
                dedicated_blood_bag.delete()

            return Response({'message': 'Transfusion recorded successfully'}, status=status.HTTP_200_OK)

        else:
            return Response({'error': 'Invalid request result'}, status=status.HTTP_400_BAD_REQUEST)
        

