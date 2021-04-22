import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemSummaryInfo } from '../models/menu-item-summary-info';
import { SubscriberInfo } from '../models/subscriber-info';
import { SubscriptionRequestSummary } from '../models/subscription-request-summary';

@Component({
  selector: 'app-businessinfo',
  templateUrl: './businessinfo.component.html',
  styleUrls: ['./businessinfo.component.css']
})
export class BusinessinfoComponent implements OnInit {

  public subscriptionRequestSummary: SubscriptionRequestSummary;
  public subscriberInfo: SubscriberInfo;

  public Validationerror: any;

  e: string;
  companyName: string;
  public prevurl: any;
  userDetails: any;


  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.prevurl = navigation.previousNavigation?.finalUrl;
    this.subscriptionRequestSummary = navigation.extras.state as SubscriptionRequestSummary;

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
    this.userDetails = JSON.parse(sessionStorage.getItem("user"));
    if (this.userDetails) {
      this.subscriberInfo.companyName = this.userDetails.companyName;
      this.subscriberInfo.fullName = this.userDetails.subscriberName;
      this.subscriberInfo.emailAddress = this.userDetails.emailId;
      this.subscriberInfo.phoneNumber = this.userDetails.phoneNumber;
      this.subscriberInfo.addressLine1 = this.userDetails.cAddress.addressLine1;
      this.subscriberInfo.addressLine2 = this.userDetails.cAddress.addressLine2;
      this.subscriberInfo.city = this.userDetails.cAddress.city;
      this.subscriberInfo.state = 'Karnataka';
      this.subscriberInfo.country = "India";
      this.subscriberInfo.zipCode = this.userDetails.cAddress.postalCode;
    }

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
}
