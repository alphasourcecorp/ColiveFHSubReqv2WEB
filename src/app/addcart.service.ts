import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, Output } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MenuResponse } from './models/menu-response';



@Injectable({
  providedIn: 'root'
})
export class AddcartService {

  public ScheduleListUrl;
  public DeleteSchedulelist;
  public subscriptionRequest;
  public schedulecreate;
  public requestList;
  public scheduleEdit;
  public  requestEdit;
  public  requestDelete;
  public UpdaterequestStatus;
  public getCompanydetails;

  User;

 

  constructor(private httpClient: HttpClient) {
    this.ScheduleListUrl = environment.ScheduleListUrl;
    this.DeleteSchedulelist= environment.DeleteScheduleUrl;
    this.subscriptionRequest= environment.subscriptionRequestServiceUrl;
    this.schedulecreate=environment.addScheduleUrl;
    this.scheduleEdit=environment.EditScheduleUrl;
    this.requestList=environment.RequestAdminListUrl;
   this.requestEdit=environment.updaterequestlistUrl;
   this.requestDelete=environment.DeleterequestlistUrl;
   this.UpdaterequestStatus=environment.UpdateRequestStatusUrl;
   this.getCompanydetails=environment.GetallCompanyUrl;
    this.User=JSON.parse(sessionStorage.getItem('user'));

   }
   getScheduleData() {
    let token =JSON.parse(sessionStorage.getItem('token'));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':"Bearer"+" "+token,
      })
    };
    return this
      .httpClient
      .get<MenuResponse>(this.ScheduleListUrl+"/"+this.User.companyId, httpOptions)
      .pipe(
        retry(1),
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

  deleteScheduleData(scheduleID){
    let token =JSON.parse(sessionStorage.getItem('token'));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':"Bearer"+" "+token,
      })
    };
    return this
      .httpClient
      .delete<MenuResponse>(this.DeleteSchedulelist+"/"+this.User.companyId+"/"+scheduleID, httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpErrorHandler));
  }
  SubscriptionRequest(request){
    let token =JSON.parse(sessionStorage.getItem('token'));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':"Bearer"+" "+token,
      })
    }; 
    return this
      .httpClient
      .post<MenuResponse>(this.subscriptionRequest,request, httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpErrorHandler));
  }
  Scheduledata(request){
    let token =JSON.parse(sessionStorage.getItem('token'));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':"Bearer"+" "+token,
      })
    };
    return this
      .httpClient
      .post<MenuResponse>(this.schedulecreate,request, httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpErrorHandler));
  }
  EditScheduledata(request){
    let token =JSON.parse(sessionStorage.getItem('token'));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':"Bearer"+" "+token,
      })
    }; 
    return this
      .httpClient
      .put<MenuResponse>(this.scheduleEdit,request, httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpErrorHandler));
  }
  Requestadmindata(){

    let token =JSON.parse(sessionStorage.getItem('token'));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':"Bearer"+" "+token,
      })
    };

    return this
      .httpClient
      .get<MenuResponse>(this.requestList+"/"+this.User.companyId, httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpErrorHandler));
  }
  EditRequestdata(request){
    let token =JSON.parse(sessionStorage.getItem('token'));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':"Bearer"+" "+token,
      })
    };
    return this
      .httpClient
      .put<MenuResponse>(this.requestEdit,request,httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpErrorHandler));
  }
  DeleteRequestdata(requestID){
    let token =JSON.parse(sessionStorage.getItem('token'));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':"Bearer"+" "+token,
      })
    }; 
    return this
      .httpClient
      .delete<MenuResponse>(this.requestDelete+"/"+this.User.companyId+"/"+requestID, httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpErrorHandler));
  }
  updateRequestStatus(requestid,status){  
    let token =JSON.parse(sessionStorage.getItem('token'));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':"Bearer"+" "+token,
      })
    };

    console.log(token);
    console.log(httpOptions);
    return this
      .httpClient
      .put<MenuResponse>(this.UpdaterequestStatus+"/"+requestid+"/"+this.User.companyId+"/"+status, httpOptions)
       
      .pipe(
        retry(1),
        catchError(this.httpErrorHandler));
  }
  Getcompanydata(){

    let token =JSON.parse(sessionStorage.getItem('token'));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':"Bearer"+" "+token,
      })
    };

    return this
      .httpClient
      .get<MenuResponse>(this.getCompanydetails, httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpErrorHandler));
  }
}
