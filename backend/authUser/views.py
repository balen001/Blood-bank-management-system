from django.shortcuts import render
from .models import Donor, Patient, User, Hospital
from rest_framework import generics
from .serializers import DonorRegistrationSerializer, PatientRegistrationSerializer, AddHospitalSerializer, AddReceptionistSerializer, AddDoctorSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializers import MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        # print(request)
        # print(request.query_params.get('email'))
        # print("3----------------------------------------------------------------------------3")
        #user = request.user
        if Donor.objects.filter(email=request.query_params.get('email')).exists():

            user = Donor.objects.get(email=request.query_params.get('email'))

            return Response({'user_type': 'donor', 'userId': user.id, 'userName': user.first_name})
        elif Patient.objects.filter(email=request.query_params.get('email')).exists():
            user = Patient.objects.get(email=request.query_params.get('email'))
            return Response({'user_type': 'patient' , 'userId': user.id, 'userName': user.first_name})
        elif User.objects.filter(email=request.query_params.get('email')).exists():
            user = User.objects.get(email=request.query_params.get('email'))
            if user.is_admin:
                return Response({'user_type': 'admin','userId': user.id, 'userName': user.first_name})   




# class CreateDonorView(generics.CreateAPIView):
#     queryset = Donor.objects.all()
#     serializer_class = DonorSerializer
#     permission_classes = [AllowAny]

# class createPatientView(generics.CreateAPIView):
#     queryset = Patient.objects.all()
#     serializer_class = PatientSerializer
#     permission_classes = [AllowAny]

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




#-----------------------Receptionist-----------------------
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



#----------------------Doctor----------------------------------

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