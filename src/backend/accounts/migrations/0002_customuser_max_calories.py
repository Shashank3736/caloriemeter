# Generated by Django 4.1.5 on 2023-01-19 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='max_calories',
            field=models.FloatField(default=2000),
        ),
    ]
