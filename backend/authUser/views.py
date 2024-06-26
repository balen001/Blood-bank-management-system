from django.shortcuts import render
from .models import Donor, Patient, User, Hospital, Receptionist, Doctor
from rest_framework import generics
from .serializers import DonorRegistrationSerializer, PatientRegistrationSerializer, AddHospitalSerializer, AddReceptionistSerializer, AddDoctorSerializer
from .serializers import ChangePasswordSerializer, SuperUserUpdateSerializer, SuperuserSerializer, ChangeSuperuserPasswordSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
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

            return Response({'user_type': 'donor', 'userId': user.id, 'userName': user.first_name})
        elif Patient.objects.filter(email=request.query_params.get('email')).exists():
            user = Patient.objects.get(email=request.query_params.get('email'))
            return Response({'user_type': 'patient', 'userId': user.id, 'userName': user.first_name})
        elif User.objects.filter(email=request.query_params.get('email')).exists():
            user = User.objects.get(email=request.query_params.get('email'))
            if user.is_admin:
                return Response({'user_type': 'admin', 'userId': user.id, 'userName': user.first_name})


# class CreateDonorView(generics.CreateAPIView):
#     queryset = Donor.objects.all()
#     serializer_class = DonorSerializer
#     permission_classes = [AllowAny]

# class createPatientView(generics.CreateAPIView):
#     queryset = Patient.objects.all()
#     serializer_class = PatientSerializer
#     permission_classes = [AllowAny]


class AllUsersView(APIView):
    permission_classes = [IsAdminUser]

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
    permission_classes = [IsAdminUser]

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


#delete user view
class DeleteUserView(APIView):
    permission_classes = [IsAdminUser]

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
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Retrieve the superuser
        superuser = User.objects.filter(is_superuser=True).first()

        # Serialize the superuser data
        serializer = SuperuserSerializer(superuser)

        return Response(serializer.data)




# Update superuser view

class UpdateSuperUserView(APIView):
    permission_classes = [IsAdminUser]

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
