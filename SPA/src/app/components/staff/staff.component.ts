import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Staff } from '../../model/staff.model';
import { StaffService } from '../../services/staff.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css',
})
export class StaffComponent implements OnInit {
  staffList: Staff[] = [];
  currentStaff: Staff | null = null;
  showDetails: boolean = false;

  constructor(private service: StaffService) {}

  ngOnInit(): void {
    this.service.getStaffList().subscribe((s) => {
      this.staffList = s;
    });
  }

  openDetailsModal(staff: Staff): void {
    this.currentStaff = staff;
    this.showDetails = true;
  }
}
