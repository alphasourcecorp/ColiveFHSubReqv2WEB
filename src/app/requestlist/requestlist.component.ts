import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddcartService } from '../addcart.service';

@Component({
  selector: 'app-requestlist',
  templateUrl: './requestlist.component.html',
  styleUrls: ['./requestlist.component.css']
})
export class RequestlistComponent implements OnInit {
  requestList;
  currentDate;
  yymmdd;
  rawDatalist;
  searchQuery;
  startdate;
  enddate;
  all: boolean = true;
  request: boolean = false;
  reject: boolean = false;
  aprrove: boolean = false;
  constructor(public addcart: AddcartService,private router: Router){ }

  ngOnInit(): void {
    this.addcart.Requestadmindata().subscribe((Response) => {
   
      if (Response.isSuccess==true) {
        this.requestList =Response.data;
        this.rawDatalist=Response.data;
        this.requestList.sort(function (b, a) {
          let x = new Date(a.subscriptionDate.slice(0, 10));
          let y = new Date(b.subscriptionDate.slice(0, 10));
          return x.getTime() - y.getTime()
        });
      
} else {
          throw new Error(Response.errorMessage);
      }
    });
  }
  goTorequestView(str){
    sessionStorage.setItem("requestid", str);
    this.router.navigate(["requestview"]);
  }
  
  search() {
    this.startdate="";
    this.enddate="";
    this.all = true;
    this.request = false;
    this.reject = false;
    this.aprrove = false;
    this.requestList = this.rawDatalist;
    this.requestList = this.requestList.filter(res => {
      return  res.requestId.toLowerCase().includes(this.searchQuery.toLowerCase())
    })
  }
  Onallclick() {
    this.startdate="";
    this.enddate="";
    this.all = true;
    this.request = false;
    this.reject = false;
    this.aprrove = false;
    this.requestList = this.rawDatalist;

  }
  Onrequestclick() {
    this.startdate="";
    this.enddate="";
    this.all = false;
    this.request = true;
    this.reject = false;
    this.aprrove = false;
    this.requestList = this.rawDatalist;
    this.requestList = this.requestList.filter(res => {
      return res.status == "Request"
    })

  }
  Onacceptedclick() {
    this.startdate="";
    this.enddate="";
    this.all = false;
    this.request = false;
    this.reject = false;
    this.aprrove = true;
    this.requestList = this.rawDatalist;
    this.requestList = this.requestList.filter(res => {
      return res.status == "Approved"
    })
  }
  Onrejectedclick() {
    this.startdate="";
    this.enddate="";
    this.all = false;
    this.request = false;
    this.reject = true;
    this.aprrove = false;
    this.requestList = this.rawDatalist;
    this.requestList = this.requestList.filter(res => {
      return res.status == "Rejected"
    })
  }
  clear() {
    this.Onallclick();
    this.searchQuery = "";
    this.startdate="";
    this.enddate="";
  }
  datesearch() {
    if(this.all){
    if (this.startdate && this.enddate) {
       let start = new Date(this.startdate);
      let s = start.getTime();
      let end = new Date(this.enddate);
      let e = end.getTime();
      this.requestList = this.rawDatalist;
        this.requestList = this.requestList.filter(res => {
        let x = new Date(res.subscriptionDate.slice(0, 10));
        let y = x.getTime();
        return y >= s && y <= e
      })
    }}
    if(this.request){
      if (this.startdate && this.enddate) {
         let start = new Date(this.startdate);
        let s = start.getTime();
        let end = new Date(this.enddate);
        let e = end.getTime();
        this.requestList = this.rawDatalist;
          this.requestList = this.requestList.filter(res => {
          let x = new Date(res.subscriptionDate.slice(0, 10));
          let y = x.getTime();
          return y >= s && y <= e && res.status == "Request"
        })
      }}
      if(this.reject){
        if (this.startdate && this.enddate) {
           let start = new Date(this.startdate);
          let s = start.getTime();
          let end = new Date(this.enddate);
          let e = end.getTime();
          this.requestList = this.rawDatalist;
            this.requestList = this.requestList.filter(res => {
            let x = new Date(res.subscriptionDate.slice(0, 10));
            let y = x.getTime();
            return y >= s && y <= e && res.status == "Rejected"
          })
        }}
        if(this.aprrove){
          if (this.startdate && this.enddate) {
             let start = new Date(this.startdate);
            let s = start.getTime();
            let end = new Date(this.enddate);
            let e = end.getTime();
            this.requestList = this.rawDatalist;
              this.requestList = this.requestList.filter(res => {
              let x = new Date(res.subscriptionDate.slice(0, 10));
              let y = x.getTime();
              return y >= s && y <= e && res.status == "Approved"
            })
          }}
  }


}
