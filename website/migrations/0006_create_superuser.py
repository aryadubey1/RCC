from django.db import migrations
from django.contrib.auth.models import User
import os

def create_superuser(apps, schema_editor):
    # These will be pulled from Render's "Environment Variables"
    username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
    email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
    password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'TemporaryPass123!')

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)

class Migration(migrations.Migration):
    dependencies = [
        ('website', '0001_initial'), # Ensure this matches your first migration file name
    ]

    operations = [
        migrations.RunPython(create_superuser),
    ]