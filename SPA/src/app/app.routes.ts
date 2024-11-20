import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';
import { LoginComponent } from './components/login/login.component';
import { OperationtypeComponent } from './components/operationtype/operationtype.component';

export const routes: Routes = [
	{
    path: '',
    component: LoginComponent,
    title: 'Login page',
  },
  {
    path: 'staff',
    component: StaffComponent,
    title: 'Staff page',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'operationtype',
    component: OperationtypeComponent,
    title: 'Operation Type page',
  },
  {
    path: '**',
    component: LoginComponent,
    title: 'Login page',
  },
];
