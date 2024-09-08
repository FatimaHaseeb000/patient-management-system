import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { PatientListRoutingModule } from '../patient-list/patient-list-routing.module';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecordsService } from 'src/services/records.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientFormComponent } from './patient/patient-form/patient-form.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './shared/AuthGuard';
import { AppComponent } from './app.component';
import { AuthService } from './shared/auth.service';
// import {MatIconModule} from '@angular/material/icon';

// import { RouterModule } from '@angular/router';
// import { PatientFormComponent } from 'src/components/patient-form/patient-form.component';

// const routes = [
//   { path: '', component: PatientListComponent }
// ];

const routes: Routes = [
  //{path: 'Layout', component:LayoutComponent},
  { path: 'patient-form', component: PatientFormComponent, canActivate:[AuthGuard]},
  { path: 'patient-list', component: PatientListComponent, canActivate:[AuthGuard]},
  { path: 'Login'       , component: LoginComponent}
  // { path: '',loadChildren: () => import('./patient.module').then(m => m.PatientListModule)},

  // {path:'Home', redirectTo:''},
  // {path:'Home', component:LoginComponent},
  // { path: 'login', component: LoginComponent}
  // {path:'Login',component:LoginComponent},
  // {path:'Home', redirectTo:'', component:LoginComponent},
  // {path: ''             , component: LayoutComponent     , canActivate:[AuthGuard]}
  // {path:'',component:AppComponent, canActivate:[AuthGuard]}// two times it is displayed
];


@NgModule({
  declarations: [
    PatientListComponent,
    PatientFormComponent,
    LoginComponent
    // ,LayoutComponent
    //is it okay if iput login here or should i have created another module
    
  ],
  imports: [
    CommonModule,
    // PatientListRoutingModule,
    NgxPaginationModule,
    MatRadioModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // MatIconModule,
    // Mat
    // ,PatientFormComponent
    RouterModule.forChild(routes)
  ]
  ,providers:[RecordsService,AuthGuard,AuthService]
  // ,imports: [RouterModule.forChild(routes)],
  ,exports: [RouterModule]
})
export class PatientModule { }
