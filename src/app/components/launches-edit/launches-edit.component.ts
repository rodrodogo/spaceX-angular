import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { Launch } from 'src/app/models/launch.model';
import { StoreService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-launches-edit',
  templateUrl: './launches-edit.component.html',
  styleUrls: ['./launches-edit.component.scss'],
})
export class LaunchesEditComponent implements OnInit, OnDestroy {
  @Input() flightNumber = 0;

  public formLaunchEdit!: FormGroup;
  public launches!: Observable<Launch>;
  public launchesSubs: Subscription | undefined;
  public launch: Launch = {};
  public launchLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.selectLaunch();
    this.getLaunch();
  }

  ngOnDestroy(): void {
    if (this.launchesSubs) {
      this.launchesSubs.unsubscribe();
    }
  }

  public updateLaunch(): void {
    const newLaunch = this.generateNewLaunch();
    this.storeService.editLaunch(newLaunch);
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

  private selectLaunch(): void {
    this.launches = this.storeService.selectLaunch(this.flightNumber);
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
    let newYear;
    if (elemnt.launch_date_utc) {
      newYear = moment(elemnt.launch_date_utc).format('YYYY-MM-DD');
    } else {
      newYear = moment().format('YYYY-MM-DD');
    }
    this.formLaunchEdit = this.formBuilder.group({
      mission_name: [elemnt.mission_name, [Validators.required]],
      launch_success: [elemnt.launch_success, [Validators.required]],
      details: [elemnt.details, [Validators.required]],
      rocket_name: [elemnt.rocket?.rocket_name, [Validators.required]],
      launch_date_utc: [newYear, [Validators.required]],
      rocket_type: [elemnt.rocket?.rocket_type, [Validators.required]],
    });

    this.launchLoaded = true;
  }
}
