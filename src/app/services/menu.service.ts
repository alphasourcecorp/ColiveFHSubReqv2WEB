import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Menu } from '../models/menu';
import { MenuResponse } from '../models/menu-response';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuItemsJsonUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
    this.menuItemsJsonUrl = environment.menuItemsJsonUrl;
  }

  getMenuItems(): Observable<MenuResponse> {
    return this
      .httpClient
      .get<MenuResponse>(this.menuItemsJsonUrl, this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.httpErrorHandler));
  }

  private httpErrorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("A client side error occurs. The error message is " + error.message);
    } else {
      console.error(
        "An error happened in server. The HTTP status code is " + error.status + " and the error returned is " + error.message);
    }

    return throwError("Error occurred. Pleas try again");
  }
}
