import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SubscriberInfo } from '../models/subscriber-info';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MenuResponse } from '../models/menu-response';
import { retry } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public addnewcompanyUrl;
  public subscriberInfo: SubscriberInfo;
  public totalAmount: number = 0;
  public emptyfield:boolean=false;
  public phonefield:boolean=false;
  public emailfield:boolean=false;
  public zipcodefield:boolean=false;
  public Validationerror: any;
  constructor(private router: Router,private httpClient: HttpClient) { 
    this.addnewcompanyUrl=environment.AddnewCompanyUrl;
    this.subscriberInfo = {
      companyName: "",
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
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
      zipCode: "",
      country: "",
      emailAddress: "",
      phoneNumber: ""
    };
  }

  ngOnInit(): void {
    document.getElementById("confirmsignup").style.display = "none";
  }
  onfocusfn(e: any) {
    if (e == 1) {
      this.Validationerror.companyName = "";
    }
    if (e == 2) {
      this.Validationerror.fullName = "";
    }
    if (e == 3) {
      this.Validationerror.addressLine1 = "";
    }
    if (e == 4) {
      this.Validationerror.addressLine2 = "";
    }
    if (e == 5) {
      this.Validationerror.city = "";
    }
    if (e == 6) {
      this.Validationerror.state = "";
    }
    if (e == 7) {
      this.Validationerror.zipCode = "";
    }
    if (e == 8) {
      this.Validationerror.country = "";
    }
    if (e == 9) {
      this.Validationerror.emailAddress = "";
    }
    if (e == 10) {
      this.Validationerror.phoneNumber = "";
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
  }
 
  
  testforvalidation() { //empty field validation
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
    if(this.emptyfield &&this.zipcodefield&&this.emailfield&&this.phonefield){
    let body=  {
        "companyName": this.subscriberInfo.companyName,
        "subscriberName": this.subscriberInfo.fullName,
        "emailId": this.subscriberInfo.emailAddress,
        "phoneNumber": this.subscriberInfo.phoneNumber,
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
       
        let token =JSON.parse(sessionStorage.getItem('token'));

        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':"Bearer"+" "+token,
          })
        }; 
           this
          .httpClient
          .post<MenuResponse>(this.addnewcompanyUrl,body, httpOptions)
          .subscribe(res=>{
              if(res.isSuccess){
              document.getElementById("confirmsignup").style.display = "block";
              // this.router.navigate(["admin"]);
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
}