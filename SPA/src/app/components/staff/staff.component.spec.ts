import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Role } from '../../model/role.model';
import { Specialization } from '../../model/specialization.model';
import { Staff } from '../../model/staff/staff.model';
import { SpecializationService } from '../../services/specialization.service';
import { StaffService } from '../../services/staff.service';
import { StaffComponent } from './staff.component';

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

  it('should open create modal', () => {
    component.openCreateModal();

    expect(component.showCreate).toBeTrue();
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

  it('should open edit modal', () => {
    const staff = (component.currentStaff = {
      id: 'id',
      name: 'name',
      phone: '999999999',
      specialization: 'spec',
      availabilitySlots: [],
    } as any);

    component.openEditModal(staff);

    expect(component.showEdit).toBeTrue();
  });
});
