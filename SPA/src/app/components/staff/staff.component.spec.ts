import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Role } from '../../model/role.model';
import { Staff } from '../../model/staff.model';
import { StaffService } from '../../services/staff.service';
import { StaffComponent } from './staff.component';
import { of } from 'rxjs';

describe('StaffComponent', () => {
  let component: StaffComponent;
  let fixture: ComponentFixture<StaffComponent>;
  let service: StaffService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffComponent],
      providers: [
        StaffService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(StaffService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get total records', () => {
    spyOn(service, 'getTotalRecords').and.returnValue(of(2));

    component.ngOnInit();

    expect(component.totalRecords).toBe(2);
    expect(service.getTotalRecords).toHaveBeenCalledTimes(1);
  });

  it('should open details', () => {
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
        severity: 'info',
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
});
