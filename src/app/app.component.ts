import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from './models/menu';
import { MenuCategoryInfo } from './models/menu-category-info';
import { MenuResponse } from './models/menu-response';
import { MenuService } from './services/menu.service';

export let browserRefresh: boolean = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fhsubscriptions';
  public menuCategories: MenuCategoryInfo[] = [];
  public subscription: Subscription;

  constructor(private menuService: MenuService, private router: Router) {
    this.subscription =
      this
        .router
        .events
        .subscribe((event) => {
          if (event instanceof NavigationStart) {
            browserRefresh = true;
          }
        });
  }

  ngOnInit() {
    this
      .menuService
      .getMenuItems()
      .subscribe(response => {
        if (response.isSuccess) {
          const menus: Menu[] = response.data;

          menus.forEach(menu => {
            const menuCategoryInfo: MenuCategoryInfo = {
              categoryName: menu.categoryTitle,
              noOfDishes: menu.menuDetails.length,
              id:menu.id
            };

            this.menuCategories.push(menuCategoryInfo);
          })
        } else {
          throw new Error(response.errorMessage);
        }
      });
  }

  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
  toTop(){
    window.scrollTo(0,0);
  }
  Closetoast1(){
    document.getElementById("toster").style.display = "none";
  }
  Closetoast2(){
    document.getElementById("tostersignup").style.display = "none";
  }
}
