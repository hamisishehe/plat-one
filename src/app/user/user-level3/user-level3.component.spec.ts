import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLevel3Component } from './user-level3.component';

describe('UserLevel3Component', () => {
  let component: UserLevel3Component;
  let fixture: ComponentFixture<UserLevel3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLevel3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLevel3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
