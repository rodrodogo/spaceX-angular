import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Launch } from 'src/app/models/launch.model';
import { LaunchesService } from 'src/app/services/launches.service';
import { AddLaunchAction } from 'src/app/store/launches.actions';
import { selectLaunches } from 'src/app/store/launches.selectors';

@Component({
  selector: 'app-launches-list',
  templateUrl: './launches-list.component.html',
  styleUrls: ['./launches-list.component.scss'],
})
export class LaunchesListComponent implements OnInit {
  public listLaunch: Observable<Launch[]>;
  public launchesSubs: Subscription | undefined;
  public imageNotFoundSrc =
    'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';

  constructor(
    private launchesService: LaunchesService,
    private store: Store
  ) {
    this.listLaunch = this.store.pipe(select(selectLaunches));
  }

  ngOnInit(): void {
    this.listLaunch.subscribe((launches: Launch[]) => {
      if (!launches || launches.length === 0) {
        this.storeLaunches();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.launchesSubs) {
      this.launchesSubs.unsubscribe();
    }
  }

  storeLaunches(): void {
    this.launchesSubs = this.launchesService.getLaunches().subscribe({
      next: (data: Launch[]) => {
        data.forEach((launch: Launch) => this.add(launch));
      },
      error: (error) => console.log(error),
    });
  }

  public add(launch: Launch): void {
    this.store.dispatch(AddLaunchAction({ launch }));
  }
}
