import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgModule, inject } from '@angular/core';
import { users } from 'src/interfaces/users';
import { AuthService } from './shared/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthGuard } from './shared/AuthGuard';
// import { RecordsService } from './records.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// @NgModule({
//   // providers: [RecordsService]
// })
export class AppComponent 
{
  title = 'task-1';
  // showForm: boolean =false;
  // showList: boolean =false;
  private authService=inject(AuthService);
  isLoggedIn:boolean=this.authService.isLoggedIn;
  // http:HttpClient
  // user1:users={
  //   userId:'Fatima',
  //   password:'123'
  // }
  constructor(private http:HttpClient, private auth:AuthService, private activatedRoute:ActivatedRoute, private route:Router)
  {
    // isLoggedIn:boolean=this.authService.isLoggedIn;
    // if(this.auth.isLoggedIn==true)
    // (document.getElementById('logoutBtnDiv') as HTMLDivElement).hidden=true;
    // else
    // (document.getElementById('logoutBtnDiv') as HTMLDivElement).hidden=false;
  }
  
  ngOnInit(): void {
    // console.log('activated route config',this.activatedRoute.routeConfig)
    console.log('activated route config',this.route.config)
    // this.traverseRouteConfig(this.activatedRoute.routeConfig);
  }

  traverseRouteConfig(route: Route | null): void {
    console.log('transverseRoute',route)
    if (!route) {
      console.log('no transverseRoute')
      return;
    }

    // console.log('Route Path:', route.path);

    // Recursively traverse child routes
    if (route.children) {
      for (const childRoute of route.children) {

        this.traverseRouteConfig(childRoute);
      }
    }
  }
  
  // ngOnInit()
  // {
  //   console.log('LAyout component')
  //   // this.http.post('https://users-database-5ea08-default-rtdb.firebaseio.com/user-record.json',this.user1).
  //   // subscribe((res)=>{console.log('RESPONSES'+ res)});// not recommended to use these in ng hooks or constructor
  // }
  // show()
  // {
  //   this.http.post('https://users-database-6baa2-default-rtdb.firebaseio.com/users-data.json',this.user1).
  //   subscribe((res)=>{console.log('RESPONSES'+ res)});
  // }
  logOut()
  {
    this.auth.logout();
  }
  accessWithoutAuthentication()
  {
    // if(!this.auth.isLoggedIn)
    console.log(this.auth.isLoggedIn)
      // alert("Login Required!");
  }
  // ngOnInit()
  // {
    // let authToken=sessionStorage.getItem('email');
    // if(authToken)
    // {
    //   this.auth.isLoggedIn=true;
    //   this.isLoggedIn=this.auth.isLoggedIn
    // }
    // else
    // {
    //   this.auth.isLoggedIn=false;
    //   this.isLoggedIn=this.auth.isLoggedIn
    // }

    // console.log('authTOken: ',authToken);
    // // console.log('service isLoggedIn: ',this.auth.isLoggedIn)
    // if(this.auth.isLoggedIn==true)
    // (document.getElementById('logoutBtnDiv') as HTMLDivElement).hidden=true;
    // else
    // (document.getElementById('logoutBtnDiv') as HTMLDivElement).hidden=false;
    // console.log('On clicking home:', this.route.pathFromRoot);

  // }


}
