import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationRequest } from '../model/operationRequest.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OperationRequestService {
  url = `${environment.apiUrl}${environment.endpoints.operationRequests}`;

  constructor(private http: HttpClient) {}

  getOperationRequestList(): Observable<OperationRequest[]> {
    return this.http.get<OperationRequest[]>(this.url);
  }
}