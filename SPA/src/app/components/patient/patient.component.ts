import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, Message, SelectItem } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { Patient } from '../../model/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    MessageModule,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit{
  matchModeOptions: SelectItem[] = [];
  message: Message[] = [];
  patientList: Patient[] = [];
  currentPatient: Patient | null = null;
  showCreate: boolean = false;
  showDetails: boolean = false;
  showDelete: boolean = false;

  constructor(private patientService: PatientService){}

  ngOnInit(): void {
    this.matchModeOptions = [
      {label: 'Contains', value: FilterMatchMode.CONTAINS},
    ];
    this.loadPatientList();
  }
  loadPatientList(filters: any = {}){
    this.patientService.getPatientList(filters.name,filters.email,filters.dateOfBirth,filters.medicalRecordNumber)
    .subscribe((patients: Patient[]) => (this.patientList = patients));
  }

  openCreateModal(): void{
    this.showCreate = true;
  }
  openDetailsModal(patient: Patient): void{
    this.currentPatient = patient;
    this.showDetails = true;
  }

  openDeleteModal(patient: Patient): void{
    this.currentPatient = patient;
    this.showDelete = true;
  }
  deletePatient(){
    if(!this.currentPatient?.id == null) return;

    this.patientService.deletePatient(this.currentPatient.id).subscribe(() => {
      this.loadPatientList();
      this.showDelete = false;
      this.message = [
        {
          severity: 'info',
          summary: 'Success!',
          detail: 'Patient Profile was successfully deleted',
        }
      ]
    }
    )
  }
}
