import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { Staff } from '../../model/staff.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css',
})
export class StaffComponent implements OnInit {
  staffList: Staff[] = [];

  constructor(private service: StaffService) {}

  ngOnInit(): void {
    this.service.getStaffList().subscribe((s) => {
      this.staffList = s;
    });
  }
}
