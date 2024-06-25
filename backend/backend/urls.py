
from django.contrib import admin
from django.urls import path, include
from authUser.views import CreatePersonView, UserView, AddHospitalView, AddReceptionistView, AddDoctorView, HospitalView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreatePersonView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/user/usertype/', UserView.as_view(), name='user'),
    path('api/admin/addhospital/', AddHospitalView.as_view(), name='add_hospital'),
    path('api/admin/addreceptionist/', AddReceptionistView.as_view(), name='add_receptionist'),
    path('api/admin/adddoctor/', AddDoctorView.as_view(), name='add_doctor'),
    path('api/user/hospitals/', HospitalView.as_view(), name='get_hospitals'),
]
