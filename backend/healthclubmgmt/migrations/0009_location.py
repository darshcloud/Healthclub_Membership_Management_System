# Generated by Django 4.1.1 on 2023-03-16 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('healthclubmgmt', '0008_enrollments'),
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('location_id', models.AutoField(primary_key=True, serialize=False)),
                ('location_name', models.CharField(max_length=255)),
                ('location_address', models.CharField(max_length=255)),
            ],
        ),
    ]