# Generated by Django 4.1.1 on 2023-03-16 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('healthclubmgmt', '0004_rename_users_user_alter_user_log_checkout_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='trial_expiry',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]