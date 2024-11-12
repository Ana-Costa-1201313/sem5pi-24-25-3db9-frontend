import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, Message, SelectItem } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { Patient } from '../../model/patient.model';
import { PatientService } from '../../services/patient.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, FormsModule, ButtonModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {
  patientList: Patient[] = [];
  filteredPatientList: Patient[] = [];
  currentPatient: Patient | null = null;
  showDetails: boolean = false;
  showCreate: boolean = false;
  showEdit: boolean = false;
  newPatient: Partial<Patient> = {};
  editingPatient: Patient | null = null;
  matchModeOptions: SelectItem[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    // Carregar lista de pacientes e configurar filtros
    this.patientService.getPatientList().subscribe((patients) => {
      this.patientList = patients.map(patient => ({
        ...patient,
        dateOfBirth: new Date(patient.dateOfBirth), 
      }));
      this.filteredPatientList = [...this.patientList];
    });
    this.matchModeOptions = [
      { label: 'Contains', value: FilterMatchMode.CONTAINS }
    ];
  }

  openCreateModal(): void {
    this.newPatient = {};
    this.showCreate = true;
  }
  openDetailsModal(patient: Patient): void {
    this.currentPatient = patient;
    this.showDetails = true;
  }
  openEditModal(patient: Patient){
    this.editingPatient = {...patient};
    this.showEdit = true;
  }

  submitNewPatient(): void{
    this.patientService.createPatient(this.newPatient).subscribe(
      (newPatient) => {
        this.patientList.push(newPatient);
        this.filteredPatientList = [...this.patientList];
        this.showCreate = false;
      },
      (error) => {
        console.error('Erro ao criar o patient profile',error);
      }
    )
  }

  submitEditedPatient(){
    if(this.editingPatient){
      this.patientService
    }
  }
}
