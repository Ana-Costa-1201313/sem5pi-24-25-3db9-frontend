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
  matchModeOptions: SelectItem[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    // Carregar lista de pacientes e configurar filtros
    this.patientService.getPatientList().subscribe((patients) => {
      this.patientList = patients.map(patient => ({
        ...patient,
        dateOfBirth: new Date(patient.dateOfBirth), // ou outro formato desejado
      }));
      this.filteredPatientList = [...this.patientList];
    });

    // Opções de filtro
    this.matchModeOptions = [
      { label: 'Contains', value: FilterMatchMode.CONTAINS }
    ];
  }

  openDetailsModal(patient: Patient): void {
    this.currentPatient = patient;
    this.showDetails = true;
  }
}
