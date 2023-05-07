

from flask import Flask

app = Flask(__name__)

# Make sure to import the routes after creating the app instance
from flask_app.controllers.routes import *
