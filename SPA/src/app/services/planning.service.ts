import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PlanningDTO } from '../model/planningDto.model';

@Injectable({ providedIn: 'root' })
export class PlanningService {
    url = `${environment.apiUrl}${environment.endpoints.planning}`;

    constructor(private http: HttpClient) { }

    postPlanning(plan: PlanningDTO): Observable<PlanningDTO[]> {
        return this.http.post<PlanningDTO[]>(this.url, plan);
    }
}