import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Patient } from "../model/patient.model";
import { EditPatient } from "../model/editPatient.model";


@Injectable({providedIn: 'root'})
export class PatientService{
    url = `${environment.apiUrl}${environment.endpoints.patient}`;

    constructor(private http: HttpClient){}

    getPatientList(): Observable<Patient[]>{
        return this.http.get<Patient[]>(this.url);
    }
    createPatient(patient: Partial<Patient>): Observable<Patient>{
        return this.http.post<Patient>(this.url, patient);
    }

    updatePatient(id: string, patient: EditPatient): Observable<Patient> {
        return this.http.patch<Patient>(`${this.url}/${id}`, patient);
      }
}