import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStakesWithdrawComponent } from './admin-stakes-withdraw.component';

describe('AdminStakesWithdrawComponent', () => {
  let component: AdminStakesWithdrawComponent;
  let fixture: ComponentFixture<AdminStakesWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStakesWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStakesWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
