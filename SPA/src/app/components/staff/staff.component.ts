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
  Validators,
} from '@angular/forms';
import { Role } from '../../model/role.model';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageModule } from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule
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
  roles: Role[] = [Role.Doctor, Role.Nurse, Role.Technician];
  showCreate: boolean = false;
  showDetails: boolean = false;
  deactivate: boolean = false;

  createStaffForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    licenseNumber: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    specialization: new FormControl(null),
    availabilitySlots: new FormControl(null),
    role: new FormControl<Role | null>(null, Validators.required),
    recruitmentYear: new FormControl(null, Validators.required),
  });

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

  addStaff(): void {
    this.showCreate = false;

    this.createStaffForm
      .get('phone')
      .setValue(this.createStaffForm.get('phone').value.toString());

    this.service.addStaff(this.createStaffForm.value).subscribe({
      next: () => {
        this.loadStaffLazy(this.lazyEvent);
        this.message = [
          {
            severity: 'success',
            summary: 'Success!',
            detail: 'Your Staff Profile was added with success',
          },
        ];
        this.createStaffForm.reset();
      },
      error: (error) => {
        this.onFailure(error);
      },
    });
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

  onFailure(error: HttpErrorResponse): void {
    if (error.status >= 500) {
      this.message = [
        { severity: 'error', summary: 'Failure!', detail: 'Server error' },
      ];
    } else {
      this.message = [
        { severity: 'error', summary: 'Failure!', detail: error.error.message },
      ];
    }
  }
}
