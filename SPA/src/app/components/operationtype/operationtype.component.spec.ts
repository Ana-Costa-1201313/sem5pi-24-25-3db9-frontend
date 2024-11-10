import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationtypeComponent } from './operationtype.component';
import { OperationTypeService } from '../../services/operationType.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { OperationType } from '../../model/operationType/operationType.model';
import { of } from 'rxjs';


describe('OperationtypeComponent', () => {
  let component: OperationtypeComponent;
  let fixture: ComponentFixture<OperationtypeComponent>;
  let service: OperationTypeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationtypeComponent],
      providers: [
        OperationTypeService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationtypeComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(OperationTypeService);
    fixture.detectChanges();
  });

  it('should open details', () => {

    const opType: OperationType = {
      id: 'id',
      name: 'name',
      anesthesiaPatientPreparationInMinutes: 10,
      surgeryInMinutes: 10,
      cleaningInMinutes: 20,
      requiredStaff: [],
      active: true,
    };

    component.openDetailsModal(opType);

    expect(component.currentOpType).toEqual(opType);
    expect(component.showDetails).toBe(true);
  });

  it('should populate operationTypeList and filteredOperationTypeList in ngOnInit', () => {
    const mockData: OperationType[] = [
      {
        id: '1',
        name: 'Surgery A',
        anesthesiaPatientPreparationInMinutes: 30,
        surgeryInMinutes: 60,
        cleaningInMinutes: 15,
        requiredStaff: [{ specialization: 'Nurse', total: 2 }],
        active: true,
      }
    ];

    spyOn(service, 'getOperationTypeList').and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.operationTypeList).toEqual([
      {
        ...mockData[0],
        specialization: 'Nurse',
      }
    ]);

    expect(component.filteredOperationTypeList).toEqual(component.operationTypeList);
  });


  it('should open deactivation confirmation', () => {
    const opType: OperationType = {
      id: 'id',
      name: 'name',
      anesthesiaPatientPreparationInMinutes: 10,
      surgeryInMinutes: 10,
      cleaningInMinutes: 20,
      requiredStaff: [],
      active: true,
    };

    component.openDeactivateModal(opType);

    expect(component.currentOpType).toEqual(opType);
    expect(component.deactivate).toBeTrue();
  });

  it('should deactivate operation type and update operationTypeList', () => {
    const opType = { id: '1', name: 'Test Operation' } as any;
    component.currentOpType = opType;

    spyOn(service, 'deactivateOperationType').and.returnValue(of({} as any));

    const mockOperationTypeList: OperationType[] = [
      {
        id: '1',
        name: 'Updated Operation',
        anesthesiaPatientPreparationInMinutes: 10,
        surgeryInMinutes: 20,
        cleaningInMinutes: 30,
        requiredStaff: [{ specialization: 'Surgeon', total: 1 }],
        active: false,
      },
    ];

    spyOn(service, 'getOperationTypeList').and.returnValue(of(mockOperationTypeList));

    component.deactivateOperationType();

    expect(component.deactivate).toBeFalse();

    const expectedMessage = [
      {
        severity: 'info',
        summary: 'Success!',
        detail: 'The Operation Type "Test Operation" was deactivated with success',
      },
    ];
    expect(component.message).toEqual(expectedMessage);

    expect(component.operationTypeList).toEqual([
      {
        ...mockOperationTypeList[0],
        specialization: 'Surgeon',
      },
    ]);
    expect(component.filteredOperationTypeList).toEqual(component.operationTypeList);

    expect(service.deactivateOperationType).toHaveBeenCalledWith(opType.id);
    expect(service.getOperationTypeList).toHaveBeenCalledTimes(1);
  });

  it('should not deactivate operation type', () => {
    spyOn(service, 'deactivateOperationType').and.returnValue(of({} as any));

    component.deactivateOperationType();

    expect(service.deactivateOperationType).toHaveBeenCalledTimes(0);
  })

});
