import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SubscriptionRequest } from '../models/subscription-request';
import { SubscriptionRequestResponse } from '../models/subscription-request-response';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionRequestsService {
  private subscriptionRequestServiceUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
    this.subscriptionRequestServiceUrl = environment.subscriptionRequestServiceUrl;
  }

  submitSubscriptionRequest(subscriptionRequest: SubscriptionRequest): Observable<SubscriptionRequestResponse> {
    const response =
      this
        .httpClient
        .post<SubscriptionRequestResponse>(this.subscriptionRequestServiceUrl, subscriptionRequest, this.httpOptions)
        .pipe(
          retry(3),
          catchError(this.handleHttpError));

    return response;
  }

  private handleHttpError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("A client side error occurs. The error message is " + error.message);
    } else {
      console.error(
        "An error happened in server. The HTTP status code is " + error.status + " and the error returned is " + error.message);
    }

    return throwError("Error occurred. Pleas try again");
  }
}
