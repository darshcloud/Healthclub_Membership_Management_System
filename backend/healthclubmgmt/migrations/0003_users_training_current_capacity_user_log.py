# Generated by Django 4.1.1 on 2023-03-16 06:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('healthclubmgmt', '0002_activity_activitylog'),
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('user_id', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=10)),
                ('user_type', models.CharField(choices=[('Member', 'Member'), ('Non-member', 'Non-member'), ('Admin', 'Admin')], max_length=10)),
                ('trial_expiry', models.DateTimeField()),
                ('password', models.CharField(max_length=25)),
            ],
        ),
        migrations.AddField(
            model_name='training',
            name='current_capacity',
            field=models.IntegerField(default=0),
        ),
        migrations.CreateModel(
            name='User_log',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('checkin_time', models.DateTimeField()),
                ('checkout_time', models.DateTimeField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='healthclubmgmt.users')),
            ],
        ),
    ]