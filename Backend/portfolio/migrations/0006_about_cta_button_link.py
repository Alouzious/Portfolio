# Generated by Django 5.2.4 on 2025-07-05 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0005_about_cta_button_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='about',
            name='cta_button_link',
            field=models.URLField(blank=True),
        ),
    ]
