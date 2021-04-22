import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemSummaryInfo } from '../models/menu-item-summary-info';
import { Menu } from '../models/menu';
import { HomeComponent } from '../home/home.component';
import { DatePipe, JsonPipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { AddcartService } from '../addcart.service';

import {
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarMonthViewBeforeRenderEvent,
  CalendarMonthViewDay,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
  DateFormatterParams,
} from 'angular-calendar';
import { DAYS_OF_WEEK, WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import { Subject } from 'rxjs';
import { CustomDateFormatter } from './costom-date-formatter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DishItem } from '../models/dish-item';
import { MenuItem } from '../models/menuitem';





const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    // primary: '#1e90ff',
    // secondary: '#D1E8FF',
  },
  yellow: {
    // primary: '#e3bc08',
    // secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },

  ],
})


export class ScheduleComponent implements OnInit {
  ScheduleID;
  public menu: Menu[];
  currentDate: any;
  public newstartDate: any;
  public newendDate: any;
  public startDate: any;
  public endDate: any;
  public BFselect: boolean = true;
  public Lselect: boolean = false;
  public Dselect: boolean = false;
  public sunDay: boolean = true;
  public monDay: boolean = true;
  public tuesDay: boolean = true;
  public wednesDay: boolean = true;
  public thusDay: boolean = true;
  public friDay: boolean = true;
  public satDay: boolean = true;
  refresh: Subject<any> = new Subject();
  Lmenu;
  tommorow;
  ddMMyyyy: any;
  tdddMMyyyy
  Scheduledata;
  check: any;
  body: CalendarMonthViewDay[];
  day: CalendarMonthViewDay;
  Excluded_days = [];
  dishItems = [];
  value: any;
  addToscheduleAPI;
  User;
  RSdata;
  finalTotal:number;
  @Input() public menuItemSummaries: MenuItemSummaryInfo[];
  menuArray=[];
  ExcludedWeeks = [];
  ExcludeDays = {
    selectedDays: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thusday: [],
    friday: [],
    satday: [],

  }
  month_names_short: any;

