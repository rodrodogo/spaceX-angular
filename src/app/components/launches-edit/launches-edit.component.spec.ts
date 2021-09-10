import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchesEditComponent } from './launches-edit.component';

describe('LaunchesEditComponent', () => {
  let component: LaunchesEditComponent;
  let fixture: ComponentFixture<LaunchesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
