import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { FilterMatchMode, Message, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { CreateOperationRequest } from '../../model/createOperationRequest';
import { OperationRequest } from '../../model/operationRequest.model';
import { OperationRequestService } from '../../services/operationRequest.service';
import { EditOperationRequest } from '../../model/editOperationRequest.model';

@Component({
  selector: 'app-operationrequest',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
  ],
  templateUrl: './operationrequest.component.html',
  styleUrl: './operationrequest.component.css'
})
export class OperationrequestComponent implements OnInit {

  operationRequestList: OperationRequest[] = [];
  filteredOperationRequestList: OperationRequest[] = [];
  currentOpRequest: OperationRequest | null = null;
  matchModeOptions: SelectItem[] = [];
  totalRecords: number = 0;
  lazyEvent: any;
  message: Message[] = [];
  showCreate: boolean = false;
  showUpdate: boolean = false;
  showDetails: boolean = false;
  deactivate: boolean = false;

  updateOperationRequestForm: FormGroup;

  createOpReqForm = new FormGroup({
    opTypeName: new FormControl(null, Validators.required),
    deadlineDate: new FormControl(null, Validators.required),
    priority: new FormControl(null, Validators.required),
    patientEmail: new FormControl(null, Validators.required),
    doctorEmail: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });

  constructor(
    private service: OperationRequestService,
    private fb : FormBuilder) {
    this.updateOperationRequestForm = this.fb.group({
      deadlineDate: ['', Validators.required],
      priority: ['', Validators.required],
      description: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.service.getOperationRequestList().subscribe((op) => {
      this.operationRequestList = op.map(opReq => ({
        ...opReq,
      }));
      this.filteredOperationRequestList = [...this.operationRequestList];
      });
    
    this.matchModeOptions = [
      { label: 'Contains', value: FilterMatchMode.CONTAINS }
    ]
  };

  openCreateModal(): void {
    this.showCreate = true;
  }

  openDeactivateModal(opRequest: OperationRequest): void {
    this.currentOpRequest = opRequest;
    this.deactivate = true;
  }

  deactivateOperationRequest(): void {
    if (this.currentOpRequest?.id == null) {
      return;
    }
    this.service.deactivateOperationRequest(this.currentOpRequest.id).subscribe(
      () => {
        this.operationRequestList = this.operationRequestList.filter(
          (opReq) => opReq.id !== this.currentOpRequest.id
        );
        this.filteredOperationRequestList = [...this.operationRequestList];
      },
      (error: HttpErrorResponse) => {
        this.message = [
          { severity: 'error', summary: 'Error', detail: error.message },
        ];
      }
    );

    this.message = [
      {
        severity: 'info',
        summary: 'Success!',
        detail: 'The Operation Request "' + this.currentOpRequest.id + '" was deleted with success.',
      },
    ];
  }

  addOpReq(): void {
    this.showCreate = false;

    const request: CreateOperationRequest = {
      opTypeName: this.createOpReqForm.controls.opTypeName.value,
      deadlineDate: this.createOpReqForm.controls.deadlineDate.value,
      priority: this.createOpReqForm.controls.priority.value,
      patientEmail: this.createOpReqForm.controls.patientEmail.value,
      doctorEmail: this.createOpReqForm.controls.doctorEmail.value,
      description: this.createOpReqForm.controls.description.value,
    };

    this.service.addOperationRequest(request).subscribe(
      (opReq) => {
        this.operationRequestList.push(opReq);
        this.filteredOperationRequestList = [...this.operationRequestList];
      },
      (error: HttpErrorResponse) => {
        this.message = [
          { severity: 'error', summary: 'Error', detail: error.message },
        ];
      }
    );
  }

  openUpdateModal(opRequest: OperationRequest): void {
    this.currentOpRequest = opRequest;
    this.showUpdate = true;

    this.updateOperationRequestForm.reset();
    this.updateOperationRequestForm.patchValue({
      deadlineDate: opRequest.deadlineDate,
      priority: opRequest.priority,
      description: opRequest.description,
    });
  }

  openDetailsModal(opRequest: OperationRequest): void {
    this.currentOpRequest = opRequest;
    this.showDetails = true;
  }

  updateOperationRequest(): void {
    if(this.updateOperationRequestForm.invalid) return;

    this.showUpdate = false;

    const updatedData: EditOperationRequest = {
      deadlineDate: this.updateOperationRequestForm.value.deadlineDate,
      priority: this.updateOperationRequestForm.value.priority,
      description: this.updateOperationRequestForm.value.description,
    };

    this.service.updateOperationRequest(this.currentOpRequest.id, updatedData).subscribe({
      next: () => {
        // Success message
        this.message = [
          {
            severity: 'success',
            summary: 'Success!',
            detail: 'Operation Request updated successfully!',
          },
        ];
  
        // Refresh the operation type list
        this.service.getOperationRequestList().subscribe((op) => {
          this.operationRequestList = op.map(opReq => ({
            ...opReq,
          }));
        });
      },
      error: (error) => this.onFailure(error),
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
