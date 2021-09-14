import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { Launch } from 'src/app/models/launch.model';

import { LaunchesEditComponent } from './launches-edit.component';

describe('LaunchesEditComponent', () => {
  let component: LaunchesEditComponent;
  let fixture: ComponentFixture<LaunchesEditComponent>;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaunchesEditComponent],
      providers: [FormBuilder, provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new Launch with the info of the form', () => {
    const control = component.formLaunchEdit.controls;
    control.mission_name.setValue('mision edit');
    control.launch_success.setValue(false);
    control.details.setValue('details');
    control.rocket_name.setValue('rocket launch');
    control.rocket_type.setValue('C');
    control.launch_date_utc.setValue('2012-11-10');
    const newLaunch = component.generateNewLaunch();

    expect(newLaunch.mission_name).toEqual('mision edit');
    expect(newLaunch.launch_success).toEqual(false);
    expect(newLaunch.details).toEqual('details');
    expect(newLaunch.rocket?.rocket_name).toEqual('rocket launch');
    expect(newLaunch.rocket?.rocket_type).toEqual('C');
    expect(newLaunch.launch_date_utc).toEqual('2012-11-10');
  });

  it('should load the launch in the form', () => {
    const launch: Launch = {
      mission_name: 'mision new',
      launch_success: false,
      details: 'details new',
      rocket: {
        rocket_name: 'rocket launch',
        rocket_type: 'C',
      },
      launch_date_utc: '2012-11-10',
    };

    component.loadLaunchForm(launch);
    expect(component.formLaunchEdit.controls.mission_name.value).toEqual(launch.mission_name);
    expect(component.formLaunchEdit.controls.launch_success.value).toEqual(launch.launch_success);
    expect(component.formLaunchEdit.controls.details.value).toEqual(launch.details);
    expect(component.formLaunchEdit.controls.rocket_name.value).toEqual(launch.rocket?.rocket_name);
    expect(component.formLaunchEdit.controls.rocket_type.value).toEqual(launch.rocket?.rocket_type);
    expect(component.formLaunchEdit.controls.launch_date_utc.value).toEqual(launch.launch_date_utc);
    
  });
});
