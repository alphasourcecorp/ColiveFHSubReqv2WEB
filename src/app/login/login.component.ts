import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  companyCode: string="";
  passWord: string="";
  userData: any;
  adminData: any;
  Response: any;
  loginAPI;
  errormessage="";
  Validationerrorcode: string = "";
  Validationerrorpwd: string = "";
  constructor(private router: Router, private http: HttpClient) {
    this.loginAPI = environment.loginUrl;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  onfocusfn(e: any) {
    if (e == 1) {
      this.Validationerrorcode = "";
      this.errormessage="";
    }
    if (e == 2) {
      this.Validationerrorpwd = "";
      this.errormessage="";
    }

  }

  onblurfn(g: any) {
    if (g == 1 &&   this.companyCode == "") {
      this.Validationerrorcode = "*";
    }
    if (g == 2 && this.passWord == "") {
      this.Validationerrorpwd = "*";
    }
  
  }
  goTo() {

    if (this.companyCode != "" && this.passWord != "") {
      const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      let body = {
        "companyCode": this.companyCode,
        "password": this.passWord
      };
      this.http.post(this.loginAPI, body, this.httpOptions)
        .pipe(catchError(err => {
          const error = err.error.message || err.statusText;
           if(error){
            this.Validationerrorcode = "*"
            this.Validationerrorpwd = "*"
            this.errormessage="Invalid Credentials"
           }
          return throwError(error);

        }))
        .subscribe((Response) => {
          this.Response = Response;
             if (this.Response.isSuccess == true) {
            sessionStorage.setItem('token', JSON.stringify(this.Response.token));
            if (this.Response.data[0].isAdmin == false) {
              sessionStorage.setItem('user', JSON.stringify(this.Response.data[0]));

              this.router.navigate(["home"]);
            } else {
              sessionStorage.setItem('user', JSON.stringify(this.Response.data[0]));
              this.router.navigate(["admin"]);
            }
          }

        });

    }else{
    this.Validationerrorcode = "*"
    this.Validationerrorpwd = "*"
    this.errormessage="Please Enter Credentials"
    }
  }
}
