import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';
import { PatientComponent } from './components/patient/patient.component';
import { OperationtypeComponent } from './components/operationtype/operationtype.component';
import { SpecializationComponent } from './components/specialization/specialization.component';

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
    path: '**',
    component: HomeComponent,
    title: 'Home page',
  },

];
