import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateStaff } from '../model/staff/createStaff.model';
import { Staff } from '../model/staff/staff.model';
import { EditStaff } from '../model/staff/editStaff.model';

@Injectable({ providedIn: 'root' })
export class StaffService {
  url = `${environment.apiUrl}${environment.endpoints.staff}`;

  constructor(private http: HttpClient) {}

  addStaff(staff: CreateStaff): Observable<Staff> {
    return this.http.post<Staff>(this.url, staff);
  }

  getStaffList(
    name: string,
    email: string,
    specialization: string,
    pageNum: number,
    pageSize: number
  ): Observable<Staff[]> {
    let params = new HttpParams();

    if (name) {
      params = params.append('name', name);
    }

    if (email) {
      params = params.append('email', email);
    }

    if (specialization) {
      params = params.append('specialization', specialization);
    }

    params = params.append('pageNum', pageNum);

    params = params.append('pageSize', pageSize);

    return this.http.get<Staff[]>(this.url, { params: params });
  }

  getTotalRecords(): Observable<number> {
    return this.http.get<number>(
      `${this.url}${environment.endpoints.totalRecordsStaff}`
    );
  }

  editStaff(staffId: string, staff: EditStaff): Observable<Staff> {
    return this.http.put<Staff>(`${this.url}/${staffId}`, staff);
  }

  deactivateStaff(staffId: string): Observable<Staff> {
    return this.http.delete<Staff>(`${this.url}/${staffId}`);
  }
}
