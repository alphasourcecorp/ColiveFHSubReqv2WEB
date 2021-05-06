
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { SubscriberInfo } from '../models/subscriber-info';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MenuResponse } from '../models/menu-response';
import { stringify } from '@angular/compiler/src/util';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})
export class UsersignupComponent implements OnInit {
  public addnewcompanyUrl;
  public loginAPI;
  public subscriberInfo;
  Response: any;
  date;
  timeStamp;
  company="false";
  errormessage="";
  public totalAmount: number = 0;
  public emptyfield:boolean=false;
  public phonefield:boolean=false;
  public emailfield:boolean=false;
  public zipcodefield:boolean=false;
  public passwordfield:boolean=false;
  public confirmpasswordfield:boolean=false;
  public Validationerror: any;
  constructor(private router: Router,private httpClient: HttpClient) { 
    this.addnewcompanyUrl=environment.AddnewCompanyUrl;
    this.loginAPI =environment.loginUrl;
    this.subscriberInfo = {
      companyName: "Colive",
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      Password:"",
      ConfirmPassword:"",
      zipCode: "",
      country: "India",
      emailAddress: "",
      phoneNumber: ""
    };

    this.Validationerror = {
      companyName: "",
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      Password:"",
      ConfirmPassword:"",
      zipCode: "",
      country: "",
      emailAddress: "",
      phoneNumber: ""
    };
    this.date = new Date();
    this.timeStamp =stringify(this.date.getDate())+stringify(this.date.getMonth())+stringify(this.date.getFullYear())
    +stringify(this.date.getHours())+stringify(this.date.getMinutes())+stringify(this.date.getSeconds())
  }

  ngOnInit(): void {
    document.getElementById("confirmsignup").style.display = "none";
   }
// change(){
//   if(this.company=="true"){
//     this.subscriberInfo.companyName="";
//   }
//   if(this.company=="false") {
//     this.subscriberInfo.companyName="individual"+this.timeStamp;
//   }
// }
  onfocusfn(e: any) {
    if (e == 1) {
      this.Validationerror.companyName = "";
      this.errormessage="";
    }
    if (e == 2) {
      this.Validationerror.fullName = "";
      this.errormessage="";
    }
    if (e == 3) {
      this.Validationerror.addressLine1 = "";
      this.errormessage="";
    }
    if (e == 4) {
      this.Validationerror.addressLine2 = "";
      this.errormessage="";
    }
    if (e == 5) {
      this.Validationerror.city = "";
      this.errormessage="";
    }
    if (e == 6) {
      this.Validationerror.state = "";
      this.errormessage="";
    }
    if (e == 7) {
      this.Validationerror.zipCode = "";
      this.errormessage="";
    }
    if (e == 8) {
      this.Validationerror.country = "";
      this.errormessage="";
    }
    if (e == 9) {
      this.Validationerror.emailAddress = "";
      this.errormessage="";
    }
    if (e == 10) {
      this.Validationerror.phoneNumber = "";
      this.errormessage="";
    }
    if (e == 11) {
      this.Validationerror.Password = "";
      this.errormessage="";
    }
    if (e == 12) {
      this.Validationerror.ConfirmPassword = "";
      this.errormessage="";
    }
  }