  constructor(private router: Router, public datepipe: DatePipe, public addcart: AddcartService, private http: HttpClient) {
    this.currentDate = new Date();
    this.ddMMyyyy = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.tommorow =new Date(this.currentDate.getTime() + 86400000);
    this.tdddMMyyyy = this.datepipe.transform(this.tommorow, 'yyyy-MM-dd');
    this.value = {
      '0004001': '0', '0004002': '0', '0004003': '0', '0004004': '0',
      '0004005': '0', '0004006': '0', '0004007': '0', '0004008': '0',
      '0004009': '0', '0004010': '0', '0003001': '0', '0003002': '0',
      '0003003': '0', '0006001': '0', '0006002': '0', '0006003': '0',
      '0006004': '0', '0006005': '0', '0006006': '0', '0006007': '0',
      '0007001': '0', '0007002': '0', '0007003': '0', '0001001': '0',
      '0001002': '0', '0001003': '0', '0001004': '0', '0001005': '0',
      '0001006': '0', '0001007': '0', '0001008': '0', '0001009': '0',
      '0001010': '0', '0001011': '0', '0001012': '0', '0001013': '0',
      '0002001': '0', '0002002': '0', '0002003': '0', '0002004': '0',
      '0002005': '0', '0002006': '0', '0002007': '0', '0002008': '0',
      '0002009': '0', '0002010': '0', '0002011': '0', '0002012': '0',
      '0005001': '0', '0005002': '0', '0005003': '0', '0005004': '0',
      '0005005': '0', '0008001': '0', '0008002': '0', '0008003': '0',
      '0008004': '0', '0008005': '0', '0008006': '0', '0009001': '0',
      '0009002': '0', '0009003': '0', '0009004': '0', '0009005': '0',
      '0009006': '0', '0009007': '0', '0009008': '0', '0009009': '0',
      '0010001': '0', '0010002': '0', '0010003': '0', '0010004': '0',
      '0010005': '0', '0010006': '0', '0010007': '0', '0010008': '0',
      '0010009': '0', '0010010': '0', '0010011': '0', '0010012': '0',
      '0010013': '0', '0010014': '0', '0010015': '0', '0010016': '0',
      '0010017': '0', '0010018': '0', '0011001': '0', '0011002': '0',
      '0011003': '0', '0011004': '0', '0011005': '0', '0011006': '0',
      '0011007': '0', '0011008': '0', '0011009': '0', '0011010': '0',
      '0011011': '0', '0011012': '0', '0011013': '0', '0011014': '0',
      '0011015': '0', '0011016': '0', '0011017': '0', '0011018': '0',
      '0011019': '0', '0011020': '0', '0012001': '0', '0012002': '0',
      '0012003': '0', '0012004': '0', '0012005': '0', '0013001': '0',
      '0013002': '0', '0013003': '0', '0014001': '0', '0014002': '0',
      '0014003': '0', '0014004': '0', '0015001': '0', '0015002': '0',
      '0015003': '0', '0016001': '0', '0016002': '0', '0016003': '0',
      '0016004': '0', '0016005': '0', '0016006': '0', '0016007': '0',
      '0016008': '0', '0016009': '0', '0017001': '0', '0017002': '0',
      '0017003': '0', '0017004': '0', '0017005': '0',
    };
    this.check = {
      '0004001': true, '0004002': true, '0004003': true, '0004004': true,
      '0004005': true, '0004006': true, '0004007': true, '0004008': true,
      '0004009': true, '0004010': true, '0003001': true, '0003002': true,
      '0003003': true, '0006001': true, '0006002': true, '0006003': true,
      '0006004': true, '0006005': true, '0006006': true, '0006007': true,
      '0007001': true, '0007002': true, '0007003': true, '0001001': true,
      '0001002': true, '0001003': true, '0001004': true, '0001005': true,
      '0001006': true, '0001007': true, '0001008': true, '0001009': true,
      '0001010': true, '0001011': true, '0001012': true, '0001013': true,
      '0002001': true, '0002002': true, '0002003': true, '0002004': true,
      '0002005': true, '0002006': true, '0002007': true, '0002008': true,
      '0002009': true, '0002010': true, '0002011': true, '0002012': true,
      '0005001': true, '0005002': true, '0005003': true, '0005004': true,
      '0005005': true, '0008001': true, '0008002': true, '0008003': true,
      '0008004': true, '0008005': true, '0008006': true, '0009001': true,
      '0009002': true, '0009003': true, '0009004': true, '0009005': true,
      '0009006': true, '0009007': true, '0009008': true, '0009009': true,
      '0010001': true, '0010002': true, '0010003': true, '0010004': true,
      '0010005': true, '0010006': true, '0010007': true, '0010008': true,
      '0010009': true, '0010010': true, '0010011': true, '0010012': true,
      '0010013': true, '0010014': true, '0010015': true, '0010016': true,
      '0010017': true, '0010018': true, '0011001': true, '0011002': true,
      '0011003': true, '0011004': true, '0011005': true, '0011006': true,
      '0011007': true, '0011008': true, '0011009': true, '0011010': true,
      '0011011': true, '0011012': true, '0011013': true, '0011014': true,
      '0011015': true, '0011016': true, '0011017': true, '0011018': true,
      '0011019': true, '0011020': true, '0012001': true, '0012002': true,
      '0012003': true, '0012004': true, '0012005': true, '0013001': true,
      '0013002': true, '0013003': true, '0014001': true, '0014002': true,
      '0014003': true, '0014004': true, '0015001': true, '0015002': true,
      '0015003': true, '0016001': true, '0016002': true, '0016003': true,
      '0016004': true, '0016005': true, '0016006': true, '0016007': true,
      '0016008': true, '0016009': true, '0017001': true, '0017002': true,
      '0017003': true, '0017004': true, '0017005': true,
    };
    this.month_names_short = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' };

  }
  ngOnInit(): void {
    console.log(this.tommorow);
    this.finalTotal=0;
    this.RSdata =JSON.parse(sessionStorage.getItem('requestdata'));
    this.Lmenu=JSON.parse(sessionStorage.getItem("menu"));
    this.menuItemSummaries = JSON.parse(sessionStorage.getItem("menuitemselection"));
    this.ScheduleID = sessionStorage.getItem("scheduleID");
    this.Scheduledata = JSON.parse(sessionStorage.getItem("scheduledata"));
    if(this.ScheduleID || this.menuItemSummaries){
      
    }else{this.router.navigate(["home"]);}
    if(this.ScheduleID && this.Scheduledata && !this.menuItemSummaries){
      this.Scheduledata.forEach(element => {
          if(element.scheduleID==this.ScheduleID){
            this.Lmenu.forEach(menu => {
              menu.menuDetails.forEach(dish => {
                element.dishesItems.forEach(dishitem => {
                  if(dish.dishName==dishitem.dishItemName){
                    const menuItem = {
                      uniqueDishId:dish.uniqueDishId,
                      dishImage: dish.dishImage[0],
                      dishName: dish.dishName,
                      quantity: dishitem.noOfUnits,
                      saleAmount: dish.saleAmount,
                      totalAmount: dishitem.noOfUnits * dish.saleAmount,
                    };
                    this.menuArray.push( menuItem);
                    this.value[dish.uniqueDishId]=dishitem.noOfUnits;
                  }
                });
              });
            });
          
          }
        });
  
        if(this.menuItemSummaries){
          this.menuArray=[];
          this.menuArray=this.menuItemSummaries;
          sessionStorage.setItem('menuitemselection', JSON.stringify(this.menuArray));
        }else{
          this.menuItemSummaries=[];
          this.menuItemSummaries=this.menuArray;
          sessionStorage.setItem('menuitemselection', JSON.stringify(this.menuArray));  
        }
      
   
    }
    
    let sValue = JSON.parse(sessionStorage.getItem('value'));
    this.User = JSON.parse(sessionStorage.getItem('user'));
    if (sValue) {
      for (const key in this.value) {
        if (Object.prototype.hasOwnProperty.call(this.value, key)) {
          this.value[key] = sValue[key];

        }
      }
    }
  }

