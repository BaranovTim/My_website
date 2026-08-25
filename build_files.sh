#!/usr/bin/env bash
# Vercel build step: collect static files into staticfiles_build/.
#
# Vercel's build image ships a uv-managed Python that refuses installs into it
# (PEP 668), so deps go into a throwaway virtualenv. This venv is only used to
# run collectstatic -- @vercel/python installs requirements.txt separately for
# the serverless function itself.
set -e

PY=$(command -v python3.12 || command -v python3.11 || command -v python3)
echo "Build interpreter: $PY ($("$PY" -V 2>&1))"

"$PY" -m venv .venv
.venv/bin/python -m pip install --disable-pip-version-check -r requirements.txt
.venv/bin/python Tim_Website/manage.py collectstatic --noinput --clear

# Keep the venv out of the deployed function bundle.
rm -rf .venv
