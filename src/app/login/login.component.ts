import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
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
  newPassword: string="";
  confirmPassword: string="";
  companyCode: string="";
  passWord: string="";
  userData: any;
  adminData: any;
  Response: any;
  Response2: any;
  loginAPI;
  changepasswordAPI;
  errormessage="";
  Validationerrorcode: string = "";
  Validationerrorpwd: string = "";
  Validationerrornew: string = " ";

  constructor(private router: Router, private http: HttpClient) {
    this.loginAPI = environment.loginUrl;
    this.changepasswordAPI=environment.ChangePasswordUrl;
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
    if (e == 3) {
      this.Validationerrornew = " ";
    
    }
    if (e == 4) {
      this.Validationerrornew = " ";
    }

  }
  openabout() {
    this.router.navigate(["aboutus"]);
  }
  onblurfn(g: any) {
    if (g == 1 &&   this.companyCode == "") {
      this.Validationerrorcode = "*";
    }
    if (g == 2 && this.passWord == "") {
      this.Validationerrorpwd = "*";
    }
    if (g == 3 &&   this.newPassword == "") {
      this.Validationerrornew = " ";
    }
    if (g == 4 && this.confirmPassword == "") {
      this.Validationerrornew = " ";
    }
  
  }
  goTo() {

    if (this.companyCode != "" && this.passWord != "") {
 
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
              if(this.Response.isPasswordExpired==true){
                document.getElementById("confirmsignup").style.display = "block";
                             } else
             if (this.Response.data[0].isAdmin == false) {
              sessionStorage.setItem('user', JSON.stringify(this.Response.data[0]));
              sessionStorage.setItem('token', JSON.stringify(this.Response.token));
              this.router.navigate(["subscribemeals"]);
                } else {
              sessionStorage.setItem('user', JSON.stringify(this.Response.data[0]));
              sessionStorage.setItem('token', JSON.stringify(this.Response.token));
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
  validatezip() {
    var regexzip = /^\d{6}$/;// password validation
    if (this.newPassword == "") {
      this.Validationerrornew = "password should not be empty";
        }
       if(this.confirmPassword == ""){
        this.Validationerrornew = "password should not be empty";
        }
     
    else if (!regexzip.test(this.newPassword) || !regexzip.test(this.confirmPassword) ) {
      this.Validationerrornew = "Password should contain only Numbers of 6 digits";

    }
    else if(this.confirmPassword != this.newPassword){
      this.Validationerrornew = "Confirm password not matched";
    }
    else {
   this.Changepassword();
    }
  }
  Changepassword(){
      let body = {
        "companyCode": this.companyCode,
        "oldPassword":this.passWord,
        "newPassword": this.newPassword,
        "confirmPassword": this.confirmPassword
          };
    this.http.put(this.changepasswordAPI, body, this.httpOptions)
    .pipe(catchError(err => {
      const error = err.error.errorMessage;
      this.Validationerrornew=error;
      return throwError(error);

    }))
         .subscribe((Response) => {
        this.Response2 = Response;
                if (this.Response2.isSuccess == true) {
            document.getElementById("confirmsignup").style.display = "none";
            document.getElementById("toster").style.display = "block";
            setTimeout(this.Closetoast, 10000);
            if (this.Response.data[0].isAdmin == false) {
            sessionStorage.setItem('user', JSON.stringify(this.Response.data[0]));
            sessionStorage.setItem('token', JSON.stringify(this.Response.token));
            this.router.navigate(["subscribemeals"]);
          } else {
            sessionStorage.setItem('user', JSON.stringify(this.Response.data[0]));
            sessionStorage.setItem('token', JSON.stringify(this.Response.token));
            this.router.navigate(["admin"]);
          }
        }

      });
  }
  Closepassword(){
    document.getElementById("confirmsignup").style.display = "none";
    // if (this.Response.data[0].isAdmin == false) {
    //   sessionStorage.setItem('user', JSON.stringify(this.Response.data[0]));
    //   sessionStorage.setItem('token', JSON.stringify(this.Response.token));
    //   this.router.navigate(["subscribemeals"]);
    //     } else {
    //   sessionStorage.setItem('user', JSON.stringify(this.Response.data[0]));
    //   sessionStorage.setItem('token', JSON.stringify(this.Response.token));
    //   this.router.navigate(["admin"]);
    // }
  }
  Closetoast(){
    document.getElementById("toster").style.display = "none";
  }
  signup(){
    this.router.navigate(["usersignup"]);
  }
}
