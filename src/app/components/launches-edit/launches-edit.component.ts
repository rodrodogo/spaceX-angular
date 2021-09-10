import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Launch } from 'src/app/models/launch.model';
import { EditLaunchAction } from 'src/app/store/launches.actions';
import { selectLaunches } from 'src/app/store/launches.selectors';

@Component({
  selector: 'app-launches-edit',
  templateUrl: './launches-edit.component.html',
  styleUrls: ['./launches-edit.component.scss'],
})
export class LaunchesEditComponent implements OnInit {
  @Input() flightNumber = 0;

  public formLaunchEdit!: FormGroup;
  public launches: Observable<Launch | undefined> | undefined;
  public launch: Launch = {};

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createForm();
    this.filterLaunches();
    this.getLaunch();
  }

  public updateLaunch(): void {
    const control = this.formLaunchEdit.controls;
    const stringDate = control.launchDateUtc.value;
    const arrayDate = stringDate.split('-');
    const newDate = new Date(Number(arrayDate[0]), Number(arrayDate[1]) - 1, Number(arrayDate[2]));
    const newLaunch: Launch = {
      ...this.launch,
      mission_name: control.missionName.value,
      launch_success: control.launchSuccess.value,
      details: control.details.value,
      rocket: {
        ...this.launch.rocket,
        rocket_name: control.rocketName.value,
        rocket_type: control.rocketType.value,
      },
      launch_date_utc: newDate.toISOString(),
      launch_year: newDate.getFullYear()
    };
    this.store.dispatch(EditLaunchAction({ newLaunch }));
  }

  private createForm(): void {
    this.formLaunchEdit = this.formBuilder.group({
      missionName: [, [Validators.required]],
      launchSuccess: [, [Validators.required]],
      details: [, [Validators.required]],
      rocketName: [, [Validators.required]],
      launchDateUtc: [, [Validators.required]],
      rocketType: [, [Validators.required]],
    });
  }

  private filterLaunches(): void {
    this.launches = this.store.pipe(
      select(selectLaunches),
      map((launches: Launch[]) =>
        launches.find((element) => element.flight_number === this.flightNumber)
      )
    );
  }

  private getLaunch(): void {
    this.launches?.subscribe((elemnt: Launch | undefined) => {
      const control = this.formLaunchEdit.controls;
      if (elemnt) {
        this.launch = elemnt;
        control.missionName.setValue(elemnt.mission_name);
        control.launchSuccess.setValue(elemnt.launch_success);
        control.details.setValue(elemnt.details);
        control.rocketName.setValue(elemnt.rocket?.rocket_name);
        control.rocketType.setValue(elemnt.rocket?.rocket_type);
        if (elemnt.launch_date_utc) {
          const launchDate = new Date(elemnt.launch_date_utc);
          const month = launchDate.getMonth() + 1;
          const dateString =
            launchDate.getFullYear().toString() +
            '-' +
            month.toString().padStart(2, '0') +
            '-' +
            launchDate.getUTCDate().toString().padStart(2, '0');
          control.launchDateUtc.setValue(dateString);
        }
      }
    });
  }
}
