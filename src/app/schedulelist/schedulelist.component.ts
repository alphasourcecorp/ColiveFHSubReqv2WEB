import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



import { environment } from 'src/environments/environment';
import { AddcartService } from '../addcart.service';

@Component({
  selector: 'app-schedulelist',
  templateUrl: './schedulelist.component.html',
  styleUrls: ['./schedulelist.component.css']
})

export class SchedulelistComponent implements OnInit {
  scheduleListAPI;
  schedule=true;
  User;
  schedulData=[];
  month_names_short;
  total=[];
  finalTotal
  _error: HttpErrorResponse
  constructor(public addcart: AddcartService, private http: HttpClient,private router: Router) { 
    this.month_names_short = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' };
    this.scheduleListAPI = environment.ScheduleListUrl;

  
   
  }

  ngOnInit(): void {
    this.addcart.getScheduleData().subscribe((Response) => {
      if (Response.isSuccess==true) {
        this.schedulData =Response.data;
        // console.log(this.schedulData)
        if(this.schedulData.length<=0){
          this.router.navigate(["home"]);
        }
        this.schedulData.forEach(item => {
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
          
        });
      
        sessionStorage.setItem("scheduledata", JSON.stringify(this.schedulData));
       } else {
        // this.router.navigate(["login"]);
        throw new Error(Response.errorMessage);
      }
    });
  
  }
  editSchedule(scheduleid){
    sessionStorage.setItem("scheduleID", scheduleid);
    this.router.navigate(["schedule"]);
  }
  deleteSchedule(sheduleid){
    this.addcart. deleteScheduleData(sheduleid).subscribe((Response) => {
      if (Response.isSuccess==true) {
        window.location.reload();
       } else {
   
        throw new Error(Response.errorMessage);
      }
    });
  }
  goToRequest(){
    this.router.navigate(["businessinfo"]);
  }
}
