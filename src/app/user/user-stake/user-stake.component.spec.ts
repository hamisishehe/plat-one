import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStakeComponent } from './user-stake.component';

describe('UserStakeComponent', () => {
  let component: UserStakeComponent;
  let fixture: ComponentFixture<UserStakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStakeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
