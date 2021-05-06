import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddcartService } from '../addcart.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  companydata;
  menuDataList = [];
  rawmenuDATA=[]
  requestList;
  currentDate;
  yymmdd;
  rawDatalist;
  searchQuery;
  startdate;
  enddate;
  query;
  all: boolean = true;
  request: boolean = false;
  reject: boolean = false;
  aprrove: boolean = false;

  constructor(public addcart: AddcartService, private router: Router, public datepipe: DatePipe) {
    this.currentDate = new Date();
    this.yymmdd = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');

  }

  ngOnInit(): void {
    this.apicall();
   this.getCompany();
 
  }

  menuclick(company) {
    this.startdate = "";
    this.enddate = "";
    this.all = true;
    this.request = false;
    this.reject = false;
    this.aprrove = false;
    this.requestList = this.rawDatalist;
    this.requestList = this.requestList.filter(res => {
      return res.subscriberName.toLowerCase().includes(company.toLowerCase())
    })
    this.closeNav();
  }
  apicall() {

    this.addcart.Requestadmindata().subscribe((Response) => {

      if (Response.isSuccess == true) {
        this.rawDatalist = Response.data;
       
        this.requestList = Response.data;
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
  closeNav() {
    document.getElementById("mySidenavAdmin").style.width = "0";
  }
  openNav() {
    document.getElementById("mySidenavAdmin").style.width = "350px";
  }
  goTorequestView(str) {
    sessionStorage.setItem("adminrequestid", str);
    this.router.navigate(["adminrequestview"]);

  }
  logout() {
    this.router.navigate(["login"]);
    sessionStorage.clear();
  }
  signup() {
    this.router.navigate(["signup"]);
  }
  search() {
    // this.startdate = "";
    // this.enddate = "";
    // this.all = true;
    // this.request = false;
    // this.reject = false;
    // this.aprrove = false;
    // this.requestList = this.rawDatalist;
    this.requestList = this.requestList.filter(res => {
      return res.subscriberName.toLowerCase().includes(this.searchQuery.toLowerCase()) || res.requestId.toLowerCase().includes(this.searchQuery.toLowerCase())
    })
  }
  Onallclick() {
    this.startdate = "";
    this.enddate = "";
    this.all = true;
    this.request = false;
    this.reject = false;
    this.aprrove = false;
    this.requestList = this.rawDatalist;

  }
  Onrequestclick() {
    this.startdate = "";
    this.enddate = "";
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
    this.startdate = "";
    this.enddate = "";
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
    this.startdate = "";
    this.enddate = "";
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
    this.startdate = "";
    this.enddate = "";
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
  getCompany(){
    this.addcart.Getcompanydata().subscribe((Response) => {
      if (Response.isSuccess == true) {
       this.companydata=Response.data;
         this.companydata.forEach(element => {
          this.rawmenuDATA.push(element.subscriberName)
        });
        this.rawmenuDATA = [...new Set(this.rawmenuDATA)];
        this.menuDataList=this.rawmenuDATA;
      } else {
      }
    });
     }
     searchcompany(){
      if(this.query==null || ""){
        this.menuDataList=this.rawmenuDATA;
      }
      this.menuDataList =this.rawmenuDATA;
      this.menuDataList =  this.menuDataList.filter(res => {
        return res.toLowerCase().includes(this.query.toLowerCase()) 
      })
        }

     
  }


