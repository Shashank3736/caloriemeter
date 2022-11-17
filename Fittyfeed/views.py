from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import CommentForm, AddFoodForm
from .models import Comment, UserFoodItem
import os, json, requests
from django.contrib import messages
from django.utils import timezone
# Create your views here.
@login_required(login_url='login')
def delete_comment(request, id):
    if request.method == 'POST':
        Comment.objects.get(id=id, author=request.user).delete()
    
    return redirect('home')

@login_required(login_url='login')
def delete_food(request, id):
    if request.method == 'POST':
        UserFoodItem.objects.get(id=id, customer=request.user).delete()
    
    return redirect('home')

@login_required(login_url='login')
def add_food(request):
    if request.method == 'POST':
        cf = AddFoodForm(request.POST or None)
        if cf.is_valid():
            food_name = request.POST.get('food_name')
            print(food_name)
            api_url = 'https://api.api-ninjas.com/v1/nutrition?query='
            api_request = requests.get(api_url + food_name, headers={'X-Api-Key': str(os.environ['API_NINJA_KEY'])})
            try:
                api = json.loads(api_request.content)
                if api[0]:
                    food = UserFoodItem.objects.create(
                        customer = request.user, 
                        food_name = food_name, 
                        category = request.POST['category'],
                        food_calorie = api[0]['calories']
                    )
                    food.save()
                else:
                    messages.error(request, 'No data available.')
            except Exception as e:
                messages.error(request, 'OOps! some error occured')
                print(e)
            return redirect('home')   


@login_required(login_url='login')
def add_comment(request):
    if request.method == 'POST':
        cf = CommentForm(request.POST or None)
        if cf.is_valid():
            content = request.POST.get('content')
            comment = Comment.objects.create(author = request.user, content = content)
            comment.save()
            return redirect('home')

@login_required(login_url='login')
def home(request):
    context = {
        'comment_list': Comment.objects.filter(author=request.user),
        'comment_form': CommentForm,
        'food_form': AddFoodForm,
        'food_list': UserFoodItem.objects.filter(customer=request.user, date=timezone.datetime.today())
    }

    return render(request, 'Fittyfeed/home.html', context)