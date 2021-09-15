import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Launch } from 'src/app/models/launch.model';
import { StoreService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-launches-list',
  templateUrl: './launches-list.component.html',
  styleUrls: ['./launches-list.component.scss'],
})
export class LaunchesListComponent implements OnInit {
  public listLaunch!: Observable<Launch[]>;
  public launchesSubs: Subscription | undefined;
  public imageNotFoundSrc =
    'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.listLaunch = this.storeService.selectLaunches();
    this.listLaunch.subscribe((launches: Launch[]) => {
      if (!launches || launches.length === 0) {                
        this.storeService.loadAllLaunches();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.launchesSubs) {
      this.launchesSubs.unsubscribe();
    }
  }
}
