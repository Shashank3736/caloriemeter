from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('',views.home,name='home'),
    path('add/', views.add_comment, name='add_comment'),
    path('delete_comment/<int:id>', views.delete_comment, name='delete_comment'),
    path('delete_food/<int:id>', views.delete_food, name='delete_food'),
    path('add_food_item/', views.add_food, name='add_food')
]