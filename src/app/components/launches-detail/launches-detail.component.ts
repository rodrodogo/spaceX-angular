import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Launch } from 'src/app/models/launch.model';
import { selectLaunches } from 'src/app/store/launches.selectors';

@Component({
  selector: 'app-launches-detail',
  templateUrl: './launches-detail.component.html',
  styleUrls: ['./launches-detail.component.scss'],
})
export class LaunchesDetailComponent implements OnInit {
  public flightNumber = 0;
  public launches: Observable<Launch | undefined> | undefined;
  public launch: Launch = {};
  public videoUrl = '';
  public readonly YOUTUBE_PATH = 'https://www.youtube.com/embed/';
  public imageNotFoundSrc =
    'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    this.flightNumber = Number(
      this.activatedRoute.snapshot.paramMap.get('flight_number')
    );
    this.filterLaunches();
    this.getLaunch();
  }

  ngOnInit(): void {}

  filterLaunches(): void {
    // this.launches = this.store
    //   .select('launches')
    //   .pipe(
    //     map((launches: Launch[]) =>
    //       launches.find(
    //         (element) => element.flight_number === this.flightNumber
    //       )
    //     )
    //   );
    this.launches = this.store.pipe(
      select(selectLaunches),
      map((launches: Launch[]) =>
        launches.find((element) => element.flight_number === this.flightNumber)
      )
    );
  }

  getLaunch(): void {
    this.launches?.subscribe((elemnt: Launch | undefined) => {
      if (elemnt) {
        this.launch = elemnt;
        if (this.launch.links && this.launch.links.youtube_id) {
          this.videoUrl = this.YOUTUBE_PATH.concat(
            this.launch.links.youtube_id
          );
        }
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
