import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OperationType } from '../../model/operationType/operationType.model';
import { OperationTypeService } from '../../services/operationType.service';
import { DialogModule } from 'primeng/dialog';
import { FilterMatchMode, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-operationtype',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule],
  templateUrl: './operationtype.component.html',
  styleUrl: './operationtype.component.css'
})
export class OperationtypeComponent implements OnInit {

  operationTypeList: OperationType[] = [];
  currentOpType: OperationType | null = null;
  showDetails: boolean = false;
  matchModeOptions: SelectItem[] = [];
  statusOptions: SelectItem[] = [];


  constructor(private service: OperationTypeService) {
  }

  ngOnInit(): void {
    this.service.getOperationTypeList().subscribe((op) => {
      this.operationTypeList = op;
      console.log(op);
    });

    this.matchModeOptions = [
      { label: 'Contains', value: FilterMatchMode.CONTAINS}
    ];
  }

  openDetailsModal(opType: OperationType): void{
    this.currentOpType = opType;
    this.showDetails = true;
  }

}
