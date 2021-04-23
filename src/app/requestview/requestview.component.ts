import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddcartService } from '../addcart.service';

@Component({
  selector: 'app-requestview',
  templateUrl: './requestview.component.html',
  styleUrls: ['./requestview.component.css']
})
export class RequestviewComponent implements OnInit {
  requestList;
  requestId;
  request;
  Scheduledata;
  month_names_short;
  total = [];
  today;
  minustotal;
  ddMMyyyy;
  constructor(public addcart: AddcartService, private router: Router,public datepipe: DatePipe) {
    this.today=new Date();

    this.ddMMyyyy = this.datepipe.transform(this.today, 'yyyy-MM-dd');
    this.month_names_short = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' };
  }

  ngOnInit(): void {
    this.requestId = sessionStorage.getItem("requestid");
    this.addcart.Requestadmindata().subscribe((Response) => {

      if (Response.isSuccess == true) {
        this.requestList = Response.data;
        this.requestList.forEach(request => {
          if (request.requestId == this.requestId) {
            this.request = request;
            console.log(this.request)
            this.Scheduledata = request.schedullingInfo;

            this.Scheduledata.forEach(item => {
              let total = 0;
              let startdate = new Date(item.startDate);
              let startdatesec = startdate.getTime();
              let enddate = new Date(item.endDate);
              let enddatesec = enddate.getTime();
              let count = 0;
              for (var d = startdatesec; d <= enddatesec; d = d + 86400000) {
                count = count + 1;
              }

              count = count - item.exclusionDates.length;

              item.dishesItems.forEach(element => {
                total += (element.cost) * (element.noOfUnits);

              });

              this.total.push(total * count)

            });
          }
        });
      } else {
        throw new Error(Response.errorMessage);
      }
    });
  }

  deleteRequest(requestID) {
    this.addcart.DeleteRequestdata(requestID).subscribe((Response) => {
      if (Response.isSuccess == true) {

        sessionStorage.removeItem('requestid');
        this.router.navigate(["requestlist"]);
      } else {

        throw new Error(Response.errorMessage);
      }
    });
  }
  editAddress() {

    sessionStorage.setItem("requestdata", JSON.stringify(this.request));
    this.router.navigate(["businessinfo"]);
  }
  editSchedule(scheduleID) {
    sessionStorage.setItem("requestdata", JSON.stringify(this.request));
    sessionStorage.setItem("scheduledata", JSON.stringify(this.request.schedullingInfo));
    sessionStorage.setItem("scheduleID", scheduleID);
    this.router.navigate(["schedule"]);
  }
  deleteSchedule(scheduleID){
    let schedule= this.request.schedullingInfo;
    let arry=[];
    schedule.forEach(element => {
      if(element.scheduleID==scheduleID){
        let total = 0;
        let startdate = new Date(element.startDate);
        let startdatesec = startdate.getTime();
        let enddate = new Date(element.endDate);
        let enddatesec = enddate.getTime();
        let count = 0;
        for (var d = startdatesec; d <= enddatesec; d = d + 86400000) {
          count = count + 1;
        }

        count = count - element.exclusionDates.length;

        element.dishesItems.forEach(element => {
          total += (element.cost) * (element.noOfUnits);
        });
        this.minustotal=total*count;
      }
      if(element.scheduleID!=scheduleID){
        arry.push(element);
      }
    });
    
let body ={
  "partitionKey": this.request.partitionKey,
  "rowKey": this.request.rowKey,
  "timestamp": this.ddMMyyyy,
  "eTag": this.request.eTag,
  "requestId": this.request.requestId,
  "companyId": this.request.companyId,
  "companyName": this.request.companyName,
  "subscriberName": this.request.subscriberName,
  "emailId": this.request.emailId,
  "phoneNumber": this.request.phoneNumber,
  "deliveryAddresses": [
    {
      "addressLine1": this.request.deliveryAddresses[0].addressLine1,
      "addressLine2": this.request.deliveryAddresses[0].addressLine2,
      "city": this.request.deliveryAddresses[0].city,
      "state": this.request.deliveryAddresses[0].state,
      "country": this.request.deliveryAddresses[0].country,
      "postalCode":this.request.deliveryAddresses[0].postalCode
    }
  ],
  "subscriptionDate": this.ddMMyyyy,
  "schedullingInfo": arry,
  "promoCode": this.request.promoCode,
  "notes": " ",
  "totalOrderValue": this.request.totalOrderValue-Math.round(this.minustotal),
  "status": this.request.status,
  "isActive": true,
  "isDeleted": false
}
this
.addcart
.EditRequestdata(body)
.subscribe(response => {
  if (response.isSuccess) {
    window.location.reload();
  } else {
    // this.errorMessage = response.errorMessage;
  }
});
  }

}
