#!/usr/bin/env bash
python ./app/manage.py db upgrade
flask run --host=0.0.0.0