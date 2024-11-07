import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OperationType } from '../../model/operationType.model';
import { OperationTypeService } from '../../services/operationType.service'; 

@Component({
  selector: 'app-operationtype',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './operationtype.component.html',
  styleUrl: './operationtype.component.css'
})
export class OperationtypeComponent implements OnInit {

  operationTypeList: OperationType[] = [];

  constructor(private service: OperationTypeService){
  }

  ngOnInit(): void {
    this.service.getOperationTypeList().subscribe((op) => {
      this.operationTypeList = op;
    })
  }

}
