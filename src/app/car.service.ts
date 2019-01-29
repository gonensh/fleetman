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

  cache = {};

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getData(type, id): Observable<any> {
    id = id || '';
    if (typeof this.cache[type + id] !== 'undefined') {
      return this.cache[type + id];
    } else {
      return this.http
        .get(this.endpoint + type + (id ? `/${id}` : ''))
        .pipe(map(this.extractData));
    }
  }

  getCars(): Observable<any> {
    return this.getData('cars', null);
  }

  getMakes(): Observable<any> {
    return this.getData('makes', null);
  }

  getYears(): Observable<any> {
    return this.getData('years', null);
  }

  getStates(): Observable<any> {
    return this.getData('states', null);
  }

  getCar(id): Observable<any> {
    return this.getData('cars', id);
  }
}
