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

});
