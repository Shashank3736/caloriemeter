# Generated by Django 4.1.5 on 2023-01-25 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_customuser_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile',
            field=models.ImageField(blank=True, null=True, upload_to='static/profile_pics'),
        ),
    ]