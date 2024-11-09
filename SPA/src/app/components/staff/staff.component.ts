import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, Message, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Staff } from '../../model/staff.model';
import { StaffService } from '../../services/staff.service';
import { MessagesModule } from 'primeng/messages';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Role } from '../../model/role.model';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule
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
  roles: Role[];
  showCreate: boolean = false;
  showDetails: boolean = false;
  deactivate: boolean = false;

  createStaffForm = new FormGroup({
    name: new FormControl(null),
    licenseNumber: new FormControl(null),
    phone: new FormControl(null),
    specialization: new FormControl(null),
    availabilitySlots: new FormControl(null),
    role: new FormControl<Role | null>(null),
    recruitmentYear: new FormControl(null),
  });

  constructor(private service: StaffService) {
    this.roles = Object.values(Role);
  }

  ngOnInit(): void {
    this.matchModeOptions = [
      { label: 'Contains', value: FilterMatchMode.CONTAINS },
    ];

    this.service.getTotalRecords().subscribe((t) => (this.totalRecords = t));
  }

  openCreateModal(): void {
    this.showCreate = true;
  }

  addStaff(): void {
    this.showCreate = false;
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
