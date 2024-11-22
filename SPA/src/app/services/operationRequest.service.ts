import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OperationRequest } from '../model/operationRequest.model';

@Injectable({ providedIn: 'root' })
export class OperationRequestService {
    url = `${environment.apiUrl}${environment.endpoints.operationRequest}`;

    constructor(private http: HttpClient) { }

    getPickedOperationRequestList(): Observable<OperationRequest[]> {
        return this.http.get<OperationRequest[]>(this.url+"/list/?status=Picked");
    }
}