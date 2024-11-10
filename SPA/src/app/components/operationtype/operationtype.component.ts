import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OperationType } from '../../model/operationType/operationType.model';
import { OperationTypeService } from '../../services/operationType.service';
import { DialogModule } from 'primeng/dialog';
import { FilterMatchMode, SelectItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-operationtype',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, FormsModule, ButtonModule],
  templateUrl: './operationtype.component.html',
  styleUrl: './operationtype.component.css'
})
export class OperationtypeComponent implements OnInit {

  operationTypeList: OperationType[] = [];
  filteredOperationTypeList: OperationType[] = [];
  currentOpType: OperationType | null = null;
  showDetails: boolean = false;
  matchModeOptions: SelectItem[] = [];

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
}
