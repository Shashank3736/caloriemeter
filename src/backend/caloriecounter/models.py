from accounts.models import CustomUser as User
from django.db import models
import random

# Create your models here.
class UserFoodItem(models.Model):
    options=(
        ('breakfast','Breakfast'),
        ('lunch','Lunch'),
        ('dinner','Dinner'),
        ('snacks','Snacks'),
    )

    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, choices=options)
    name = models.CharField(max_length=200)
    calorie = models.FloatField()
    date = models.DateField()

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = random.randint(10**17, 10**18-1)
        super().save(*args, **kwargs)
