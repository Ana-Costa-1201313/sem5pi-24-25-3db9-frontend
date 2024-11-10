import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OperationType } from '../../model/operationType/operationType.model';
import { OperationTypeService } from '../../services/operationType.service';
import { DialogModule } from 'primeng/dialog';
import { FilterMatchMode, Message, SelectItem } from 'primeng/api';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CreateOperationType } from '../../model/operationType/CreateOperationType.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-operationtype',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, FormsModule, ButtonModule, MessagesModule, FormsModule, ReactiveFormsModule, DropdownModule, InputTextModule, InputNumberModule],
  templateUrl: './operationtype.component.html',
  styleUrl: './operationtype.component.css'
})
export class OperationtypeComponent implements OnInit {

  operationTypeList: OperationType[] = [];
  filteredOperationTypeList: OperationType[] = [];
  currentOpType: OperationType | null = null;
  showDetails: boolean = false;
  matchModeOptions: SelectItem[] = [];
  deactivate: boolean = false;
  lazyEvent: any;
  message: Message[] = [];
  showCreate: boolean = false;

  createOperationTypeForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    anesthesiaPatientPreparationInMinutes: new FormControl(null, Validators.required),
    surgeryInMinutes: new FormControl(null, Validators.required),
    cleaningInMinutes: new FormControl(null, Validators.required)
  });

  constructor(private service: OperationTypeService) { }

  ngOnInit(): void {
    this.service.getOperationTypeList().subscribe((op) => {
      this.operationTypeList = op.map(opType => ({
        ...opType,
        specialization: opType.requiredStaff
          ?.map(staff => staff.specialization)
          .filter(Boolean)
          .join(', ')
      }));
      this.filteredOperationTypeList = [...this.operationTypeList];
    });

    this.matchModeOptions = [
      { label: 'Contains', value: FilterMatchMode.CONTAINS }
    ];
  }

  openDetailsModal(opType: OperationType): void {
    this.currentOpType = opType;
    this.showDetails = true;
  }

  openDeactivateModal(opType: OperationType): void {
    this.currentOpType = opType;
    this.deactivate = true;
  }

  deactivateOperationType() {
    if (this.currentOpType?.id == null) {
      return;
    }

    this.service.deactivateOperationType(this.currentOpType.id).subscribe(() => {
      this.service.getOperationTypeList().subscribe((op) => {
        this.operationTypeList = op.map(opType => ({
          ...opType,
          specialization: opType.requiredStaff
            ?.map(staff => staff.specialization)
            .filter(Boolean)
            .join(', ')
        }));
        this.filteredOperationTypeList = [...this.operationTypeList];
      });
    });

    this.message = [
      {
        severity: 'info',
        summary: 'Success!',
        detail: 'The Operation Type "' + this.currentOpType.name + '" was deactivated with success',
      },
    ];

    this.deactivate = false;
  }

  openCreateModal(): void {
    this.showCreate = true;
  }

  addOperationType(): void {

    this.showCreate = false;

    const request: CreateOperationType = {
      ...this.createOperationTypeForm.value,

      name: this.createOperationTypeForm.get('name').value.toString(),
      anesthesiaPatientPreparationInMinutes: this.createOperationTypeForm.get('anesthesiaPatientPreparationInMinutes').value.toString(),
      surgeryInMinutes: this.createOperationTypeForm.get('surgeryInMinutes').value.toString(),
      cleaningInMinutes: this.createOperationTypeForm.get('cleaningInMinutes').value.toString(),
    };

    this.service.addOperationType(request).subscribe({
      next: () => {
        this.message = [
          {
            severity: 'success',
            summary: 'Success!',
            detail: 'Your Operation Type was added with success',
          },
        ];

        this.createOperationTypeForm.reset();
      },
      error: (error) => {
        this.onFailure(error);
      },
    });
  }


  onFailure(error: HttpErrorResponse): void {
    if (error.status >= 500) {
      this.message = [
        { severity: 'error', summary: 'Failure!', detail: 'Server error' },
      ];
    } else {
      this.message = [
        { severity: 'error', summary: 'Failure!', detail: error.error.message },
      ];
    }

  }

}
