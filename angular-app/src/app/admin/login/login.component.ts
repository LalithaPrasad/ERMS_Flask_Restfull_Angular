import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../../token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username:string;
    password:string;

    constructor(
        private httpclient:HttpClient,
        private router:Router,
        private tokenservice:TokenService
    ) { }
    ngOnInit(): void { }
    login(){
        const url='http://localhost:5000/token';
        const params=new HttpParams().set('username',this.username).set('password',this.password);
        this.httpclient.get(url,{params}).subscribe(response=>{
            if(response['message']=='Success'){
                this.tokenservice.set(response['token']);
                this.router.navigateByUrl('/admin/menu');
            }
            else{
                alert(response['message']);
            }
        });
    }
}
