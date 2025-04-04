import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelfDepositsComponent } from './admin-self-deposits.component';

describe('AdminSelfDepositsComponent', () => {
  let component: AdminSelfDepositsComponent;
  let fixture: ComponentFixture<AdminSelfDepositsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSelfDepositsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSelfDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
