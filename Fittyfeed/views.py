from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import AddFoodForm, AddFoodFormWithoutCategory
from .models import UserFoodItem
import os, json, requests
from django.contrib import messages
from django.utils import timezone
# Create your views here.

@login_required(login_url='login')
def delete_food(request, id):
    if request.method == 'POST':
        UserFoodItem.objects.get(id=id, customer=request.user).delete()
    
    return redirect('home')

@login_required(login_url='login')
def add_food_cat(request, category):
    if category not in ('breakfast', 'lunch', 'dinner', 'snacks'):
        return redirect('home')
    
    if request.method == 'POST':
        cf = AddFoodFormWithoutCategory(request.POST or None)
        if cf.is_valid():
            food_name = request.POST.get('food_name')
            api_url = 'https://api.api-ninjas.com/v1/nutrition?query='
            api_request = requests.get(api_url + food_name, headers={'X-Api-Key': str(os.environ['API_NINJA_KEY'])})
            try:
                api = json.loads(api_request.content)
                if api[0]:
                    cal = 0
                    for data in api:
                        cal += data['calories']
                    food = UserFoodItem.objects.create(
                        customer = request.user, 
                        food_name = food_name, 
                        category = category,
                        food_calorie = cal,
                        date = timezone.localdate()
                    )
                    food.save()
                else:
                    messages.error(request, 'No data available.')
            except Exception as e:
                messages.error(request, 'OOps! some error occured')
                print(e)
            return redirect('home')

@login_required(login_url='login')
def add_food(request):
    if request.method == 'POST':
        cf = AddFoodForm(request.POST or None)
        if cf.is_valid():
            food_name = request.POST.get('food_name')
            api_url = 'https://api.api-ninjas.com/v1/nutrition?query='
            api_request = requests.get(api_url + food_name, headers={'X-Api-Key': str(os.environ['API_NINJA_KEY'])})
            try:
                api = json.loads(api_request.content)
                if api[0]:
                    cal = 0
                    for data in api:
                        cal += data['calories']
                    food = UserFoodItem.objects.create(
                        customer = request.user,
                        food_name = food_name,
                        category = request.POST['category'],
                        food_calorie = cal,
                        date = timezone.localdate()
                    )
                    food.save()
                else:
                    messages.error(request, 'No data available.')
            except Exception as e:
                messages.error(request, 'OOps! some error occured')
                print(e)
            return redirect('home')

@login_required(login_url='login')
def home(request):
    foods = UserFoodItem.objects.filter(customer=request.user, date=timezone.now())
    total_cal = 0

    for food in foods:
        total_cal += food.food_calorie
    context = {
        'food_form': AddFoodForm,
        'food_form_cat':AddFoodFormWithoutCategory,
        'food_list': foods,
        'food_breakfast_list': foods.filter(category='breakfast'),
        'total_calories': round(total_cal, 2),
        'food_lunch_list': foods.filter(category='lunch'),
        'food_snacks_list': foods.filter(category='snacks'),
        'food_dinner_list': foods.filter(category='dinner'),
        'today': timezone.localdate()
    }

    return render(request, 'Fittyfeed/home.html', context)

@login_required(login_url='login')
def home(request):
    foods = UserFoodItem.objects.filter(customer=request.user, date=timezone.now())
    total_cal = 0

    for food in foods:
        total_cal += food.food_calorie
    context = {
        'food_form': AddFoodForm,
        'food_form_cat':AddFoodFormWithoutCategory,
        'food_list': foods,
        'food_breakfast_list': foods.filter(category='breakfast'),
        'total_calories': round(total_cal, 2),
        'food_lunch_list': foods.filter(category='lunch'),
        'food_snacks_list': foods.filter(category='snacks'),
        'food_dinner_list': foods.filter(category='dinner'),
        'today': timezone.localdate()
    }

    return render(request, 'Fittyfeed/home.html', context)