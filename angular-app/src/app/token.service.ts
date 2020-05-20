import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private token:string;
    
    constructor() { }
    set(token:string):void {
        this.token=token;
    }
    get():string {
        return this.token;
    }
}
