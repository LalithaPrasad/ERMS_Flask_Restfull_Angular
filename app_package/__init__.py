from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app_package.config import Config

app=Flask(__name__)
CORS(app)
app.config.from_object(Config)
db=SQLAlchemy(app)
migrate=Migrate(app,db)
api=Api(app)

from app_package import route

from app_package.resources import AdminResource, TokenResource, EmployeeResource
api.add_resource(AdminResource, '/admin')
api.add_resource(TokenResource, '/token')
api.add_resource(EmployeeResource, '/employee')
