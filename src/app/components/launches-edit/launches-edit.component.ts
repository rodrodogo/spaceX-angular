import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Launch } from 'src/app/models/launch.model';
import { EditLaunchAction } from 'src/app/store/launches.actions';
import { selectLaunches } from 'src/app/store/launches.selectors';

@Component({
  selector: 'app-launches-edit',
  templateUrl: './launches-edit.component.html',
  styleUrls: ['./launches-edit.component.scss'],
})
export class LaunchesEditComponent implements OnInit, OnDestroy {
  @Input() flightNumber = 0;

  public formLaunchEdit!: FormGroup;
  public launches: Observable<Launch | undefined> | undefined;
  public launchesSubs: Subscription | undefined;
  public launch: Launch = {};

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createForm();
    this.filterLaunches();
    this.getLaunch();
  }

  ngOnDestroy(): void {
    if (this.launchesSubs) {
      this.launchesSubs.unsubscribe();
    }
  }

  public updateLaunch(): void {
    const newLaunch = this.generateNewLaunch();
    this.store.dispatch(EditLaunchAction({ newLaunch }));
  }

  public generateNewLaunch(): Launch {
    const control = this.formLaunchEdit.controls;
    const newYear = moment(control.launch_date_utc.value).format('YYYY');

    const newLaunch: Launch = {
      ...this.launch,
      ...this.formLaunchEdit.value,
      rocket: {
        ...this.launch.rocket,
        rocket_name: control.rocket_name.value,
        rocket_type: control.rocket_type.value,
      },
      launch_year: newYear,
    };
    return newLaunch;
  }

  private createForm(): void {
    this.formLaunchEdit = this.formBuilder.group({
      mission_name: [, [Validators.required]],
      launch_success: [, [Validators.required]],
      details: [, [Validators.required]],
      rocket_name: [, [Validators.required]],
      launch_date_utc: [, [Validators.required]],
      rocket_type: [, [Validators.required]],
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
    this.launchesSubs = this.launches?.subscribe(
      (elemnt: Launch | undefined) => {
        if (elemnt) {
          this.loadLaunchForm(elemnt);
        }
      }
    );
  }

  public loadLaunchForm(elemnt: Launch): void {
    this.launch = elemnt;
    const control = this.formLaunchEdit.controls;
    control.mission_name.setValue(elemnt.mission_name);
    control.launch_success.setValue(elemnt.launch_success);
    control.details.setValue(elemnt.details);
    control.rocket_name.setValue(elemnt.rocket?.rocket_name);
    control.rocket_type.setValue(elemnt.rocket?.rocket_type);

    if (elemnt.launch_date_utc) {
      const newYear = moment(elemnt.launch_date_utc).format('YYYY-MM-DD');
      control.launch_date_utc.setValue(newYear);
    }
  }
}
