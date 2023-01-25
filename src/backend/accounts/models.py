from django.db import models
from django.contrib.auth.models import AbstractUser
import random

# Create your models here.
class CustomUser(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(unique=True)
    max_calories = models.FloatField(default=2_000)
    profile = models.ImageField(upload_to='static/profile_pics', blank=True, null=True)

    def __str__(self):
        return self.username
    
    # create random 18 digit integer as user id
    def save(self, *args, **kwargs):
        if not self.id:
            self.id = random.randint(10**17, 10**18-1)
        super().save(*args, **kwargs)

