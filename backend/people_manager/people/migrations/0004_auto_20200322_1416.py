# Generated by Django 3.0.4 on 2020-03-22 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0003_auto_20200322_0949'),
    ]

    operations = [
        migrations.AlterField(
            model_name='possiblepreference',
            name='people',
            field=models.ManyToManyField(blank=True, null=True, related_name='preferences', to='people.Person'),
        ),
        migrations.AlterField(
            model_name='possiblesubject',
            name='people',
            field=models.ManyToManyField(blank=True, null=True, related_name='subjects', to='people.Person'),
        ),
        migrations.AlterField(
            model_name='possibletrack',
            name='people',
            field=models.ManyToManyField(blank=True, null=True, related_name='tracks', to='people.Person'),
        ),
    ]
