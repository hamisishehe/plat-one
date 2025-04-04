import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomnavigationComponent } from './bottomnavigation.component';

describe('BottomnavigationComponent', () => {
  let component: BottomnavigationComponent;
  let fixture: ComponentFixture<BottomnavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomnavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
