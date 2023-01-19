from accounts.models import CustomUser as User
from django.db import models

# Create your models here.
class UserFoodItem(models.Model):
    options=(
        ('breakfast','Breakfast'),
        ('lunch','Lunch'),
        ('dinner','Dinner'),
        ('snacks','Snacks'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, choices=options)
    name = models.CharField(max_length=200)
    calorie = models.FloatField()
    date = models.DateField()
