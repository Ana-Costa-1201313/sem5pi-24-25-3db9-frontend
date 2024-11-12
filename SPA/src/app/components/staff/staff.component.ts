import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FilterMatchMode, Message, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { Role } from '../../model/role.model';
import { Specialization } from '../../model/specialization.model';
import { CreateStaff } from '../../model/staff/createStaff.model';
import { Staff } from '../../model/staff/staff.model';
import { SpecializationService } from '../../services/specialization.service';
import { StaffService } from '../../services/staff.service';
import { format } from 'date-fns';
import { EditStaff } from '../../model/staff/editStaff.model';

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
    CalendarModule,
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
  specializations: Specialization[] = [];
  specializationsNames: string[] = [];
  showCreate: boolean = false;
  showDetails: boolean = false;
  deactivate: boolean = false;
  showEdit: boolean = false;

  createStaffForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    licenseNumber: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    specialization: new FormControl<string | null>(null),
    availabilitySlots: new FormArray([new FormControl<Date[]>(null)]),
    role: new FormControl<Role | null>(null, Validators.required),
    recruitmentYear: new FormControl(null, Validators.required),
  });

  editStaffForm = new FormGroup({
    phone: new FormControl(null, Validators.required),
    specialization: new FormControl<string | null>(null),
    availabilitySlots: new FormArray([new FormControl<Date[]>(null)]),
  });

  constructor(
    private service: StaffService,
    private specService: SpecializationService
  ) {}

  ngOnInit(): void {
    this.matchModeOptions = [
      { label: 'Contains', value: FilterMatchMode.CONTAINS },
    ];

    this.service.getTotalRecords().subscribe((t) => (this.totalRecords = t));

    this.specService.getSpecializationList().subscribe((s) => {
      this.specializations = s;

      const names: string[] = [];

      this.specializations.forEach((spec) => names.push(spec.name));

      this.specializationsNames = names;
    });
  }

  openCreateModal(): void {
    this.showCreate = true;
  }

  addStaff(): void {
    this.showCreate = false;

    const availabilitySlotsIso: string[] = [];

    this.createStaffForm.get('availabilitySlots').value.forEach((slot) => {
      if (slot != null) {
        availabilitySlotsIso.push(
          slot[0].toISOString() + '/' + slot[1].toISOString()
        );
      }
    });

    const request: CreateStaff = {
      ...this.createStaffForm.value,

      phone: this.createStaffForm.get('phone').value.toString(),

      availabilitySlots: availabilitySlotsIso,

      recruitmentYear: new Date(
        this.createStaffForm.get('recruitmentYear').value
      ).getFullYear(),
    };

    this.service.addStaff(request).subscribe({
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
        this.createStaffForm.controls.availabilitySlots.clear();
        this.addSlot();
      },
      error: (error) => {
        this.onFailure(error);
      },
    });
  }

  addSlot(): void {
    const availabilitySlot = new FormControl<Date[]>(null);

    this.createStaffForm.controls.availabilitySlots.push(availabilitySlot);
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

  openEditModal(staff: Staff): void {
    this.currentStaff = staff;
    this.showEdit = true;
    this.editStaffForm.get('phone').setValue(this.currentStaff?.phone);
    this.editStaffForm
      .get('specialization')
      .setValue(this.currentStaff?.specialization);

    this.editStaffForm.controls.availabilitySlots.clear();

    if (this.currentStaff?.availabilitySlots.length != 0) {
      this.currentStaff?.availabilitySlots.forEach((slot, index) => {
        this.addAvailabilitySlotToEdit();

        this.editStaffForm.controls.availabilitySlots
          .at(index)
          .setValue(this.createAvailabilitySlot(slot));
      });
    } else {
      this.addAvailabilitySlotToEdit();
    }
  }

  editStaff(): void {
    this.showEdit = false;

    if (this.currentStaff?.id == null) {
      return;
    }

    const availabilitySlotsIso: string[] = [];

    this.editStaffForm.get('availabilitySlots').value.forEach((slot) => {
      if (slot != null) {
        availabilitySlotsIso.push(
          slot[0].toISOString() + '/' + slot[1].toISOString()
        );
      }
    });

    const request: EditStaff = {
      ...this.editStaffForm.value,

      id: this.currentStaff.id,

      phone: this.editStaffForm.get('phone').value.toString(),

      availabilitySlots: availabilitySlotsIso,
    };

    this.service.editStaff(this.currentStaff.id, request).subscribe({
      next: () => {
        this.loadStaffLazy(this.lazyEvent);
        this.message = [
          {
            severity: 'success',
            summary: 'Success!',
            detail: 'Your Staff Profile was edited with success',
          },
        ];
        this.editStaffForm.reset();
        this.editStaffForm.controls.availabilitySlots.clear();
        this.addAvailabilitySlotToEdit();
      },
      error: (error) => {
        this.onFailure(error);
      },
    });
  }

  addAvailabilitySlotToEdit(): void {
    const availabilitySlot = new FormControl<Date[]>(null);

    this.editStaffForm.controls.availabilitySlots.push(availabilitySlot);
  }

  createAvailabilitySlot(avSlot: string): Date[] {
    const slotString: string[] = avSlot.split('/');

    const slotDate: Date[] = [];
    slotDate[0] = new Date(slotString[0]);
    slotDate[1] = new Date(slotString[1]);

    return slotDate;
  }

  showAvailabilitySlots(slots: string): string {
    const slotDate: Date[] = this.createAvailabilitySlot(slots);

    const slot1: string = format(slotDate[0], 'MM/dd/yyyy HH:mm');
    const slot2: string = format(slotDate[1], 'MM/dd/yyyy HH:mm');

    return slot1 + ' - ' + slot2;
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
        severity: 'success',
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
