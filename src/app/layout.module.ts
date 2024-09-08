import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './shared/AuthGuard';
import { PatientModule } from './patient.module';
import { LoginComponent } from './login/login.component';

const routes:Routes=[
  
    // path:'', component:LayoutComponent,
  {path:'patient', loadChildren: () => import('./patient.module').then(m => m.PatientModule)},
  // {path:'',component:LoginComponent}
  // children: [
  //   { path: '', redirectTo: 'patient-form', pathMatch: 'full' }, // Default route within LayoutComponent
  //   { path: 'patient-form', loadChildren: () => import('./patient.module').then(m => m.PatientModule) },
  //   { path: 'patient-list', loadChildren: () => import('./patient.module').then(m => m.PatientModule) },
  //   { path: 'Login', loadChildren: () => import('./patient.module').then(m => m.PatientModule) },
  //   // Other child routes
  // ]

]


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    PatientModule
  ]
})
export class LayoutModule { }
