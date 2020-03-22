# Generated by Django 3.0.4 on 2020-03-22 09:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0002_auto_20200321_2230'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='availability',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='people.PossibleAvailability'),
        ),
        migrations.AlterField(
            model_name='person',
            name='remarks',
            field=models.CharField(blank=True, default='', max_length=1000),
        ),
        migrations.AlterField(
            model_name='person',
            name='status',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='people.PossibleStatus'),
        ),
        migrations.AlterField(
            model_name='person',
            name='team',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='person',
            name='wasSegel',
            field=models.BooleanField(blank=True, default=False, verbose_name='was segel'),
        ),
    ]