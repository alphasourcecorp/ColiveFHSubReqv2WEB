import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AddcartService } from '../addcart.service';

@Component({
  selector: 'app-cartvalue',
  templateUrl: './cartvalue.component.html',
  styleUrls: ['./cartvalue.component.css'],
})
export class CartvalueComponent implements OnChanges, OnInit {
  scheduleListAPI;
  schedulData = [];
  token;
  @Input() public request;
  @Input() public schedule;
  constructor(private router: Router, public addCart: AddcartService) {
    this.scheduleListAPI = environment.ScheduleListUrl;
    this.token = sessionStorage.getItem('token');
  }
  ngOnChanges() {
    this.callsheduleAPI();
  }

  ngOnInit(): void {
    this.callsheduleAPI();
  }
  goTOschedule() {
    this.router.navigate(['schedulelist']);
  }
  gotorequestlist() {
    this.router.navigate(['requestlist']);
  }
  logout() {
    this.router.navigate(['login']);
    sessionStorage.clear();
  }

  callsheduleAPI() {
    this.addCart.getScheduleData().subscribe((Response) => {
      if (Response.isSuccess == true) {
        this.schedulData = Response.data;
      } else {
      }
    });
    sessionStorage.setItem('scheduledata', JSON.stringify(this.schedulData));
  }
}
