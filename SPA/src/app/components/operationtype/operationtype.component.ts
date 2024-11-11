import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OperationType } from '../../model/operationType/operationType.model';
import { OperationTypeService } from '../../services/operationType.service';
import { DialogModule } from 'primeng/dialog';
import { FilterMatchMode, Message, SelectItem } from 'primeng/api';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CreateOperationType } from '../../model/operationType/CreateOperationType.model';
import { HttpErrorResponse } from '@angular/common/http';
import { RequiredStaff } from '../../model/operationType/requiredStaff.model';
import { Specialization } from '../../model/specialization.model';
import { SpecializationService } from '../../services/specialization.service';

@Component({
  selector: 'app-operationtype',
  standalone: true,
  imports: [
    CommonModule, TableModule, DialogModule, FormsModule, ButtonModule,
    MessagesModule, ReactiveFormsModule, DropdownModule, InputTextModule,
    InputNumberModule
  ],
  templateUrl: './operationtype.component.html',
  styleUrl: './operationtype.component.css'
})
export class OperationtypeComponent implements OnInit {
  operationTypeList: OperationType[] = [];
  filteredOperationTypeList: OperationType[] = [];
  currentOpType: OperationType | null = null;
  showDetails = false;
  matchModeOptions: SelectItem[] = [];
  deactivate = false;
  lazyEvent: any;
  message: Message[] = [];
  showCreate = false;
  specializations: Specialization[] = [];
  specializationsNames: string[] = [];


  createOperationTypeForm: FormGroup;

  constructor(
    private service: OperationTypeService,
    private specService: SpecializationService,
    private fb: FormBuilder  // Injecting FormBuilder here
  ) {
    // Initializing the form with FormBuilder
    this.createOperationTypeForm = this.fb.group({
      name: ['', Validators.required],
      anesthesiaPatientPreparationInMinutes: [null, Validators.required],
      surgeryInMinutes: [null, Validators.required],
      cleaningInMinutes: [null, Validators.required],
      requiredStaff: this.fb.array([])  // FormArray for dynamic required staff
    });
  }

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

    this.specService.getSpecializationList().subscribe((s) => {
      this.specializations = s;
      
      const names: string[] = [];

      this.specializations.forEach((spec) => names.push(spec.name));
      this.specializationsNames = names;
    });
  }

  get requiredStaff(): FormArray {
    return this.createOperationTypeForm.get('requiredStaff') as FormArray;
  }

  addRequiredStaff(): void {
    const staffGroup = this.fb.group({
      specialization: ['', Validators.required],
      total: [1, [Validators.required, Validators.min(1)]]
    });
    this.requiredStaff.push(staffGroup);
  }

  removeRequiredStaff(index: number): void {
    this.requiredStaff.removeAt(index);
  }

  openDetailsModal(opType: OperationType): void {
    this.currentOpType = opType;
    this.showDetails = true;
  }

  openDeactivateModal(opType: OperationType): void {
    this.currentOpType = opType;
    this.deactivate = true;
  }

  deactivateOperationType(): void {
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
    if (this.createOperationTypeForm.invalid) return;

    this.showCreate = false;

    const request: CreateOperationType = {
      ...this.createOperationTypeForm.value,
      requiredStaff: this.createOperationTypeForm.value.requiredStaff as RequiredStaff[]
    };

    this.service.addOperationType(request).subscribe({
      next: () => {
        // Success message
        this.message = [
          {
            severity: 'success',
            summary: 'Success!',
            detail: 'Your Operation Type was added with success',
          },
        ];

        // Reset form and clear requiredStaff FormArray
        this.createOperationTypeForm.reset();
        this.requiredStaff.clear();

        // Refresh the operationTypeList to include the newly added item
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
      },
      error: (error) => this.onFailure(error),
    });
  }

  onFailure(error: HttpErrorResponse): void {
    this.message = [
      {
        severity: 'error',
        summary: 'Failure!',
        detail: error.status >= 500 ? 'Server error' : error.error.message
      },
    ];
  }
}
