import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(private router:Router,private auth:AuthService){}

isLoggedIn()
{
  return this.auth.isLoggedIn;
}
addNewPatientRouter()
  {
    this.router.navigate(['patient-form'])
  }
  viewPatientListRouter()
  {
    this.router.navigate(['patient-list'])
  }
  login()
  {
    this.router.navigate(['Login'])
  }
  logOut()
  {
    this.auth.logout();
  }
}
