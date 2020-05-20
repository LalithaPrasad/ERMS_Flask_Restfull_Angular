import os
from datetime import datetime, timedelta
from app_package import db
from passlib.hash import pbkdf2_sha256 as pbkdf

class Admin(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(32))
    password_hash=db.Column(db.String(128))
    token=db.Column(db.String(128))
    token_expiry=db.Column(db.DateTime)

    def set_password(self,password):
        self.password_hash=pbkdf.hash(password)
        return
    def valid_password(self,password):
        return pbkdf.verify(password,self.password_hash)
    def get_token(self):
        self.token=os.urandom(3).hex()
        self.token_expiry=datetime.utcnow()+timedelta(seconds=360)
        return self.token
    def valid_token(self, token):
        return token==self.token and self.token_expiry>datetime.utcnow()+timedelta(seconds=30)
    def invalidate_token(self):
        self.token_expiry=datetime.utcnow()-timedelta(seconds=5)
        return

class Employee(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(32))
    age=db.Column(db.Integer)
    ed=db.Column(db.String(64))
    role=db.Column(db.String(64))

    def to_dict(self):
        return {
                'id':self.id,
                'name':self.name,
                'age':self.age,
                'ed':self.ed,
                'role':self.role
                }
