import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationtypeComponent } from './operationtype.component';

describe('OperationtypeComponent', () => {
  let component: OperationtypeComponent;
  let fixture: ComponentFixture<OperationtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationtypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
