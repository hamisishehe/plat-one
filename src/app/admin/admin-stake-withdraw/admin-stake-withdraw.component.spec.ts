import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStakeWithdrawComponent } from './admin-stake-withdraw.component';

describe('AdminStakeWithdrawComponent', () => {
  let component: AdminStakeWithdrawComponent;
  let fixture: ComponentFixture<AdminStakeWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStakeWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStakeWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