  onblurfn(g: any) {
    if (g == 1 && this.subscriberInfo.companyName == "") {
      this.Validationerror.companyName = "*";
    }
    if (g == 2 && this.subscriberInfo.fullName == "") {
      this.Validationerror.fullName = "*";
    }
    if (g == 3 && this.subscriberInfo.addressLine1 == "") {
      this.Validationerror.addressLine1 = "*";
    }
    if (g == 4 && this.subscriberInfo.addressLine2 == "") {
      this.Validationerror.addressLine2 = "*";
    }
    if (g == 5 && this.subscriberInfo.city == "") {
      this.Validationerror.city = "*";
    }
    if (g == 6 && this.subscriberInfo.state == "") {
      this.Validationerror.state = "*";
    }
    if (g == 7 && this.subscriberInfo.zipCode == "") {
      this.Validationerror.zipCode = "*";
    }
    if (g == 8 && this.subscriberInfo.country == "") {
      this.Validationerror.country = "*";
    }
    if (g == 9 && this.subscriberInfo.emailAddress == "") {
      this.Validationerror.emailAddress = "*";
    }
    if (g == 10 && this.subscriberInfo.phoneNumber == "") {
      this.Validationerror.phoneNumber = "*";
    }
    if (g == 11 && this.subscriberInfo.Password == "") {
      this.Validationerror.Password = "*";
    }
    if (g == 12 && this.subscriberInfo.ConfirmPassword == "") {
      this.Validationerror.ConfirmPassword = "*";
    }
  }
 
  
  testforvalidation() { //empty field validation
    // if(this.company=="false") {
    //   this.subscriberInfo.companyName="individual"+this.timeStamp;
    // }
     for (var property in this.subscriberInfo) {
      if (this.subscriberInfo[property] == "") {
        this.Validationerror[property] = "*";
      } else {this.Validationerror[property] = "";
    }
    }
  
    if(this.subscriberInfo.fullName == "" ||this.subscriberInfo.companyName == "" ||
    this.subscriberInfo.emailAddress == "" ||this.subscriberInfo.phoneNumber == "" ||
    this.subscriberInfo.addressLine1 == "" ||this.subscriberInfo.addressLine2 == "" ||
    this.subscriberInfo.state == "" ||this.subscriberInfo.city == "" ||
    this.subscriberInfo.country == "" ||this.subscriberInfo.zipCode == ""
     ){
      this.emptyfield=false;
      }
    else{
      this.emptyfield=true;
    }
  }
  validatezip() {
    var regexzip = /^\d{6}$/;// phone validation
    if (this.subscriberInfo.zipCode == "") {
      this.Validationerror.zipCode = "*";
      this.zipcodefield=false;
    }
    else if (!regexzip.test(this.subscriberInfo.zipCode)) {
      this.Validationerror.zipCode = "*";
      this.zipcodefield=false;
    }
    else {
      this.zipcodefield=true; this.Validationerror.zipCode = "";
    }
  }
  validatepassword() {
    var regexzip = /^\d{6}$/;// password validation
    if (this.subscriberInfo.Password == "") {
      this.Validationerror.Password = "*";
      this.passwordfield=false;
    }
else  if (!regexzip.test(this.subscriberInfo.Password)) {
      this.Validationerror.Password = "*";
      this.passwordfield=false;
    }
     else {
      this.passwordfield=true;  this.Validationerror.Password = "";
      this.Validationerror.ConfirmPassword = "";
    }
  }
  validateconfirmpassword() {
    var regexzip = /^\d{6}$/;// password validation
    if (this.subscriberInfo.ConfirmPassword == "") {
      this.Validationerror.ConfirmPassword = "*";
      this.confirmpasswordfield=false;
    }
else  if (!regexzip.test(this.subscriberInfo.ConfirmPassword)) {
      this.Validationerror.ConfirmPassword = "*";
      this.passwordfield=false;
    }else if(this.subscriberInfo.ConfirmPassword!=this.subscriberInfo.Password){
      this.Validationerror.ConfirmPassword = "*";
      this.passwordfield=false;
    }
     else {
      this.confirmpasswordfield=true;  this.Validationerror.ConfirmPassword = "";
     
    }
  }
  validateemail() {
    var regexemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (this.subscriberInfo.emailAddress == "") {
      this.Validationerror.emailAddress = "*";
      this.emailfield=false;
    }
    else if (!regexemail.test(this.subscriberInfo.emailAddress)) {
      this.Validationerror.emailAddress = "*";
      this.emailfield=false;
      }
    else {
      this.emailfield=true; this.Validationerror.emailAddress = "";
    }
  }

  validatephone() {
    var regexphone = /^\d{10}$/;// phone validation
    if (this.subscriberInfo.phoneNumber == "") {
      this.Validationerror.phoneNumber = "*";
      this.phonefield=false;
    }
    else if (!regexphone.test(this.subscriberInfo.phoneNumber)) {
      this.Validationerror.phoneNumber = "*";
      this.phonefield=false;
    }
    else {
      this.phonefield=true; this.Validationerror.phoneNumber = "";
    }
  }
  signUp(){
    this.testforvalidation();
    this.validatephone();
    this.validatezip();
    this.validateemail();
    this.validatepassword();
    this.validateconfirmpassword();
    if(this.emptyfield &&this.zipcodefield&&this.emailfield&&this.phonefield&&this.passwordfield&&this.confirmpasswordfield){
    let body=  {
        "companyName": this.subscriberInfo.phoneNumber,
        "subscriberName": this.subscriberInfo.fullName,
        "emailId": this.subscriberInfo.emailAddress,
        "phoneNumber": this.subscriberInfo.phoneNumber,
        "password":this.subscriberInfo.Password,
        "cAddress": {
          "addressLine1": this.subscriberInfo.addressLine1,
          "addressLine2": this.subscriberInfo.addressLine2,
          "city": this.subscriberInfo.city,
          "state": this.subscriberInfo.state,
          "country": this.subscriberInfo.country,
          "postalCode": this.subscriberInfo.zipCode
        },
        "isAdmin": false,
        }
       
    
  
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }; 
           this
          .httpClient
          .post<MenuResponse>(this.addnewcompanyUrl,body, httpOptions)
          .pipe(catchError(err => {
            const error = err.error.errorMessage;
           this.errormessage =error;
            return throwError(error);
      
          }))
          .subscribe(res=>{
              if(res.isSuccess){
               this.goTo();
              }
          });

      }
    }
  gotoadmin(){
    this.router.navigate(["admin"]);
  }
  addnew(){
    this.ngOnInit();
  }
  logout() {
    this.router.navigate(["login"]);
    sessionStorage.clear();
  }
  goTo() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }; 
 
      let body = {
        "companyCode": this.subscriberInfo.phoneNumber,
        "password": this.subscriberInfo.Password
      };
      this.httpClient.post(this.loginAPI, body, httpOptions)
          .subscribe((Response) => {
          this.Response = Response;
                        if (this.Response.isSuccess == true) {
                          document.getElementById("tostersignup").style.display = "block";
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
  Closetoast(){
    document.getElementById("tostersignup").style.display = "none";
  }
}