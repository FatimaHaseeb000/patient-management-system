import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

// @Injectable
export declare interface CanActivate
{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise <boolean | UrlTree> | boolean | UrlTree;
}