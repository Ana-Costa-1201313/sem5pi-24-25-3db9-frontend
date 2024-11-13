import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Role } from '../../model/role.model';
import { StaffService } from '../../services/staff.service';
import { StaffComponent } from './staff.component';
import { of, throwError } from 'rxjs';
import { Specialization } from '../../model/specialization.model';
import { SpecializationService } from '../../services/specialization.service';
import { Staff } from '../../model/staff/staff.model';

describe('StaffComponent', () => {
  let component: StaffComponent;
  let fixture: ComponentFixture<StaffComponent>;
  let service: StaffService;
  let specService: SpecializationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffComponent],
      providers: [
        StaffService,
        SpecializationService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(StaffService);
    specService = fixture.debugElement.injector.get(SpecializationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get total records', () => {
    spyOn(service, 'getTotalRecords').and.returnValue(of(2));

    spyOn(specService, 'getSpecializationList').and.returnValue(of([]));

    component.ngOnInit();

    expect(component.totalRecords).toBe(2);
    expect(service.getTotalRecords).toHaveBeenCalledTimes(1);
  });

  it('should get specialization list', () => {
    spyOn(service, 'getTotalRecords').and.returnValue(of(2));

    const specList: Specialization[] = [{ id: '1' }, { id: '2' }] as any;

    spyOn(specService, 'getSpecializationList').and.returnValue(of(specList));

    component.ngOnInit();

    expect(component.specializations).toEqual(specList);
    expect(specService.getSpecializationList).toHaveBeenCalledTimes(1);
  });

  it('should open details', () => {
    const spec: Specialization = {
      name: 'specName',
      active: true,
    };

    const staff: Staff = {
      id: 'id',
      name: 'name',
      licenseNumber: 123,
      email: 'email',
      phone: '999999999',
      specialization: 'spec',
      availabilitySlots: [''],
      role: Role.Nurse,
      mechanographicNum: 'N123',
      active: true,
    };

    component.openDetailsModal(staff);

    expect(component.currentStaff).toEqual(staff);
    expect(component.showDetails).toBeTrue();
  });

  it('should load staffs', () => {
    const list: Staff[] = [{ id: '1' }, { id: '2' }] as any;

    spyOn(service, 'getStaffList').and.returnValue(of(list));

    const event = {
      filters: {
        name: {
          value: 'name',
        },
        email: {
          value: 'email',
        },
        specialization: {
          value: 'spec',
        },
      },
      first: 0,
      rows: 5,
    };
    component.loadStaffLazy(event);

    expect(component.staffList).toEqual(list);
    expect(service.getStaffList).toHaveBeenCalledOnceWith(
      'name',
      'email',
      'spec',
      1,
      5
    );
  });

  it('should open deactivation confirmation', () => {
    const spec: Specialization = {
      name: 'specName',
      active: true,
    };

    const staff: Staff = {
      id: 'id',
      name: 'name',
      licenseNumber: 123,
      email: 'email',
      phone: '999999999',
      specialization: 'spec',
      availabilitySlots: [''],
      role: Role.Nurse,
      mechanographicNum: 'N123',
      active: true,
    };

    component.openDeactivateModal(staff);

    expect(component.currentStaff).toEqual(staff);
    expect(component.deactivate).toBeTrue();
  });

  it('should deactivate staff', () => {
    const staff = { id: '1' } as any;
    component.currentStaff = staff;

    spyOn(service, 'deactivateStaff').and.returnValue(of({} as any));
    spyOn(component, 'loadStaffLazy');

    component.deactivateStaff();

    const message = [
      {
        severity: 'success',
        summary: 'Success!',
        detail: 'The Staff Profile was deactivated with success',
      },
    ];

    expect(component.deactivate).toBeFalse();
    expect(component.message).toEqual(message);
    expect(service.deactivateStaff).toHaveBeenCalledTimes(1);
    expect(component.loadStaffLazy).toHaveBeenCalledTimes(1);
  });

  it('should not deactivate staff', () => {
    spyOn(service, 'deactivateStaff').and.returnValue(of({} as any));

    component.deactivateStaff();

    expect(service.deactivateStaff).toHaveBeenCalledTimes(0);
  });

  it('should open create modal', () => {
    component.openCreateModal();

    expect(component.showCreate).toBeTrue();
  });

  it('should add staff', () => {
    spyOn(service, 'addStaff').and.returnValue(of({} as any));
    spyOn(component, 'loadStaffLazy');
    spyOn(component, 'addSlot');

    component.createStaffForm.get('phone').setValue('');

    component.createStaffForm
      .get('availabilitySlots')
      .setValue([[new Date(), new Date()]]);

    component.addStaff();

    expect(component.showCreate).toBeFalse();
  });

  it('should send staff', () => {
    spyOn(service, 'addStaff').and.returnValue(of({} as any));
    spyOn(component, 'loadStaffLazy');
    spyOn(component, 'addSlot');

    const date1 = new Date();
    const date2 = new Date();

    component.createStaffForm.setValue({
      name: 'name',
      licenseNumber: 123,
      phone: 999999999,
      specialization: 'spec',
      availabilitySlots: [[date1, date2]],
      role: Role.Nurse,
      recruitmentYear: 2024,
    });

    const request = {
      ...component.createStaffForm.value,
      phone: component.createStaffForm.get('phone').value.toString(),

      availabilitySlots: [date1.toISOString() + '/' + date2.toISOString()],

      recruitmentYear: new Date(
        component.createStaffForm.get('recruitmentYear').value
      ).getFullYear(),
    };

    component.addStaff();

    expect(service.addStaff).toHaveBeenCalledOnceWith(request);
  });

  it('should add slot', () => {
    component.addSlot();

    expect(
      component.createStaffForm.controls.availabilitySlots.controls.length
    ).toBe(2);
  });

  it('should send error 500', () => {
    const error: HttpErrorResponse = { status: 500 } as any;

    component.onFailure(error);

    expect(component.message).toEqual([
      { severity: 'error', summary: 'Failure!', detail: 'Server error' },
    ]);
  });

  it('should send error 400', () => {
    const error: HttpErrorResponse = {
      status: 400,
      error: { message: 'abc' },
    } as any;

    component.onFailure(error);

    expect(component.message).toEqual([
      { severity: 'error', summary: 'Failure!', detail: 'abc' },
    ]);
  });

  it('should send error adding staff', () => {
    spyOn(service, 'addStaff').and.returnValue(
      throwError(() => {
        return { status: 400, error: { message: 'abc' } } as any;
      })
    );
    spyOn(component, 'loadStaffLazy');

    component.createStaffForm.get('phone').setValue('');

    component.createStaffForm
      .get('availabilitySlots')
      .setValue([[new Date(), new Date()]]);

    component.addStaff();

    expect(component.message).toEqual([
      { severity: 'error', summary: 'Failure!', detail: 'abc' },
    ]);
  });

  it('should open edit modal', () => {
    const staff = component.currentStaff = {
      id: 'id',
      name: 'name',
      phone: '999999999',
      specialization: 'spec',
      availabilitySlots: [],
    } as any;

    component.openEditModal(staff);

    expect(component.showEdit).toBeTrue();
  });

  it('should edit staff', () => {
    spyOn(service, 'editStaff').and.returnValue(of({} as any));
    spyOn(component, 'loadStaffLazy');
    spyOn(component, 'addAvailabilitySlotToEdit');

    component.editStaffForm.get('phone').setValue('');

    component.editStaffForm
      .get('availabilitySlots')
      .setValue([[new Date(), new Date()]]);

    component.editStaff();

    expect(component.showEdit).toBeFalse();
  });

  it('should send edited staff', () => {
    component.currentStaff = {
      id: 'id',
      name: 'name',
      phone: '999999999',
      specialization: 'spec',
    } as any;

    spyOn(service, 'editStaff').and.returnValue(of({} as any));
    spyOn(component, 'loadStaffLazy');
    spyOn(component, 'addAvailabilitySlotToEdit');

    const date1 = new Date();
    const date2 = new Date();

    component.editStaffForm.setValue({
      phone: 999999993,
      specialization: 'spec2',
      availabilitySlots: [[date1, date2]],
    });

    const request = {
      id: 'id',
      ...component.editStaffForm.value,
      phone: component.editStaffForm.get('phone').value.toString(),

      availabilitySlots: [date1.toISOString() + '/' + date2.toISOString()],
    };

    component.editStaff();

    expect(service.editStaff).toHaveBeenCalledOnceWith(
      component.currentStaff.id,
      request
    );
  });
});
