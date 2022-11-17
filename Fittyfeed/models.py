from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Customer(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200,null=True)
    email = models.CharField(max_length=200,null=True)
    date_created = models.DateTimeField(auto_now_add=True,null=True)
    
    def __str__(self):
        return str(self.name)

#for user page-------------------------------------------------------------
class UserFoodItem(models.Model):
    options=(
        ('breakfast','breakfast'),
        ('lunch','lunch'),
        ('dinner','dinner'),
        ('snacks','snacks'),
    )
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, choices=options)
    food_name = models.CharField(max_length=200)
    food_calorie = models.FloatField()
    date = models.DateField(auto_now_add=True)

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self) -> str:
        return self.author.username