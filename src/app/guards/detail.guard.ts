import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from '../services/store-service.service';

@Injectable({
  providedIn: 'root',
})
export class DetailGuard implements CanActivate {
  constructor(private storeService: StoreService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const flightNumber = Number(route.paramMap.get('flight_number'));

    return this.storeService.selectLaunch(flightNumber).pipe(
      map((item) => {
        if (item.flight_number) {
          return true;
        } else {
          return this.router.parseUrl('');
        }
      })
    );
  }
}
