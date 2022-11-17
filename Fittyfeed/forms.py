from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import Comment, UserFoodItem

class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username','email','password1','password2']
    
class CommentForm(forms.ModelForm):
    content = forms.CharField(label ="", widget = forms.Textarea(
    attrs ={
        'class':'form-control',
        'placeholder':'Comment here !',
        'rows':4,
        'cols':50
    }))
    class Meta:
        model = Comment
        fields =['content']

class AddFoodForm(forms.ModelForm):
    food_name = forms.CharField(label="", widget=forms.TextInput(
        attrs={
            'class': 'form-control',
            'placeholder':'Add your food here!'
        }
    ))

    class Meta:
        model = UserFoodItem
        fields = ['food_name', 'category']