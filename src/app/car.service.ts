import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  endpoint = '/api/v1/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getCars(): Observable<any> {
    return this.http.get(this.endpoint + 'cars').pipe(map(this.extractData));
  }

  getMakes(): Observable<any> {
    return this.http.get(this.endpoint + 'makes').pipe(map(this.extractData));
  }

  getYears(): Observable<any> {
    return this.http.get(this.endpoint + 'years').pipe(map(this.extractData));
  }

  getStates(): Observable<any> {
    return this.http.get(this.endpoint + 'states').pipe(map(this.extractData));
  }

  getCar(id): Observable<any> {
    return this.http
      .get(this.endpoint + 'cars/' + id)
      .pipe(map(this.extractData));
  }
}
