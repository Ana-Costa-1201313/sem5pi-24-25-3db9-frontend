import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStaffComponent } from './delete-staff.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SpecializationService } from '../../../services/specialization.service';
import { StaffService } from '../../../services/staff.service';
import { StaffComponent } from '../staff.component';
import { of } from 'rxjs';

describe('DeleteStaffComponent', () => {
  let component: DeleteStaffComponent;
  let fixture: ComponentFixture<DeleteStaffComponent>;
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

    fixture = TestBed.createComponent(DeleteStaffComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(StaffService);
    specService = fixture.debugElement.injector.get(SpecializationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deactivate staff', () => {
    const staff = { id: '1' } as any;
    component.currentStaff = staff;

    spyOn(service, 'deactivateStaff').and.returnValue(of({} as any));

    component.deactivateStaff();

    expect(component.deactivate).toBeFalse();
    expect(service.deactivateStaff).toHaveBeenCalledTimes(1);
  });

  it('should not deactivate staff', () => {
    spyOn(service, 'deactivateStaff').and.returnValue(of({} as any));

    component.deactivateStaff();

    expect(service.deactivateStaff).toHaveBeenCalledTimes(0);
  });
});
