import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Room } from '../model/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
    url = `${environment.apiUrl}${environment.endpoints.rooms}`;

    constructor(private http: HttpClient) { }

    getRoomList(): Observable<Room[]> {
        return this.http.get<Room[]>(this.url);
    }
}