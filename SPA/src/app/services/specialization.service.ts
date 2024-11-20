import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialization } from '../model/specialization.model';

@Injectable({ providedIn: 'root' })
export class SpecializationService {
  url = `${environment.apiUrl}${environment.endpoints.specialization}`;

  constructor(private http: HttpClient) {}

  getSpecializationList(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(this.url);
  }

  addSpecialization(specialization: Specialization): Observable<Specialization> {
    return this.http.post<Specialization>(this.url, specialization);
  }
}
