import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../model/appointment.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  url = `${environment.apiUrl}${environment.endpoints.appointment}`;

  constructor(private http: HttpClient) {}

  getAppointmentList(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.url);
  }
}