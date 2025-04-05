import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLevel1Component } from './user-level1.component';

describe('UserLevel1Component', () => {
  let component: UserLevel1Component;
  let fixture: ComponentFixture<UserLevel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLevel1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
