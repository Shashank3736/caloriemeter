from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('',views.home,name='home'),
    path('delete_food/<int:id>', views.delete_food, name='delete_food'),
    path('add_food_item/', views.add_food, name='add_food'),
    path('add_food_item/<str:category>/<str:date>', views.add_food_cat, name='add_food_cat'),
    path('date/<str:date>/', views.home_with_date, name='on_date')
]