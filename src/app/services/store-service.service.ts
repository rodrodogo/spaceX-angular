import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Launch } from '../models/launch.model';
import { EditLaunchAction, LOAD_LAUNCH } from '../store/launches.actions';
import { selectLauch, selectLaunches } from '../store/launches.selectors';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store) {}

  selectLaunches(): Observable<Launch[]> {
    return this.store.pipe(select(selectLaunches));
  }

  selectLaunch(flightNumber: number): Observable<Launch> {
    return this.store.select(selectLauch(flightNumber));
  }

  editLaunch(newLaunch: Launch): void {
    this.store.dispatch(EditLaunchAction({ newLaunch }));
  }

  loadAllLaunches(): void {
    this.store.dispatch({ type: LOAD_LAUNCH });
  }
}
