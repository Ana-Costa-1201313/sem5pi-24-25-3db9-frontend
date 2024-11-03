import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Staff } from '../../model/staff.model';
import { StaffService } from '../../services/staff.service';
import { CommonModule } from '@angular/common';
import { FilterMatchMode, LazyLoadEvent, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, ButtonModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css',
})
export class StaffComponent implements OnInit {
  staffList: Staff[] = [];
  currentStaff: Staff | null = null;
  showDetails: boolean = false;
  matchModeOptions: SelectItem[] = [];

  constructor(private service: StaffService) {}

  ngOnInit(): void {
    this.matchModeOptions = [
      { label: 'Contains', value: FilterMatchMode.CONTAINS },
    ];
  }

  openDetailsModal(staff: Staff): void {
    this.currentStaff = staff;
    this.showDetails = true;
  }

  loadStaffLazy(event: any) {
    console.log('aaaaaaaaaaaa', event);

    console.log('bbbbbbbbbb', event.filters?.email?.value);

    this.service
      .getStaffList(
        event.filters?.name?.value,
        event.filters?.email?.value,
        event.filters?.specialization?.value,
        event.first,
        event.rows
      )
      .subscribe((s) => (this.staffList = s));
  }
}
