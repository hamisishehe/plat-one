import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStakesComponent } from './admin-stakes.component';

describe('AdminStakesComponent', () => {
  let component: AdminStakesComponent;
  let fixture: ComponentFixture<AdminStakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStakesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
