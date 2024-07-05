
from django.contrib import admin
from django.urls import path, include
from authUser.views import CreatePersonView, UserView, AddHospitalView, AddReceptionistView, AddDoctorView, HospitalView, AllUsersView
from authUser.views import ChangePasswordView, UpdateSuperUserView, SuperuserDetailView, ChangeSuperuserPasswordView, DeleteUserView, AppointmentCreateView
from authUser.views import TakenTimeslotsView, TodayAppointmentsView, DeleteAppointmentView
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
    path('api/admin/users/', AllUsersView.as_view(), name='get_all_users'),
    path('api/admin/changeuserpassword/', ChangePasswordView.as_view(), name='change_user_password'),
    path('api/admin/updateadmin/', UpdateSuperUserView.as_view(), name='update_admin'),
    path('api/admin/getsuperuser/', SuperuserDetailView.as_view(), name='superuser_detail'),
    path('api/admin/changesuperuserpassword/', ChangeSuperuserPasswordView.as_view(), name='change_superuser_password'),
    path('api/admin/deleteuser/', DeleteUserView.as_view(), name='delete_user'),
    path('api/user/setappointment/', AppointmentCreateView.as_view(), name='appointment_setting'),
    path('api/appointments/takentimeslots/', TakenTimeslotsView.as_view(), name='taken_timeslots'),
    path('api/appointments/today/', TodayAppointmentsView.as_view(), name='today_appointments'),
    path('api/deleteappointment/<int:appointment_id>/', DeleteAppointmentView.as_view(), name='delete_appointment'),
   


]
