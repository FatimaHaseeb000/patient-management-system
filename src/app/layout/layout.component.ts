import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  // constructor(private route:ActivatedRoute, private location:Location){}
  constructor(private route:ActivatedRoute, private auth:AuthService, private router:Router)
  {
    // console.log('LAyout component')
  }
  // isLoggedIn()
  // {
  //   return this.auth.isLoggedIn;
  // }

  // ngAfterViewInit() {
    // const currentUrlSegments=this.route.snapshot.url;
    // const currentUrlSegments=this.location.pathname;
    // console.log('Current URL Segments:', currentUrlSegments);
    // console.log('LAyout component')
  // }
  // logOut()
  // {
  //   this.auth.logout();
  // }
  
  // show()
  // {
  //   // const currentUrlSegments=this.route.snapshot.url;
  //   // const currentUrlSegments=this.location.pathname;
  //   // console.log('On clicking home:', currentUrlSegments);
  //   console.log('On clicking home:', this.route.pathFromRoot);
  // }
  // accessWithoutAuthentication()
  // {
  //   // if(!this.auth.isLoggedIn)
  //   console.log(this.auth.isLoggedIn)
  //     // alert("Login Required!");
  // }
  // addNewPatientRouter()
  // {
  //   this.router.navigate(['patient-form'])
  // }
  // viewPatientListRouter()
  // {
  //   this.router.navigate(['patient-list'])
  // }
  // login()
  // {
  //   this.router.navigate(['Login'])
  // }
}
