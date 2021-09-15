import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { get } from 'lodash';
import { Launch } from 'src/app/models/launch.model';
import { StoreService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-launches-detail',
  templateUrl: './launches-detail.component.html',
  styleUrls: ['./launches-detail.component.scss'],
})
export class LaunchesDetailComponent implements OnInit, OnDestroy {
  public flightNumber = 0;
  public launches: Observable<Launch | undefined> | undefined;
  public launchesSubs: Subscription | undefined;
  public launch: Launch = {};
  public videoUrl = '';
  public readonly YOUTUBE_PATH = 'https://www.youtube.com/embed/';
  public imageNotFoundSrc =
    'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private router: Router
  ) {
    this.flightNumber = Number(
      this.activatedRoute.snapshot.paramMap.get('flight_number')
    );
    this.filterLaunches();
    this.getLaunch();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.launchesSubs) {
      this.launchesSubs.unsubscribe();
    }
  }

  filterLaunches(): void {
    this.launches = this.storeService.selectLaunch(this.flightNumber);
  }

  getLaunch(): void {
    this.launchesSubs = this.launches?.subscribe(
      (elemnt: Launch | undefined) => {
        this.videoUrl = this.YOUTUBE_PATH + get(elemnt, 'links.youtube_id');
        if (elemnt?.flight_number) {
          this.launch = elemnt;
        }
      }
    );
  }
}
