import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from '../model/staff.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StaffService {
  url = `${environment.apiUrl}${environment.endpoints.staff}`;

  constructor(private http: HttpClient) {}

  getStaffList(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.url);
  }
}
