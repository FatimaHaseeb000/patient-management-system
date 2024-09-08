// import {  } from "@angular/router";

import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CanActivate } from "src/interfaces/CanActivate";
import { AuthService } from "./auth.service";


// export class canActivateRoutes implements canActivateRoutes {
//     constructor(parameters) {
//         // canActivate
//     }
    
// }
// export declare interface canActivate
// {
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
//     : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
// }
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private auth:AuthService, private router:Router, private route:ActivatedRoute)
    {
    //     if(sessionStorage.getItem('email')!=null)
    // {
    //   // this.isLoggedIn=true;
    //   console.log('On init',sessionStorage.getItem('email'))
    // }
    // else
    // {
    //   console.log('On init  false')
    // }
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {
        // throw new Error("Method not implemented.");
        if(sessionStorage.getItem('email')!=null)
            this.auth.isLoggedIn=true;
        else
        this.auth.isLoggedIn=false;

        if(this.auth.isLoggedIn)
            {
                // this.router.navigate(['/']);//this no work
              
                return true;
            }
        else
            {
                this.router.navigate(['Login']);
                // alert('Login is Required!')
                return false;
            }
    }
}