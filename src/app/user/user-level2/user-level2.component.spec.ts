import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLevel2Component } from './user-level2.component';

describe('UserLevel2Component', () => {
  let component: UserLevel2Component;
  let fixture: ComponentFixture<UserLevel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLevel2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
