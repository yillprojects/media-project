# Generated by Django 2.2.1 on 2019-06-03 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0036_auto_20190604_0023'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(null=True, upload_to='profiles/avatars'),
        ),
        migrations.AddField(
            model_name='profile',
            name='header',
            field=models.ImageField(null=True, upload_to='profiles/headers'),
        ),
    ]
