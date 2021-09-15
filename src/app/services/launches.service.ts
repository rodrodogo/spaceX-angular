import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Launch } from '../models/launch.model';

@Injectable({
  providedIn: 'root'
})
export class LaunchesService {

  private URL_API = environment.api_spacex;
  private LAUNCEHS = 'launches';

  constructor(private http:  HttpClient) {}


  public getLaunches(): Observable<Launch[]> {
    const URL = `${this.URL_API}${this.LAUNCEHS}`;
    return this.http.get<Launch[]>(URL);
  }


}
