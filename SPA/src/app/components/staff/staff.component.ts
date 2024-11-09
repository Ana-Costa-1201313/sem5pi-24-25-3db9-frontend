import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, Message, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Staff } from '../../model/staff.model';
import { StaffService } from '../../services/staff.service';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    MessagesModule,
  ],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css',
})
export class StaffComponent implements OnInit {
  matchModeOptions: SelectItem[] = [];
  totalRecords: number = 0;
  lazyEvent: any;
  message: Message[] = [];
  staffList: Staff[] = [];
  currentStaff: Staff = null;
  showCreate: boolean = false;
  showDetails: boolean = false;
  deactivate: boolean = false;

  constructor(private service: StaffService) {}

  ngOnInit(): void {
    this.matchModeOptions = [
      { label: 'Contains', value: FilterMatchMode.CONTAINS },
    ];

    this.service.getTotalRecords().subscribe((t) => (this.totalRecords = t));
  }

  openCreateModal(): void {
    this.showCreate = true;
  }

  openDetailsModal(staff: Staff): void {
    this.currentStaff = staff;
    this.showDetails = true;
  }

  loadStaffLazy(event: any) {
    this.lazyEvent = event;

    this.service
      .getStaffList(
        event.filters?.name?.value,
        event.filters?.email?.value,
        event.filters?.specialization?.value,
        event.first / event.rows + 1,
        event.rows
      )
      .subscribe((s: Staff[]) => (this.staffList = s));
  }

  openDeactivateModal(staff: Staff) {
    this.currentStaff = staff;
    this.deactivate = true;
  }

  deactivateStaff() {
    if (this.currentStaff?.id == null) {
      return;
    }

    this.service.deactivateStaff(this.currentStaff.id).subscribe(() => {
      this.loadStaffLazy(this.lazyEvent);
    });

    this.deactivate = false;

    this.message = [
      {
        severity: 'info',
        summary: 'Success!',
        detail: 'The Staff Profile was deactivated with success',
      },
    ];
  }
}
