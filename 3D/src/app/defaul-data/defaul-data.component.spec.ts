import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaulDataComponent } from './defaul-data.component';

describe('DefaulDataComponent', () => {
  let component: DefaulDataComponent;
  let fixture: ComponentFixture<DefaulDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaulDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaulDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
