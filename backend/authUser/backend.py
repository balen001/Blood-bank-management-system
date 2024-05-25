from django.contrib.auth.backends import ModelBackend
from .models import User


class CustomUserModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        user = None
        for UserModel in [User]:
            print(UserModel.objects.all())
            
            try:
                user = UserModel.objects.get(email=kwargs.get('email'))
                if user.check_password(password):
                    return user
            except UserModel.DoesNotExist:
                continue
        return None

    def get_user(self, user_id):
        user = None
        for UserModel in [User]:

            try:
                user = UserModel.objects.get(pk=user_id)
                if user is not None:
                    return user
            except UserModel.DoesNotExist:
                continue
        return None