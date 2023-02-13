# Generated by Django 4.1.5 on 2023-02-13 04:26

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_alter_customuser_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(blank=True, default=django.utils.timezone.now, max_length=254, unique=True),
            preserve_default=False,
        ),
    ]