  goTohome() {
    this.router.navigate(["home"]);
    sessionStorage.setItem('value', JSON.stringify(this.value));
 
  }
  events: CalendarEvent[] = [
  ];
  onDatechange(){
   
    let date1 =new Date(this.startDate);
    var d1 = date1.getDate();
    var m1 = date1.getMonth() + 1;
    var y1 = date1.getFullYear();
    var dateString1 = (d1 <= 9 ? '0' + d1 : d1) + '-' + (m1 <= 9 ? '0' + m1 : m1) + '-' + y1;
    let date2 =new Date(this.endDate);
    var d = date2.getDate();
    var m = date2.getMonth() + 1;
    var y = date2.getFullYear();
    var dateString = (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
    this.newstartDate=dateString1;
    this.newendDate=dateString;
    
  }
  convert() {
    //  this.Excluded_days=[...new Set(this.ExcludeDays.selectedDays.map(x=>this.datechange(x)))];
    this.Excluded_days = [];
    for (const key in this.ExcludeDays) {
      if (Object.prototype.hasOwnProperty.call(this.ExcludeDays, key)) {
        const element = this.ExcludeDays[key];
        element.forEach(date => {
          var d = date.getDate();
          var m = date.getMonth() + 1;
          var y = date.getFullYear();
          var dateString =  y+ '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) ;
          this.Excluded_days.push(dateString);
        });
      }
    }
    this.Excluded_days = [...new Set(this.Excluded_days)];
    this.Excluded_days.sort();
    this.ExcludedWeeks=[];
    if (this.sunDay == false) {
      this.ExcludedWeeks.push(0);
    }
    if (this.monDay == false) {
      this.ExcludedWeeks.push(1);
    }
    if (this.tuesDay == false) {
      this.ExcludedWeeks.push(2);
    }
    if (this.wednesDay == false) {
      this.ExcludedWeeks.push(3);
    }
    if (this.thusDay == false) {
      this.ExcludedWeeks.push(4);
    }
    if (this.friDay == false) {
      this.ExcludedWeeks.push(5);
    }
    if (this.satDay == false) {
      this.ExcludedWeeks.push(6);
    }
    this.dishItems=[];
    for (let menuItem of this.menuItemSummaries) {
      let dishItem= {
        "dishItemName": menuItem.dishName,
        "description": "no description",
        "dishImageUrl": menuItem.dishImage,
        "cost": menuItem.saleAmount,
        "noOfUnits": parseInt(this.value[menuItem.uniqueDishId]),
        "taxValue": 0,
        "packingCharges": 0,
        "deliveryCharges": 0,
        "isDishRequired": true
      };
      if (this.check[menuItem.uniqueDishId] == true) {
        this.dishItems.push(dishItem);
      }

    }
    this.onDatechange();
  }

  addEvent(): void {
    if (this.startDate && this.endDate) {
      var newSdATE = new Date(this.startDate);
      var newEdATE = new Date(this.endDate);
      var NewS = newSdATE.getTime() - 19800000;
      var NewE = newEdATE.getTime() - 19800000;
      this.events = [

        {
          title: '',
          start: new Date(NewS),
          end: new Date(NewE),
          color: colors.yellow,
          meta: {
            type: 'allday',
          },

        },
      ];
    }
  }

  handleQuantity(units: number, x: any) {
    var y = this.value[x];
    var z = parseInt(y);
    z -= units;

    if (z <= 1) {
      z = 1;
    }
    if (z >= 99) {
      z = 99;
    }
    this.value[x] = z.toString();

    sessionStorage.setItem('value', JSON.stringify(this.value));
  }

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  selectedMonthViewDay: CalendarMonthViewDay;

  selectedDayViewDate: Date;

  hourColumns: WeekViewHourColumn[];



  selectedDays: any = [];

  dayClicked(day: CalendarMonthViewDay): void {
    var newSdATE = new Date(this.startDate);
    var newEdATE = new Date(this.endDate);
    var NewS = newSdATE.getTime() - 19800000;
    var NewE = newEdATE.getTime() - 19800000;
    var daytime = day.date.getTime();
    if (NewS <= daytime && daytime <= NewE) {
      this.selectedMonthViewDay = day;

      const selectedDateTime = this.selectedMonthViewDay.date.getTime();

      const dateIndex = this.ExcludeDays.selectedDays.findIndex(
        (selectedDay) => selectedDay.getTime() === selectedDateTime
      );

      if (dateIndex > -1) {
        delete this.selectedMonthViewDay.cssClass;
        this.ExcludeDays.selectedDays.splice(dateIndex, 1);

      } else {
        this.ExcludeDays.selectedDays.push(this.selectedMonthViewDay.date);
        day.cssClass = 'cal-day-selected';
        // day.cssClass="my-class";
        this.selectedMonthViewDay = day;
      }

    }
  }
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
  onCheckboxChange(day: any, type: string, week: number) {

    if (this.startDate && this.endDate) {
      var newSdATE = new Date(this.startDate);
      var newEdATE = new Date(this.endDate);
      var NewS = newSdATE.getTime() - 19800000;
      var NewE = newEdATE.getTime() - 19800000;
      if (day == false) { //loop and  sun evnt strt 
        for (var d = NewS; d <= NewE; d = d + 86400000) {
          var exdate = new Date(d);

          if (exdate.getDay() == week) {

            this.events = [
              ...this.events,
              {
                title: '',
                start: exdate,
                color: colors.yellow,
                cssClass: "my-class",
                meta: {
                  type: type,
                },
              },
            ];
            this.ExcludeDays.selectedDays = [];
            this.ExcludeDays[type].push(exdate);
          }
        }
      } //evnt end
      if (day == true) {   //dlte evnt
        this.events.forEach((event) => {
          if (event.meta.type == type) {
            this.deleteEvent(event);
          }
        }); this.ExcludeDays.selectedDays = [];
        this.ExcludeDays[type] = [];

      } // dlte evnt

    }
  }
  addToschedule() {
    let body=
    {
        "companyID": this.User.companyId,
        "dishesItems": this.dishItems,
        "isBreakfast": this.BFselect,
        "isLunch": this.Lselect,
        "isDinner": this.Dselect,
        "startDate": this.startDate,
        "endDate": this.endDate,
        "pointOfContact": this.User.subscriberName,
        "createdDate": this.ddMMyyyy,
        "updatedDate": this.ddMMyyyy,
        "exclusionDates":this.Excluded_days,
        "exclusionWeeks": this.ExcludedWeeks,
        "itemDeliveryTime": [
          {
            "lunch": "01:00 PM",
            "breakfast": "10:00 AM",
            "dinner": "09:00 PM",
            "snacks": "05:00 PM"
          }
        ],
        "exclusionReason": "Holiday",
        "isActive": true
      }

  
      this.addcart.Scheduledata(body).subscribe((Response) => {
        if (Response.isSuccess==true) {
          sessionStorage.removeItem('menuitemselection');
          sessionStorage.removeItem('value');
          this.router.navigate(["home"]);
                 } else {
                   throw new Error(Response.errorMessage);
        }
      });
  
  }
  Editschedule() {
    let body=
    { 
        "scheduleID": this. ScheduleID,
        "companyID": this.User.companyId,
        "dishesItems": this.dishItems,
        "isBreakfast": this.BFselect,
        "isLunch": this.Lselect,
        "isDinner": this.Dselect,
        "startDate": this.startDate,
        "endDate": this.endDate,
        "pointOfContact": this.User.subscriberName,
        "createdDate": this.ddMMyyyy,
        "updatedDate": this.ddMMyyyy,
        "exclusionDates":this.Excluded_days,
        "exclusionWeeks": this.ExcludedWeeks,
        "itemDeliveryTime": [
          {
            "lunch": "01:00 PM",
            "breakfast": "10:00 AM",
            "dinner": "09:00 PM",
            "snacks": "05:00 PM"
          }
        ],
        "exclusionReason": "Holiday",
        "isActive": true
      }

  
      this.addcart.EditScheduledata(body).subscribe((Response) => {
        if (Response.isSuccess==true) {
          sessionStorage.removeItem('menuitemselection');
          sessionStorage.removeItem('value');
          sessionStorage.removeItem('scheduleID');
          this.router.navigate(["schedulelist"]);
                 } else {
                   throw new Error(Response.errorMessage);
        }
      });
  
  }
  RequestscheduleEdit(){
    let arry=[];
    let Sdata=this.RSdata.schedullingInfo;
    console.log(Sdata);
    Sdata.forEach(element => {
  if(element.scheduleID!=this. ScheduleID){
     arry.push(element);
  }
  console.log(arry);
});
    let schedule=
        { 
        "scheduleID": this. ScheduleID,
        "companyID": this.User.companyId,
        "dishesItems": this.dishItems,
        "isBreakfast": this.BFselect,
        "isLunch": this.Lselect,
        "isDinner": this.Dselect,
        "startDate": this.startDate,
        "endDate": this.endDate,
        "pointOfContact": this.User.subscriberName,
        "createdDate": this.ddMMyyyy,
        "updatedDate": this.ddMMyyyy,
        "exclusionDates":this.Excluded_days,
        "exclusionWeeks": this.ExcludedWeeks,
        "itemDeliveryTime": [
          {
            "lunch": "01:00 PM",
            "breakfast": "10:00 AM",
            "dinner": "09:00 PM",
            "snacks": "05:00 PM"
          }
        ],
        "exclusionReason": "Holiday",
        "isActive": true
      }
      arry.push(schedule);
      arry.forEach(item => {
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
       
     
        this.finalTotal+=total*count;
        this.finalTotal=Math.round(  this.finalTotal );
      });

    let body={
      "partitionKey": this.User.companyId,
      "rowKey": this.RSdata.requestId ,
      "timestamp": this.ddMMyyyy,
      "eTag": this.RSdata.eTag,
      "requestId": this.RSdata.requestId,
      "companyName": this.User.companyName,
      "subscriberName": this.User.subscriberName,
      "emailId": this.User.emailId,
      "phoneNumber": this.User.phoneNumber,
    
        "companyId": this.User.companyId,
        "deliveryAddresses": [
          {
            "addressLine1": this.RSdata.deliveryAddresses[0].addressLine1,
            "addressLine2": this.RSdata.deliveryAddresses[0].addressLine2,
            "city": this.RSdata.deliveryAddresses[0].city,
            "state": this.RSdata.deliveryAddresses[0].state,
            "country": this.RSdata.deliveryAddresses[0].country,
            "postalCode": this.RSdata.deliveryAddresses[0].postalCode
          }
        ],
        "subscriptionDate": this.ddMMyyyy,
        "schedullingInfo": arry,
        "promoCode": this.RSdata.promoCode,
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
          localStorage.removeItem("requestdata");
          sessionStorage.removeItem('menuitemselection');
          sessionStorage.removeItem('value');
          sessionStorage.removeItem('scheduleID');
          this.router.navigate(["requestview"]);
        } else {
          // this.errorMessage = response.errorMessage;
        }
      });
  
  }


}


