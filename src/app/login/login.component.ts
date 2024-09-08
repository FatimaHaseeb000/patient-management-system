import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { users } from 'src/interfaces/users';
import { AuthService } from '../shared/auth.service';
import { combineLatest, startWith } from 'rxjs';
import { Router,NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  loginForm: FormGroup;
  http:HttpClient;
  loginError=true;
  isLoggedIn:boolean=false;
  // user1:users=
  // {
  //   userId:'Fatima',
  //   password:'123'
  // };

  // auth:AuthService;

  constructor(private formBuilder: FormBuilder, private auth:AuthService, private router:Router, private route:ActivatedRoute)
  {
    this.isLoggedIn=this.auth.isLoggedIn;
    // this.http.post('https://users-database-6baa2-default-rtdb.firebaseio.com/users-data.json',this.user1).
    // subscribe((res)=>{console.log('RESPONSES'+ res)});// i think you ca
  }
  ngOnInit()
  {
    
    // ((document.getElementById('loginButton')) as HTMLButtonElement).hidden=true;
    let sessionToken=sessionStorage.getItem('email');
    
    // if(sessionToken==null)
    {
      this.loginForm=this.formBuilder.group
    (
      {
        userId:['',Validators.required],
        password:['',Validators.required]
      }
    );

    // if(this.loginForm.get('userId')?.value==''|| this.loginForm.get('password')?.value)
    //   ((document.getElementById('loginButton')) as HTMLButtonElement).disabled=true;
    
    // this.http.post('https://users-database-6baa2-default-rtdb.firebaseio.com/users-data.json',this.user1).
    // subscribe((res)=>{console.log('RESPONSES'+ res)});
    
    
    

    combineLatest
    ([
      this.loginForm.get('userId')?.valueChanges.pipe(startWith('')),

      this.loginForm.get('password')?.valueChanges.pipe(startWith(''))
    ])
    .subscribe(([email, pswd]) => 
    {
      if(email!=''&& pswd!='')
      {
       
        console.log('Combine latest');
        ((document.getElementById('loginButton')) as HTMLButtonElement).disabled=false;
      }
      
      // Perform actions based on changes in multiple values
    });
    }

    

    // this.router.events.subscribe(event => 
    // {
    //   if (event instanceof NavigationEnd) {
    //     // Check the URL to determine if it's the specific page you're interested in
    //     if (event.urlAfterRedirects === '/Login') {
    //       // Perform your desired actions here
    //       console.log('Login was loaded.');
    //     }
    //   }
    // });
  }

  // ngAfterViewInit() {
  //   // Detect changes using a timeout
  //   setTimeout(() => {
  //     if (this.loginForm && this.usernameInput.nativeElement.value) {
  //       console.log('Autofill detected:', this.usernameInput.nativeElement.value);
  //     }
  //   });
  // }
  
  //goBackToMainPage()
//  {
//    this.router.navigate(['']);
//  }

  login()
  {
    // console.log('username '+this.loginForm.get('userId')?.value)
    // console.log('password '+this.loginForm.get('password')?.value)
    if(this.loginForm.get('userId')?.value!=''&&this.loginForm.get('password')?.value)
    {
      this.auth.login(this.loginForm.get('userId')?.value,this.loginForm.get('password')?.value);
    // alert('Login Succesful!')
    // this.router.navigate(['..'], { relativeTo: this.route }); // this.route is ActivatedRoute

      this.loginForm.setValue
      ({
        userId:'',
        password:''
      });
      this.loginForm.markAsUntouched();
      console.log("login comp",this.auth.isLoggedIn)

      this.router.navigate(['']);
      }
      else 
        this.loginError=true;
    // window.
  }
  
  logout()
  {
    // this.isLoggedIn=this.auth.isLoggedIn;
    console.log('is logged in div:',this.auth.isLoggedIn)
    this.auth.logout();
    // alert('User is Logged out!')
  }

}
// function subscribe(arg0: ([value1, value2, value3]: [any, any, any]) => void) {
//   throw new Error('Function not implemented.');
// }


//spinner for when loading is done
//why does login required appear when we refresh the app- done
// login as modal
// after login, go to home page-done
