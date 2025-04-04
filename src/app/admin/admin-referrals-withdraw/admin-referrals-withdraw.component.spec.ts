import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReferralsWithdrawComponent } from './admin-referrals-withdraw.component';

describe('AdminReferralsWithdrawComponent', () => {
  let component: AdminReferralsWithdrawComponent;
  let fixture: ComponentFixture<AdminReferralsWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReferralsWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReferralsWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
