import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';
import { OperationtypeComponent } from './components/operationtype/operationtype.component';
import { OperationrequestComponent } from './components/operationrequest/operationrequest.component';

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
    path: 'operationrequest',
    component: OperationrequestComponent,
    title: 'Operation Request page',
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home page',
  },
  
];
