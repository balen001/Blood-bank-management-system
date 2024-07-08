
from django.contrib import admin
from django.urls import path, include
from authUser.views import CreatePersonView, UserView, AddHospitalView, AddReceptionistView, AddDoctorView, HospitalView, AllUsersView
from authUser.views import ChangePasswordView, UpdateSuperUserView, SuperuserDetailView, ChangeSuperuserPasswordView, DeleteUserView, AppointmentCreateView
from authUser.views import TakenTimeslotsView, TodayAppointmentsView, DeleteAppointmentView, DonorDetailView, UpdateDonorDetailsView, CreateDonationView
from authUser.views import UpdatePatientDetailsView, CreateRequestView, ListPatientRequestsView, ListAllRequestsView, DedicateBloodBagView, DeleteUserNotificationsView
from authUser.views import AllPersonsView, DonorDonationRecordsView, PatientTransfusionRecordView, CreateNotificationsView, UserNotificationsView
from authUser.views import PersonAppointmentsListView, ChangeDonorPatientDoctorReceptionistPasswordView, UpdateUserAccountView, UserDetailView, PatientDetailView
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

    path('api/donor/<int:pk>/', DonorDetailView.as_view(), name='donor_detail'),
    path('api/donor/updateprofile/<int:pk>/', UpdateDonorDetailsView.as_view(), name='donor_update_profile'),
    path('api/donor/donationrecords/<int:donor_id>/', DonorDonationRecordsView.as_view(), name='donor_donation_records'),

    path('api/sendnotifications/', CreateNotificationsView.as_view(), name='send_notifications'),
    path('api/user/notifications/<int:userId>/', UserNotificationsView.as_view(), name='user_notifications'),
    path('api/user/notifications/delete/<int:userId>/', DeleteUserNotificationsView.as_view(), name='delete_user_notifications'),

    path('api/patient/<int:pk>/', PatientDetailView.as_view(), name='patient_detail'),
    path('api/patient/updateprofile/<int:pk>/', UpdatePatientDetailsView.as_view(), name='patient_update_profile'),
    path('api/patient/createrequest/', CreateRequestView.as_view(), name='create_request'),
    path('api/requests/patient/<int:patient_id>/', ListPatientRequestsView.as_view(), name='patient_requests'),
    path('api/transfusions/patient/<int:patient_id>/', PatientTransfusionRecordView.as_view(), name='patient_transfusions'),
    path('api/requests/all/', ListAllRequestsView.as_view(), name='all_patient_requests'),

    path('api/user/<int:pk>/', UserDetailView.as_view(), name='user_detail'),

    path('api/user/updateuseraccount/<int:pk>/', UpdateUserAccountView.as_view(), name='update_user_account'),
    path('api/doctor/addblood/', CreateDonationView.as_view(), name='add_blood'),
    path('api/doctor/viewpersons/', AllPersonsView.as_view(), name='view_persons'),
    path('api/person/appointments/<int:person_id>/', PersonAppointmentsListView.as_view(), name='person_appointments_list'),
    path('api/user/changepassword/', ChangeDonorPatientDoctorReceptionistPasswordView.as_view(), name='change-donor-patient-password'),
    path('api/doctor/dedicate_blood_bag/', DedicateBloodBagView.as_view(), name='dedicate_blood_bag'),
    
    
]


