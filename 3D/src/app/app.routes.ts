import { Routes } from '@angular/router';
import { HospitalComponent } from './hospital/hospital.component';

export const routes: Routes = [

    { path: '', redirectTo: '/hospital', pathMatch: 'full'},
    { path: 'hospital', component: HospitalComponent},

];
