import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationComponent } from './specialization.component';
import { SpecializationService } from '../../services/specialization.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SpecializationComponent', () => {
  let component: SpecializationComponent;
  let fixture: ComponentFixture<SpecializationComponent>;
  let service: SpecializationService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationComponent],
      providers:[
        SpecializationService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializationComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(SpecializationService);
    fixture.detectChanges();
  });

  it('should open create modal', () => {
    component.openCreateModal();

    expect(component.showCreate).toBeTrue();
  });

});
