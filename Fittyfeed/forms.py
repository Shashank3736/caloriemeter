from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import UserFoodItem

class DateInput(forms.DateInput):
    input_type = 'date'

class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username','email','password1','password2']

class AddFoodForm(forms.ModelForm):
    food_name = forms.CharField(label="", widget=forms.TextInput(
        attrs={
            'class': 'form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none',
            'placeholder':'Add your food here!'
        }
    ))

    class Meta:
        model = UserFoodItem
        fields = ['food_name', 'category']

class AddFoodFormWithoutCategory(forms.ModelForm):
    food_name = forms.CharField(label="", widget=forms.TextInput(
        attrs={
            'class': 'form-control block w-full pl-10 p-2.5 font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none',
            'placeholder':'Write name of your food here!'
        }
    ))

    class Meta:
        model = UserFoodItem
        fields = ['food_name']