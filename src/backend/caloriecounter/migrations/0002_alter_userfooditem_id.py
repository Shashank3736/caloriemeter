# Generated by Django 4.1.5 on 2023-01-23 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('caloriecounter', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userfooditem',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]