import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../../token.service';

@Component({
    selector: 'app-employee-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
    name:string;
    age:number;
    ed:string;
    role:string;

    constructor(
        private httpclient:HttpClient,
        private router:Router,
        private tokenservice:TokenService
    ) { }
    
    ngOnInit(): void { }

    addemp(){
        const data={'name':this.name, 'age':this.age, 'ed':this.ed, 'role':this.role};
        const opts={headers:new HttpHeaders(
            {'Content-type':'application/json','token':this.tokenservice.get()})};
        const url='http://localhost:5000/employee';
        this.httpclient.post(url,data,opts).subscribe(response=>{
            if(response['message']=='EmployeeAdded'){
                alert('Employee added');
                this.router.navigateByUrl('/admin/menu');
            }
            else{
                alert('Invalid user');
                this.router.navigateByUrl('/admin');
            }
        });
    }
}
