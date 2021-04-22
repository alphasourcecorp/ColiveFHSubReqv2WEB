import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddcartService } from '../addcart.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-adminrequestview',
  templateUrl: './adminrequestview.component.html',
  styleUrls: ['./adminrequestview.component.css']
})
export class AdminrequestviewComponent implements OnInit {
  requestList;
  originalData;
  requestId;
  request;
  Scheduledata;
  month_names_short;
  total = [];
  User;
  public UpdaterequestStatus;
  constructor(public addcart: AddcartService, private router: Router) {
    this.UpdaterequestStatus = environment.UpdateRequestStatusUrl;
    this.month_names_short = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' };
  }

  ngOnInit(): void {
    this.User = JSON.parse(sessionStorage.getItem('user'));
    this.requestId = sessionStorage.getItem("adminrequestid");
    this.addcart.Requestadmindata().subscribe((Response) => {

      if (Response.isSuccess == true) {
        this.requestList = Response.data;
        this.originalData = Response.data;
        this.requestList.forEach(request => {
          if (request.requestId == this.requestId) {
            this.request = request;
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



  changeStatus(requestid, status) {

    var xhr = new XMLHttpRequest();

    xhr.open("PUT", this.UpdaterequestStatus + "/" + requestid + "/" + this.User.companyId + "/" + status, false);
    xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(sessionStorage.getItem('token')));
    xhr.send("");
    let data = xhr;
    if (JSON.parse(data.response).isSuccess) {
      sessionStorage.removeItem('adminrequestid');
      this.router.navigate(["admin"]);
    }
  }
  gotorequestlist() {
    this.router.navigate(["admin"]);
  }
}
