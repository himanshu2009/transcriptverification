# Generated by Django 3.2.12 on 2023-05-16 17:38

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signup', '0003_auto_20230516_1712'),
    ]

    operations = [
        migrations.CreateModel(
            name='Signup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('reg_no', models.CharField(max_length=20, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True, validators=[django.core.validators.RegexValidator('^.+@sggs\\.ac\\.in$', 'Email must end with @sggs.ac.in')])),
                ('department', models.CharField(max_length=100)),
                ('mobile', models.CharField(max_length=15, unique=True)),
                ('joining_year', models.PositiveIntegerField()),
                ('course', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=128)),
                ('status', models.CharField(blank=True, max_length=50)),
            ],
        ),
        migrations.DeleteModel(
            name='AdminSignup',
        ),
        migrations.DeleteModel(
            name='StudentSignup',
        ),
    ]
