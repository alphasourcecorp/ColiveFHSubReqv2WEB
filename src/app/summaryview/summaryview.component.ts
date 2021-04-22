import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriberInfo } from '../models/subscriber-info';
import { SubscriptionRequestSummary } from '../models/subscription-request-summary';
import { SubscriptionRequestMapService } from '../services/subscription-request-map-service';
import { SubscriptionRequestsService } from '../services/subscriptionrequests.service';
import { MenuItemSelectionInfo } from '../models/menu-item-selection-info';
import { MenuItem } from '../models/menuitem';
import { AddcartService } from '../addcart.service';
import { DatePipe, JsonPipe } from '@angular/common';
@Component({
  selector: 'app-summaryview',
  templateUrl: './summaryview.component.html',
  styleUrls: ['./summaryview.component.css']
})
export class SummaryviewComponent implements OnInit {

  @Input() public subscriptionRequestSummary: SubscriptionRequestSummary;
  @Input() public subscriberInfo: SubscriberInfo;
  @Input() public validationerror: any;

  public errorMessage: string = '';
  public totalAmount: number = 0;
  public emptyfield:boolean=false;
  public phonefield:boolean=false;
  public emailfield:boolean=false;
  public zipcodefield:boolean=false;
  @Input() public menuItem: MenuItem;
  @Output() public menuItemChanged = new EventEmitter<MenuItemSelectionInfo>();
  currentDate: any;
  ddmmyyy:any;
  Sdata;
  RSdata;
  public quantity: number = 0;
  Lobj20: any;
  user;
  total=[];
  finalTotal: number=0;
  promoCode:string="Promo";
  promocheck:boolean=false;
  constructor(private router: Router,

    public addcart: AddcartService,
 public   datepipe: DatePipe) {
      this.currentDate = new Date();
      this.ddmmyyy = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
      
  }

  ngOnInit(): void {
  this.Sdata =JSON.parse(sessionStorage.getItem('scheduledata'));
  this.RSdata =JSON.parse(sessionStorage.getItem('requestdata'));
  if(this.RSdata){
    this.Sdata=this.RSdata.schedullingInfo;
    this.Sdata.forEach(item => {
      let total=0;
      let startdate= new Date(item.startDate);
      let startdatesec=startdate.getTime();
      let enddate= new Date(item.endDate);
      let enddatesec=enddate.getTime();
      let count=0;
      for (var d = startdatesec; d <= enddatesec; d = d + 86400000){
         count=count+1;
      }
      
      count=count-item.exclusionDates.length;
    item.dishesItems.forEach(element => {
      total+=(element.cost)*(element.noOfUnits);
        
      });
     
      this.total.push(total*count)
      this.finalTotal+=total*count;
    });
  }
  else{
  this.addcart.getScheduleData().subscribe((Response) => {
    if (Response.isSuccess==true) {
      this.Sdata =Response.data;
      // console.log(this.schedulData)

      this.Sdata.forEach(item => {
        let total=0;
        let startdate= new Date(item.startDate);
        let startdatesec=startdate.getTime();
        let enddate= new Date(item.endDate);
        let enddatesec=enddate.getTime();
        let count=0;
        for (var d = startdatesec; d <= enddatesec; d = d + 86400000){
           count=count+1;
        }
        
        count=count-item.exclusionDates.length;
      item.dishesItems.forEach(element => {
        total+=(element.cost)*(element.noOfUnits);
          
        });
       
        this.total.push(total*count)
        this.finalTotal+=total*count;
        this.finalTotal=Math.round(  this.finalTotal );
      });
      

    
     } else {
      // this.router.navigate(["login"]);
      throw new Error(Response.errorMessage);
    }
  });
}
  this.user =JSON.parse(sessionStorage.getItem('user'));
  }


