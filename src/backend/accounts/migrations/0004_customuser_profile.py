# Generated by Django 4.1.5 on 2023-01-25 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_customuser_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profile',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pics'),
        ),
    ]
