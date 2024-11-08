import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OperationType } from '../../model/operationType/operationType.model';
import { OperationTypeService } from '../../services/operationType.service';
import { DialogModule } from 'primeng/dialog';
import { FilterMatchMode, SelectItem } from 'primeng/api';
import { FormsModule } from '@angular/forms'; // <-- Add this import

@Component({
  selector: 'app-operationtype',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, FormsModule], // <-- Add FormsModule here
  templateUrl: './operationtype.component.html',
  styleUrl: './operationtype.component.css'
})
export class OperationtypeComponent implements OnInit {

  operationTypeList: OperationType[] = [];
  filteredOperationTypeList: OperationType[] = [];
  currentOpType: OperationType | null = null;
  showDetails: boolean = false;
  matchModeOptions: SelectItem[] = [];
  specializationFilter: string = '';

  constructor(private service: OperationTypeService) {}

  ngOnInit(): void {
    this.service.getOperationTypeList().subscribe((op) => {
      this.operationTypeList = op;
      this.filteredOperationTypeList = op;
    });

    this.matchModeOptions = [
      { label: 'Contains', value: FilterMatchMode.CONTAINS }
    ];
  }

  openDetailsModal(opType: OperationType): void {
    this.currentOpType = opType;
    this.showDetails = true;
  }

  onSpecializationFilterChange() {
    if (this.specializationFilter) {
      this.filteredOperationTypeList = this.operationTypeList.filter(opType => 
        opType.requiredStaff?.some(staff =>
          staff.specialization?.toLowerCase().includes(this.specializationFilter.toLowerCase())
        )
      );
    } else {
      this.filteredOperationTypeList = [...this.operationTypeList];
    }
  }
}
