# Generated by Django 3.2.12 on 2023-05-16 17:06

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signup', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminSignup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('mobile', models.CharField(max_length=15, unique=True)),
                ('email', models.EmailField(max_length=254, validators=[django.core.validators.RegexValidator('^.+@sggs\\.ac\\.in$', 'Email must end with @sggs.ac.in')])),
                ('department', models.CharField(max_length=100)),
            ],
        ),
        migrations.AlterField(
            model_name='studentsignup',
            name='email',
            field=models.EmailField(max_length=254, unique=True, validators=[django.core.validators.RegexValidator('^.+@sggs\\.ac\\.in$', 'Email must end with @sggs.ac.in')]),
        ),
        migrations.AlterField(
            model_name='studentsignup',
            name='mobile',
            field=models.CharField(max_length=15, unique=True),
        ),
        migrations.AlterField(
            model_name='studentsignup',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='studentsignup',
            name='reg_no',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]