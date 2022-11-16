from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
User._meta.get_field('email')._unique = True

class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username','email','password1','password2']