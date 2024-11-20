import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationrequestComponent } from './operationrequest.component';

import { OperationRequestService } from '../../services/operationRequest.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { OperationRequest } from '../../model/operationRequest.model';
import { of } from 'rxjs';

import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';


describe('OperationrequestComponent', () => {
  let component: OperationrequestComponent;
  let fixture: ComponentFixture<OperationrequestComponent>;
  let service: OperationRequestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationrequestComponent],
      providers: [
        OperationRequestService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationrequestComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(OperationRequestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open create modal', () => {
    component.openCreateModal();

    expect(component.showCreate).toBeTrue();
  });
});
