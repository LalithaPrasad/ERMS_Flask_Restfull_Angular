import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../../token.service';

@Component({
    selector: 'app-employee-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

    id:string;

    constructor(
        private httpclient:HttpClient,
        private tokenservice:TokenService,
        private router:Router
    ) { }
    ngOnInit(): void { }
    deleteemp(){
        const url='http://localhost:5000/employee';
        const params=new HttpParams().set('id',this.id);
        const headers=new HttpHeaders(
            {'Content-type':'application/json', 'token':this.tokenservice.get()});
        this.httpclient.delete(url,{params:params,headers:headers}).subscribe(response=>{
            if(response['message']=='EmployeeDeleted'){
                alert('Employee deleted');
                this.router.navigateByUrl('/admin/menu');
            }
            else{
                alert(response['message']);
            }
        });
    }
}
