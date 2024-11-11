import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';
import { PatientComponent } from './components/patient/patient.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'staff',
    component: StaffComponent,
    title: 'Staff page',
  },
  {
    path: 'patient',
    component: PatientComponent,
    title: 'Patient page',
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home page',
  },
];
