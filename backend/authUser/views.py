from django.shortcuts import render
from .models import Donor
from rest_framework import generics
from .serializers import DonorSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

class CreateDonorView(generics.CreateAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = [AllowAny]
    