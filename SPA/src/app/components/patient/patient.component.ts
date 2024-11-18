import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, Message, SelectItem } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { Patient } from '../../model/patient.model';
import { PatientService } from '../../services/patient.service';
import { FormsModule } from '@angular/forms';
import { EditPatient } from '../../model/editPatient.model';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, FormsModule, ButtonModule,MessagesModule],
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
  editingPatient: Patient = {} as Patient;
  matchModeOptions: SelectItem[] = [];
  showDeleteConfirm: boolean = false;
  message: Message[] = [];

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
  openDeleteModal(patient: Patient): void {
    this.currentPatient = patient;
  }

  submitNewPatient(): void{
    this.patientService.createPatient(this.newPatient).subscribe(
      (newPatient) => {
        this.patientList.push(newPatient);
        this.filteredPatientList = [...this.patientList];
        this.showCreate = false;

        this.message = [{
          severity: 'success',
          summary: 'Success',
          detail: `${this.newPatient.fullName}'s profile has been created successfully.`
        }];
      },
      (error) => {
        console.error('Erro ao criar o patient profile',error);
      }
    )
  }
 
  submitEditPatient(): void {
 
  const editPatientData: EditPatient = {
    firstName: this.editingPatient.firstName,
    lastName: this.editingPatient.lastName,
    fullName: this.editingPatient.fullName,
    email: this.editingPatient.email,
    phone: this.editingPatient.phone,
    emergencyContact: this.editingPatient.emergencyContact,
    allergies: this.editingPatient.allergies
  };

  
  this.patientService.updatePatient(this.editingPatient.id, editPatientData).subscribe(
    (updatedPatient) => {
      
      const index = this.patientList.findIndex(p => p.id === updatedPatient.id);
      if (index !== -1) {
        this.patientList[index] = updatedPatient;
        this.filteredPatientList = [...this.patientList];

        this.message = [{
          severity: 'success',
          summary: 'Success',
          detail: `${this.editingPatient.fullName}'s profile has been edited successfully.`
        }];
      }
      this.showEdit = false; 
    },
    (error) => {
      console.error('Erro ao atualizar o patient profile', error);
    }
  );
}


deletePatient(patient: Patient): void {
  this.currentPatient = patient;
  this.showDeleteConfirm = true; 
}

confirmDeletePatient(): void {
  if (this.currentPatient) {
    this.patientService.deletePatient(this.currentPatient.id).subscribe(
      () => {
        
        this.patientList = this.patientList.filter(p => p.id !== this.currentPatient?.id);
        this.filteredPatientList = [...this.patientList];
        this.showDeleteConfirm = false;

      
        this.message = [{
          severity: 'success',
          summary: 'Success',
          detail: `${this.currentPatient.fullName}'s profile has been deleted successfully.`
        }];
      },
      (error) => {
        console.error('Error deleting the patient profile', error);
        this.showDeleteConfirm = false;

       
        this.message = [{
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error deleting the patient profile. Please try again.'
        }];
      }
    );
  }
}
  
}
