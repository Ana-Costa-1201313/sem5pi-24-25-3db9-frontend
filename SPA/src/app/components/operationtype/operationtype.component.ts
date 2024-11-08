import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OperationType } from '../../model/operationType.model';
import { OperationTypeService } from '../../services/operationType.service';
import { DialogModule } from 'primeng/dialog';

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

  constructor(private service: OperationTypeService) {
  }

  ngOnInit(): void {
    this.service.getOperationTypeList().subscribe((op) => {
      this.operationTypeList = op;
    })
  }

  openDetailsModal(opType: OperationType): void{
    this.currentOpType = opType;
    this.showDetails = true;
  }

}
