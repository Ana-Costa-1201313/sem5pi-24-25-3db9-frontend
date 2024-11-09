import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Patient } from "../model/patient.model";


@Injectable({providedIn: 'root'})
export class PatientService{
    url = `${environment.apiUrl}${environment.endpoints.patient}`;

    constructor(private http: HttpClient){}

    getPatientList(
        name?: string,
        email?: string,
        dateOfBirth?: string,
        medicalRecordNumber?: string
    ): Observable<Patient[]>{
        let params = new HttpParams();
        if (name){
            params = params.append('name',name);
        }
        if(email){
            params = params.append('email',email);
        }
        if(dateOfBirth){
            params =params.append('dateOfBirth',dateOfBirth);
        }
        if(medicalRecordNumber){
            params = params.append('medicalRecordNumber',medicalRecordNumber);
        }

        return this.http.get<Patient[]>(this.url, {params});
    }
    
    createPatient(patient :Patient): Observable<Patient>{
        return this.http.post<Patient>(this.url,patient);
    }

    updatePatient(id: string, patient: Patient): Observable<Patient>{
        return this.http.put<Patient>(`${this.url}/${id}`, patient);
    }

    deletePatient(id: string):Observable<Patient>{
        return this.http.delete<Patient>(`${this.url}/${id}`);
    }
}