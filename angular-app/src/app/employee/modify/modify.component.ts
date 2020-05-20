import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../../token.service';

@Component({
    selector: 'app-employee-modify',
    templateUrl: './modify.component.html',
    styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

    id:string;
    ed:string;
    role:string;

    constructor(
        private httpclient:HttpClient,
        private router:Router,
        private tokenservice:TokenService
    ) { }
    ngOnInit(): void { }
    modifyemp(){
        const url='http://localhost:5000/employee';
        const data={'id':this.id,'ed':this.ed,'role':this.role};
        const headers=new HttpHeaders(
            {'Content-type':'application/json','token':this.tokenservice.get()});
        this.httpclient.put(url,data,{headers:headers}).subscribe(response=>{
            if(response['message']=='EmployeeModified'){
                alert('Employee modified');
                this.router.navigateByUrl('/admin/menu');
            }
            else{
                alert(response['message']);
            }
        });
    }
}
