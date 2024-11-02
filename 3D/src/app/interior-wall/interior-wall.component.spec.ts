import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteriorWallComponent } from './interior-wall.component';

describe('InteriorWallComponent', () => {
  let component: InteriorWallComponent;
  let fixture: ComponentFixture<InteriorWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteriorWallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteriorWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
