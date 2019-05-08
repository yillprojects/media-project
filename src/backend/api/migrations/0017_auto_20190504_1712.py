# Generated by Django 2.1.7 on 2019-05-04 14:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    atomic = False

    dependencies = [
        ('cities_light', '0008_city_timezone'),
        ('api', '0016_auto_20190503_1915'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Residence',
            new_name='Location',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='residence',
        ),
        migrations.AddField(
            model_name='profile',
            name='location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='location', to='api.Location'),
        ),
    ]
