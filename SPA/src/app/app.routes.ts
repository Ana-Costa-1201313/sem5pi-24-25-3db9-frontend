import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';
import { LoginComponent } from './components/login/login.component';


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
  }, {
    path: 'login',
    component: LoginComponent,
    title: 'Login page',
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home page',
  },
];
