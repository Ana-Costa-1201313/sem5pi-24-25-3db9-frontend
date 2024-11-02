import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShibaComponent } from './shiba.component';

describe('ShibaComponent', () => {
  let component: ShibaComponent;
  let fixture: ComponentFixture<ShibaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShibaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShibaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
