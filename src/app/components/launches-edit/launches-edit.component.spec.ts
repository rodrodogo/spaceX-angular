import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { Launch } from 'src/app/models/launch.model';

import { LaunchesEditComponent } from './launches-edit.component';

describe('LaunchesEditComponent', () => {
  let component: LaunchesEditComponent;
  let fixture: ComponentFixture<LaunchesEditComponent>;
  const initialState = {};
  const launchOriginal: Launch = {
    mission_name: 'mision new',
    launch_success: false,
    details: 'details new',
    rocket: {
      rocket_name: 'rocket launch',
      rocket_type: 'C',
    },
    launch_date_utc: '2006-03-24T22:30:00.000Z',
  };


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

  describe('should load the launch in the form', () => {
    const launchForm: Launch = {
      mission_name: 'mision new',
      launch_success: false,
      details: 'details new',
      rocket: {
        rocket_name: 'rocket launch',
        rocket_type: 'C',
      },
      launch_date_utc: '2006-03-24',
    };
    it('should convert date to format YYYY-MM-DD', () => {

      component.loadLaunchForm(launchOriginal);

      expect(component.formLaunchEdit.value.launch_date_utc).toEqual(launchForm.launch_date_utc);

    });

    it('should fill the form with launch object', () => {
      component.loadLaunchForm(launchOriginal);
      expect(component.formLaunchEdit.value).toEqual(launchForm);
    });

    it('should mark flag launchLoaded as true', () => {
      component.loadLaunchForm(launchOriginal);
      expect(component.launchLoaded).toBeTrue();
    })
  });

  it('should create a edited launch with property launch_year of type number', () =>{
    component.loadLaunchForm(launchOriginal);
    const launchEdited: Launch = {
      mission_name: 'mision new',
      launch_success: false,
      details: 'details new',
      rocket: {
        rocket_name: 'rocket launch',
        rocket_type: 'C',
      },
      launch_date_utc: '2006-03-24',
      launch_year: 2006
    };
    const editedLaunch = component.generateNewLaunch();
    expect(editedLaunch).toEqual(launchEdited);
    
  })

});
