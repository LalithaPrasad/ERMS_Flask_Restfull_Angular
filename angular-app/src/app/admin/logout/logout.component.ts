import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(
        private httpclient:HttpClient,
        private router:Router
    ){
        const url='http://localhost:5000/token';
        this.httpclient.put(url,{}).subscribe(response=>{
            alert('Logged out');
            this.router.navigateByUrl('/admin');
        });
    }
    ngOnInit(): void { }
}
