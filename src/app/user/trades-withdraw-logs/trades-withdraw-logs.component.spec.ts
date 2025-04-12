import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesWithdrawLogsComponent } from './trades-withdraw-logs.component';

describe('TradesWithdrawLogsComponent', () => {
  let component: TradesWithdrawLogsComponent;
  let fixture: ComponentFixture<TradesWithdrawLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradesWithdrawLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradesWithdrawLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
