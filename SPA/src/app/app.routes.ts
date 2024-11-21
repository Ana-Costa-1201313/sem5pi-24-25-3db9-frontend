import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';
import { PatientComponent } from './components/patient/patient.component';
import { OperationtypeComponent } from './components/operationtype/operationtype.component';
import { SpecializationComponent } from './components/specialization/specialization.component';
import { LoginComponent } from './components/login/login.component';
import { VisualizationComponent } from './components/visualization/visualization.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login page',
  },
  {
    path: 'home',
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
    path: 'operationtype',
    component: OperationtypeComponent,
    title: 'Operation Type page',
  },
  {
    path: 'specialization',
    component: SpecializationComponent,
    title: 'Specialization page',
  },
  {
    path: 'visualization',
    component: VisualizationComponent,
    title: 'Visualization page',
  },
  {
    path: '**',
    component: LoginComponent,
    title: 'Login page',
  },
];
