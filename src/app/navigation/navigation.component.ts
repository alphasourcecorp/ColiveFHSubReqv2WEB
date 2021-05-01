import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddcartService } from '../addcart.service';
import { MenuCategoryInfo } from '../models/menu-category-info';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() public meal;
  @Input() public home;
  @Input() public about;
 
  @Input() public request;
  @Input() public schedule;

  public menu;
  public value: any;
  public query;
  submenu;
  mainsub=[];
  newsub;
  navWidth='0';
  public menuCategories=[];
  breakfast:boolean;
  lunch:boolean;
  dinner:boolean;
  snacks:boolean;
  constructor(private router:Router,private menuService: MenuService,  public addCart: AddcartService) {
    this.menuService.getMenuItems().subscribe((menuResponse) => {
      if (menuResponse.isSuccess) {
        this.menu = menuResponse.data;
        this.mainsub=this.menu;
        this.menu.forEach((menuInfo) => {
          const categoryId = menuInfo.id;

          menuInfo.menuDetails.forEach((menuItemInfo) => {
            const uniqueDishId = `${categoryId}${menuItemInfo.dishId}`;

            menuItemInfo.uniqueDishId = uniqueDishId;
          });
        });
        sessionStorage.setItem('menu', JSON.stringify(this.menu));
        this.menu.forEach((menu) => {
          const menuCategoryInfo: MenuCategoryInfo = {
            categoryName: menu.categoryTitle,
            noOfDishes: menu.menuDetails.length,
            id:menu.id
          };

          this.menuCategories.push(menuCategoryInfo);
        });
      } else {
        throw new Error(menuResponse.errorMessage);
      }
    });

    
    this.submenu=this.menuCategories;
    this.newsub=this.submenu;
   }

  ngOnInit(): void {
    
  }
  goTOschedule(){
    // this.router.navigate(["schedule"]);
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "350px";
  }
  // openHome() {
  //   this.router.navigate(["home"]);
  // }
  openabout() {
    this.router.navigate(["aboutus"]);
  }
  openmeal() {
    this.router.navigate(["subscribemeals"]);
  }
  openhome() {
    this.router.navigate(["home"]);
  }

  search(){
    if(this.query==null || ""){
      this.newsub=this.submenu;
    }
    
    this.newsub=this.submenu;
    this.newsub = this.newsub.filter(res => {
      return res.categoryName.toLowerCase().includes(this.query.toLowerCase()) 
    })
      }
      onCheckboxChangeBreakfast(){
        if(this.breakfast==true){
        this.lunch=false;
        this.dinner=false;
        this.snacks=false;
        this.mainsub=this.menu;
        this.query="";
        this.mainsub= this.mainsub.map((element) => {
          return {...element, menuDetails: element.menuDetails.filter((subElement) => subElement.Breakfast == true)}
        })
        this.submenu=[];
        this.mainsub.forEach((menu) => {
          const menuCategoryInfo: MenuCategoryInfo = {
            categoryName: menu.categoryTitle,
            noOfDishes: menu.menuDetails.length,
            id:menu.id
          };
    
          this.submenu.push(menuCategoryInfo);
        });
        this.newsub=this.submenu;
        }else{
          this.mainsub=this.menu;
          this.submenu=this.menuCategories;
          this.newsub=this.submenu;
          this.query="";
        }
        
    
      }
      onCheckboxChangelunch(){
        if(this.lunch==true){
        this.breakfast=false;
        this.dinner=false;
        this.snacks=false;
        this.mainsub=this.menu;
        this.query="";
        this.mainsub= this.mainsub.map((element) => {
          return {...element, menuDetails: element.menuDetails.filter((subElement) => subElement.Lunch == true)}
        })
        this.submenu=[];
        this.mainsub.forEach((menu) => {
          const menuCategoryInfo: MenuCategoryInfo = {
            categoryName: menu.categoryTitle,
            noOfDishes: menu.menuDetails.length,
            id:menu.id
          };
    
          this.submenu.push(menuCategoryInfo);
        });
        this.newsub=this.submenu;
        }else{
          this.mainsub=this.menu;
          this.submenu=this.menuCategories;
          this.newsub=this.submenu;
          this.query="";
        }
      }
      onCheckboxChangeDinner(){
        if(this.dinner==true){
        this.breakfast=false;
        this.lunch=false;
        this.snacks=false;
        this.mainsub=this.menu;
        this.query="";
        this.mainsub= this.mainsub.map((element) => {
          return {...element, menuDetails: element.menuDetails.filter((subElement) => subElement.Dinner == true)}
        })
        this.submenu=[];
        this.mainsub.forEach((menu) => {
          const menuCategoryInfo: MenuCategoryInfo = {
            categoryName: menu.categoryTitle,
            noOfDishes: menu.menuDetails.length,
            id:menu.id
          };
    
          this.submenu.push(menuCategoryInfo);
        });
        this.newsub=this.submenu;
        }else{
          this.mainsub=this.menu;
          this.submenu=this.menuCategories;
          this.newsub=this.submenu;
          this.query="";
        }
      }
      onCheckboxChangesnacks(){
        if(this.snacks==true){
        this.breakfast=false;
        this.lunch=false;
        this.dinner=false;
        this.mainsub=this.menu;
        this.query="";
        this.mainsub= this.mainsub.map((element) => {
          return {...element, menuDetails: element.menuDetails.filter((subElement) => subElement.Snacks == true)}
        })
        this.submenu=[];
        this.mainsub.forEach((menu) => {
          const menuCategoryInfo: MenuCategoryInfo = {
            categoryName: menu.categoryTitle,
            noOfDishes: menu.menuDetails.length,
            id:menu.id
          };
    
          this.submenu.push(menuCategoryInfo);
        });
        this.newsub=this.submenu;
        }else{
          this.mainsub=this.menu;
          this.submenu=this.menuCategories;
          this.newsub=this.submenu;
          this.query="";
        }
      }
}
