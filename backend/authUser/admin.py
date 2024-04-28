from django.contrib import admin
from .models import User, Donor


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
