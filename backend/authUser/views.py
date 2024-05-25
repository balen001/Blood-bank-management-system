from django.shortcuts import render
from .models import Donor, Patient
from rest_framework import generics
from .serializers import DonorRegistrationSerializer, PatientRegistrationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
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

            return Response({'user_type': 'donor'})
        elif Patient.objects.filter(email=request.query_params.get('email')).exists():
            return Response({'user_type': 'patient'})
        else:
            return Response({'user_type': 'admin'})   #returns admin if its not donor or patient (be carefullll!)



# Create your views here.

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
