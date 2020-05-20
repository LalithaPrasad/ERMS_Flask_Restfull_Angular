from flask import request
import json
from flask_restful import Resource
from app_package.models import Admin, Employee
from app_package import db,auth

class AdminResource(Resource):

    def post(self):
        data=request.get_json()
        un,pw=data['username'],data['password']
        admin=Admin.query.get(1)
        if admin:
            doc={'message':'AdminExists'}
            return doc, 200
        else:
            admin=Admin(username=un)
            admin.set_password(pw)
            db.session.add(admin)
            db.session.commit()
            doc={'message':'AdminCreated'}
            return doc,200

class TokenResource(Resource):

    def get(self):
        un=request.args.get('username')
        pw=request.args.get('password')
        admin=Admin.query.filter_by(username=un).first()
        if admin and admin.valid_password(pw):
            token=admin.get_token()
            db.session.add(admin)
            db.session.commit()
            return {'message':'Success','token':token},200
        else:
            return {'message':'InvalidUser'},200

    def put(self):
        admin=Admin.query.get(1)
        admin.invalidate_token()
        db.session.commit()
        return {'message':'Loggedout'},200

class EmployeeResource(Resource):

    @auth.valid_token
    def get(self):
        emp=Employee.query.all()
        if not emp:
            doc={'message':'Empty'}
            return doc,200
        else:
            tmp=[]
            for e in emp:
                tmp.append(e.to_dict())
            return {'message':'NotEmpty','employees':tmp},200
    
    @auth.valid_token
    def post(self):
        data=request.get_json()
        n,a,e,r=data['name'],data['age'],data['ed'],data['role']
        emp=Employee(name=n,age=a,ed=e,role=r)
        db.session.add(emp)
        db.session.commit()
        return {'message':'EmployeeAdded'},200
    
    @auth.valid_token
    def put(self):
        data=request.get_json()
        emp=Employee.query.get(data['id'])
        if 'ed' in data:emp.ed=data['ed']
        if 'role' in data:emp.role=data['role']
        db.session.add(emp)
        db.session.commit()
        return {'message':'EmployeeModified'},200
    
    @auth.valid_token
    def delete(self):
        id=request.args.get('id')
        emp=Employee.query.get(int(id))
        db.session.delete(emp)
        db.session.commit()
        return {'message':'EmployeeDeleted'},200
