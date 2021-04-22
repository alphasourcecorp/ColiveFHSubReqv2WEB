import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { from } from 'rxjs';
import { MenuItemSummaryInfo } from '../models/menu-item-summary-info';
import { SubscriptionRequestSummary } from '../models/subscription-request-summary';
import{MenuItem} from '../models/menuitem'
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnChanges {

  @Input() public menuItemSummaries;
  @Input() public isSubscriberInfoValid: boolean = false;
  @Input() public menuItem: MenuItem;
  public Lobj:any;
  public Lmenu:any;
  public deliveryFee: number = 0;
  public packagingCharges: number = 0;
  public deliveryPlan: string = "Weekly";
  public deliveryDate: string = "";
  public deliveryTime: string = "";
  public isTodayAvailable: boolean = true;
  public subtotal: number = 0;
  public total: number = 0;
  public tax: number = 0;
  public isError: boolean = true;
  selection: any;

  constructor(private router: Router) {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();

    if (currentHours >= 12) {
      this.isTodayAvailable = false;
    }

  }

  ngOnInit(): void {
  
  }



  ngOnChanges(changes: SimpleChanges): void {
      // this.subtotal = 0;
      // this.total = 0;
      // this.selection=JSON.parse(sessionStorage.getItem("menuitemselection"));
      // this.menuItemSummaries=this.selection;
      // this.menuItemSummaries.forEach(
      //   menuItemSummary => this.subtotal += menuItemSummary.totalAmount);

      // this.tax = +(this.subtotal * 0.05).toFixed(2);
      // this.total = this.subtotal + this.deliveryFee + this.packagingCharges + this.tax;

      // const validation = this.menuItemSummaries.length >= 1 &&
      //   typeof this.deliveryPlan !== undefined && this.deliveryPlan !== null && this.deliveryPlan !== "" &&
      //   typeof this.deliveryDate !== undefined && this.deliveryDate !== null && this.deliveryDate !== "" &&
      //   typeof this.deliveryTime !== undefined && this.deliveryTime !== null && this.deliveryTime !== "";

      // this.isError = !validation;
  }

  navigate($event: any) {
    if(this.menuItemSummaries['length']>0){
     this.router.navigate(["schedule"]);
    }
    
  }
}
