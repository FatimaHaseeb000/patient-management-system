import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from 'src/app/layout/layout.component';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/app/environment/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { RecordsService } from 'src/services/records.service';
import { AuthGuard } from './shared/AuthGuard';
import { AuthService } from './shared/auth.service';
import { LayoutModule } from './layout.module';
import { NavbarComponent } from './navbar/navbar.component';
// import { RouterModule, Routes } from '@angular/router';
// import { ReactiveFormsModule} from '@angular/forms';
// import { FormsModule } from '@angular/forms';
// import { MatRadioModule } from '@angular/material/radio';
// import {HttpClientModule} from '@angular/common/http';
// import { RecordsService } from 'src/services/records.service';
// import { RouterModule, Routes } from '@angular/router';

// const appRoute: Routes = [
//   {path:'',redirectTo:'',pathMatch:'full'},
//   // {path:'', component:AppComponent},
//   {path:'patient-form', component:PatientFormComponent},
//   {path:'patient-list',component:PatientListComponent}
// ];

// const appRoute: Routes = [
//   // {path:'',redirectTo:'',pathMatch:'full'},
//   {path:'', component:AppComponent},
//   // {path:'patient-form', component:PatientFormComponent},
//   {path:'patient-form', loadChildren:()=>import('./patient-form/patient-form.module').then(m=>m.PatientFormModule)},
//   // {path:'patient-list',component:PatientListComponent},
//   { path: 'patient-list', loadChildren: () => import('./patient-list/patient-list.module').then(m => m.PatientListModule) }
// ];
const appRoute: Routes = [
  // { path: '',loadChildren: () => import('./patient.module').then(m => m.PatientListModule)},
  { path: 'layout',loadChildren: () => import('./patient.module').then(m => m.PatientModule)},
  { path:'',component:LayoutComponent,canActivate:[AuthGuard]}

  // {path:'',redirectTo:'',pathMatch:'full'},
  // {path:'', component:AppComponent},
  // {path:'patient-form', component:PatientFormComponent},
  // {path:'patient-form', component:PatientFormComponent, loadChildren:()=>import('./patient-form/patient-form.module').then(m=>m.PatientFormModule)},
  // {path:'patient-form', loadChildren:()=>import('./patient-form/patient-form.module').then(m=>m.PatientFormModule)},
  // {path:'patient-list',component:PatientListComponent},
  // { path: 'patient-list', component:PatientListComponent, loadChildren: () => import('./patient-list/patient-list.module').then(m => m.PatientListModule) }
  // { path: 'patient-list', loadChildren: () => import('./patient-list/patient-list.module').then(m => m.PatientListModule) }
  // { path: '', loadChildren: () => import('./patient.module').then(m => m.PatientListModule) }
  // {path:'',redirectTo:'Login',component:LoginComponent},
  // {path:'Login',component:LoginComponent},
  // {path:'Login',component:LoginComponent},
  // {path:'',redirectTo:'Login',component:LoginComponent},
  // {path:'Login',component:LoginComponent},
  // {path:'Home', redirectTo:'', component:LoginComponent},
  // {path:'',redirectTo:'Login'},
  // {path:'',redirectTo:'Login'},
  // { path: '',loadChildren: () => import('./patient.module').then(m => m.PatientListModule), component:LayoutComponent },
  // { path: '',loadChildren: () => import('./patient.module').then(m => m.PatientListModule), redirectTo:'Login',pathMatch:'full'},
  // {path:'', redirectTo:'Login',pathMatch:'full'}
  // {path: '', component:LoginComponent}
  
];

@NgModule({
   declarations: [
    AppComponent
    ,NavbarComponent
    // ,LoginComponent
    // ,LayoutComponent
    
    // ,PatientFormComponent,
    // PatientListComponent
  ],
  imports: [
    // HttpClientModule,
    BrowserModule,
    // AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NgxPaginationModule,
    // MatRadioModule, 
    // FormsModule
     RouterModule.forRoot(appRoute)
     ,AngularFireModule.initializeApp(environment.firebaseConfig)
     ,LayoutModule
    //  , provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideDatabase(() => getDatabase()), provideFirestore(() => getFirestore())
  ],
  exports:[RouterModule],
  providers: [RecordsService, AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

//only one module jismein saaree routing waghaira aayegee