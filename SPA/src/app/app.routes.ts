import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';
import { OperationtypeComponent } from './components/operationtype/operationtype.component';
import { SpecializationComponent } from './components/specialization/specialization.component';
import { PlanningComponent } from './components/planning/planning.component';

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
    path: 'planning',
    component: PlanningComponent,
    title: 'Planning page',
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home page',
  },

];
