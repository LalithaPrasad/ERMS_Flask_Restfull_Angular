from flask import request
from app_package.models import Admin
from functools import wraps

def valid_token(func):
    @wraps(func)
    def inner(*args,**kwargs):
        admin=Admin.query.get(1)
        token=request.headers.get('token')
        if admin and admin.valid_token(token):
            return func(*args,**kwargs)
        else:
            return {'message':'InvalidUser'},200
    return inner
