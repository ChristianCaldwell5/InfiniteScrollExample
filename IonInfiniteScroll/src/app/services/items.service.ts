import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private requestUrl = "http://localhost:8101/api";

  constructor(
    private http: HttpClient
  ) { }

  public getFruits(): Observable<any> {
    return this.http.get(this.requestUrl);
  }

}
