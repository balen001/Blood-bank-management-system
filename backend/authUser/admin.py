from django.contrib import admin
from .models import User, Donor, Patient, Hospital, Receptionist, Doctor, Notification, Blood_bag, Appointment, Donation_record, Request
from .models import Transfusion_record

class UserAdminConfig(admin.ModelAdmin):

    search_fields = ('first_name', 'last_name')
    list_display = ['id', 'first_name', 'last_name', 'email', 'is_staff', 'is_active' ]

    ordering = ['-created_at']

    fieldsets = (
        (None, {'fields': ('first_name', 'last_name', 'email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('contact_no', 'address')}),
                                 
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('first_name', 'last_name', 'email', 'password', 'is_staff', 'is_active')}
         ),
    )




# Register your models here.
admin.site.register(User, UserAdminConfig)
admin.site.register(Donor)
admin.site.register(Patient)
admin.site.register(Hospital)
admin.site.register(Receptionist)
admin.site.register(Doctor)
admin.site.register(Notification)
admin.site.register(Blood_bag)
admin.site.register(Appointment)
admin.site.register(Donation_record)
admin.site.register(Request)
admin.site.register(Transfusion_record)



