import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable
(
  {
    providedIn: 'root'
  }
)
export class AuthService 
{

  isLoggedIn:boolean=false;
  constructor(private fireauth: AngularFireAuth, private router:Router) { }

  
// login(userName:string, password:string)
  // {
  //   this.fireauth.signInWithEmailAndPassword(userName,password).then(()=>{},err=>{})
  // }


  //Password Reset----to do
  ngOnInit()
  {
    // if(sessionStorage.getItem('email')!=null)
    // {
    //   // this.isLoggedIn=true;
    //   console.log('On init',sessionStorage.getItem('email'))
    // }
    // else
    // {
    //   console.log('On init  false')
    // }
  }
  login(email:string, password:string)
  {
    this.fireauth.signInWithEmailAndPassword(email,password).then
    (()=> 
      {
        // console.log(email);
        // console.log(password);

        sessionStorage.setItem('email', email);
        this.router.navigate(['']);//
        // this.router.navigate(['Home']);
        
        this.isLoggedIn=true;
        // alert('Login Succesful!')
      }
      ,err=>
      {
        alert('Something went wrong!');
        // this.router.navigate(['Login']);
        this.isLoggedIn=false;
      }
    )
  }

  //register method
  // register(email:string, password:string)
  // {
  //   this.fireauth.createUserWithEmailAndPassword(email,password)
  //   .then(()=>
  //   {
  //     this.router.navigate(['/Login'])
  //   }
  //   ,err=>
  //   {
  //     alert(err.message);
  //     this.router.navigate(['/Login'])
  //   })
  // }
  
  //signout
  logout()
  {
    this.fireauth.signOut()
    .then(()=>
    {
      sessionStorage.removeItem('email');
      
      this.router.navigate(['']);
      // location.reload();
      this.isLoggedIn=false;
      alert('Session has ended!')
    }, err=>
    {
      alert(err.message)
    })
  }

}                                                
