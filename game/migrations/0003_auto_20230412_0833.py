# Generated by Django 3.2.8 on 2023-04-12 00:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0002_follow_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='followerCount',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='player',
            name='openid',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='player',
            name='score',
            field=models.IntegerField(default=1500),
        ),
    ]
