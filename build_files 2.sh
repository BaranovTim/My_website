#!/usr/bin/env bash
# Vercel build step: install deps and collect static files into staticfiles_build/.
set -e

python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt

python3 Tim_Website/manage.py collectstatic --noinput --clear
