import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamWithdrawLogsComponent } from './team-withdraw-logs.component';

describe('TeamWithdrawLogsComponent', () => {
  let component: TeamWithdrawLogsComponent;
  let fixture: ComponentFixture<TeamWithdrawLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamWithdrawLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamWithdrawLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