  testforvalidation() { //empty field validation
    for (var property in this.subscriberInfo) {
      if (this.subscriberInfo[property] == "") {
        this.validationerror[property] = "*";
      } else {this.validationerror[property] = "";
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
      this.validationerror.zipCode = "*";
      this.zipcodefield=false;
    }
    else if (!regexzip.test(this.subscriberInfo.zipCode)) {
      this.validationerror.zipCode = "*";
      this.zipcodefield=false;
    }
    else {
      this.zipcodefield=true; this.validationerror.zipCode = "";
    }
  }

  validateemail() {
    var regexemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (this.subscriberInfo.emailAddress == "") {
      this.validationerror.emailAddress = "*";
      this.emailfield=false;
    }
    else if (!regexemail.test(this.subscriberInfo.emailAddress)) {
      this.validationerror.emailAddress = "*";
      this.emailfield=false;
      }
    else {
      this.emailfield=true; this.validationerror.emailAddress = "";
    }
  }

  validatephone() {
    var regexphone = /^\d{10}$/;// phone validation
    if (this.subscriberInfo.phoneNumber == "") {
      this.validationerror.phoneNumber = "*";
      this.phonefield=false;
    }
    else if (!regexphone.test(this.subscriberInfo.phoneNumber)) {
      this.validationerror.phoneNumber = "*";
      this.phonefield=false;
    }
    else {
      this.phonefield=true; this.validationerror.phoneNumber = "";
    }
  }

  confirmOrder() {

    this.testforvalidation();
    // this.validatephone();
    this.validatezip();
    // this.validateemail();

    if (this.emptyfield &&this.zipcodefield) {
      let body={
        "partitionKey": "string",
        "rowKey": "string",
        "timestamp": this.ddmmyyy,
        "eTag": "string",
     
        "companyName": this.user.companyName,
        "subscriberName": this.user.subscriberName,
        "emailId": this.user.emailId,
        "phoneNumber": this.user.phoneNumber,
      
          "companyId": this.user.companyId,
          "deliveryAddresses": [
            {
              "addressLine1": this.subscriberInfo.addressLine1,
              "addressLine2": this.subscriberInfo.addressLine2,
              "city": this.subscriberInfo.city,
              "state": this.subscriberInfo.state,
              "country": this.subscriberInfo.country,
              "postalCode": this.subscriberInfo.zipCode
            }
          ],
          "subscriptionDate": this.ddmmyyy,
          "schedullingInfo": this.Sdata,
          "promoCode": this.promoCode,
          "totalOrderValue": this.finalTotal,
          "status": "Request",
          "emailFlag": "string"
        }
      
 
      this
        .addcart
        .SubscriptionRequest(body)
        .subscribe(response => {
          if (response.isSuccess) {
            this.router.navigate(["confirmation"]);
          } else {
            this.errorMessage = response.errorMessage;
          }
        });
    
    }

  }

  addMoreItems($event: any) {
    // this.router.navigate(["home"]);
  }
  UpdateOrder(){
    
    this.testforvalidation();
    // this.validatephone();
    this.validatezip();
    // this.validateemail();

    if (this.emptyfield &&this.zipcodefield) {
      let body={
        "partitionKey": this.user.companyId,
        "rowKey": this.RSdata.requestId ,
        "timestamp": this.ddmmyyy,
        "eTag": this.RSdata.eTag,
        "requestId": this.RSdata.requestId,
        "companyName": this.user.companyName,
        "subscriberName": this.user.subscriberName,
        "emailId": this.user.emailId,
        "phoneNumber": this.user.phoneNumber,
      
          "companyId": this.user.companyId,
          "deliveryAddresses": [
            {
              "addressLine1": this.subscriberInfo.addressLine1,
              "addressLine2": this.subscriberInfo.addressLine2,
              "city": this.subscriberInfo.city,
              "state": this.subscriberInfo.state,
              "country": this.subscriberInfo.country,
              "postalCode": this.subscriberInfo.zipCode
            }
          ],
          "subscriptionDate": this.ddmmyyy,
          "schedullingInfo": this.Sdata,
          "promoCode": this.promoCode,
          "totalOrderValue": this.finalTotal,
          "isActive": true,
          "isDeleted": false,
          "status": "Request",
          "emailFlag": "string"
        }
      
 
      this
        .addcart
        .EditRequestdata(body)
        .subscribe(response => {
          if (response.isSuccess) {
            this.router.navigate(["requestview"]);
            localStorage.removeItem("requestid");
            localStorage.removeItem("requestdata");
          } else {
            this.errorMessage = response.errorMessage;
          }
        });
    
    }

  }
}
