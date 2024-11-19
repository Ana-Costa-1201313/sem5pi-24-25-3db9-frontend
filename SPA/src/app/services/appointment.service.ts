import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppointmentDto } from '../model/appointmentDto.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  url = `${environment.apiUrl}${environment.endpoints.appointment}`;

  constructor(private http: HttpClient) {}

  getAppointmentList(): Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(this.url);
  }
}