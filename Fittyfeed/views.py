from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from Fittyfeed.decorators import unauthorized_user
from .forms import CreateUserForm
from .models import Customer
from django.contrib.auth.models import Group
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout

# Create your views here.
@login_required(login_url='login')
def home(request):
    return render(request, 'Fittyfeed/home.html')