"""
WSGI config for Tim_Website project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
import sys
from pathlib import Path

from django.core.wsgi import get_wsgi_application

# The Django project lives one directory below the repository root, so
# 'Tim_Website.settings' only resolves when the directory holding manage.py is
# on the path. manage.py arranges that itself; serverless hosts that import
# this module directly (Vercel) start from the repository root instead.
PROJECT_DIR = Path(__file__).resolve().parent.parent
if str(PROJECT_DIR) not in sys.path:
    sys.path.insert(0, str(PROJECT_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Tim_Website.settings')

application = get_wsgi_application()

# Vercel's Python runtime looks for a module-level 'app'.
app = application
