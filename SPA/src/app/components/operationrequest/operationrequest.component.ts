import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OperationRequest } from '../../model/operationRequest.model';
import { OperationRequestService } from '../../services/operationRequest.service';
import { DialogModule } from 'primeng/dialog';
import { FilterMatchMode, SelectItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-operationrequest',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, FormsModule, ButtonModule],
  templateUrl: './operationrequest.component.html',
  styleUrl: './operationrequest.component.css'
})
export class OperationrequestComponent implements OnInit {

  operationRequestList: OperationRequest[] = [];
  filteredOperationRequestList: OperationRequest[] = [];
  currentOpRequest: OperationRequest | null = null;
  showDetails: boolean = false;
  matchModeOptions: SelectItem[] = [];

  constructor(private service: OperationRequestService) { }

  ngOnInit(): void {
    this.service.getOperationRequestList().subscribe((op) => {
      this.operationRequestList = op.map(opReq => ({
        ...opReq
      }));
      console.log(this.operationRequestList)
    });
    this.filteredOperationRequestList = [...this.operationRequestList];
    this.matchModeOptions = [
      { label: 'Contains', value: FilterMatchMode.CONTAINS }
    ]
  };

  openDetailsModal(opRequest: OperationRequest): void {
    this.currentOpRequest = opRequest;
    this.showDetails = true;
  }

}
