import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import { Menu } from '../models/menu';
import { MenuCategoryInfo } from '../models/menu-category-info';
import { MenuItemSelectionInfo } from '../models/menu-item-selection-info';
import { MenuItemSummaryInfo } from '../models/menu-item-summary-info';
import { MenuService } from '../services/menu.service';
import { AddcartService } from '../addcart.service';
import { MenuitemviewComponent } from '../menuitemview/menuitemview.component';
import { MenuItem } from '../models/menuitem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public menu: Menu[];
  public value: any;
  public query;
  submenu;
  mainsub=[];
  newsub;
  breakfast:boolean;
  lunch:boolean;
  dinner:boolean;
  snacks:boolean;
  mealtype="dishName";


  @Input() menuItemSelectionInfo: MenuItemSelectionInfo;
  menuSelections: MenuItemSummaryInfo[];
  public menuCategories: MenuCategoryInfo[] = [];
  @Output() public menuItemSelections = new Map<string, MenuItemSummaryInfo>();

  select: any;
  Lmenu: any;
  constructor(private menuService: MenuService, private router: Router, public addCart: AddcartService) {

    this.menuSelections = [];
    // this.menuService.getMenuItems().subscribe((menuResponse) => {
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
    this.value = {
      '0004001': '0', '0004002': '0', '0004003': '0', '0004004': '0',
      '0004005': '0', '0004006': '0', '0004007': '0', '0004008': '0',
      '0004009': '0', '0004010': '0', '0003001': '0', '0003002': '0',
      '0003003': '0', '0003004': '0', '0003005': '0',  '0003006': '0',
      '0003007': '0',  '0003008': '0',  '0003009': '0',  '0003010': '0', 
       '0003011': '0',  '0003012': '0',  '0003013': '0',
      '0007001': '0', '0007002': '0', '0007003': '0',
      '0007004': '0', '0007005': '0', '0007006': '0', '0007007': '0',
      '0007008': '0', '0007009': '0', '0007010': '0',
      '0007011': '0', '0007012': '0', '0007013': '0', '0007014': '0',
      '0007015': '0', '0007016': '0', '0007017': '0',
      '0007018': '0', '0007019': '0', '0007020': '0', 
      '0008001': '0', '0008002': '0', '0008003': '0',
      '0008004': '0', '0008005': '0', '0008006': '0',
      '0008007': '0', '0008008': '0', '0008009': '0',
      '0008010': '0', '0008011': '0', '0008012': '0',
      '0008013': '0', '0008014': '0', '0008015': '0',
      '0008016': '0', '0008017': '0', '0008018': '0',
      '0008019': '0', '0008020': '0', '0008021': '0','0008022': '0', 
      '0001001': '0','0001002': '0', '0001003': '0', '0001004': '0', '0001005': '0','0001006': '0', 
     '0002001': '0', '0002002': '0', '0002003': '0', '0002004': '0',
      '0002005': '0', '0002006': '0', '0002007': '0', '0002008': '0',
      '0002009': '0', '0002010': '0', '0002011': '0', '0002012': '0',
      '0002013': '0', '0002014': '0', '0002015': '0',
      '0005001': '0', '0005002': '0', '0005003': '0', '0005004': '0', '0005005': '0', 
      '0005006': '0', '0005007': '0', '0005008': '0', '0005009': '0', '0005010': '0', 
      '0005011': '0', '0005012': '0', '0005013': '0', '0005014': '0', '0005015': '0', 
      '0006001': '0', '0006002': '0', '0006003': '0', '0006004': '0', '0006005': '0', 
      '0006006': '0', '0006007': '0', '0006008': '0', '0006009': '0', '0006010': '0', 
      '0006011': '0', '0006012': '0', '0006013': '0', '0006014': '0', '0006015': '0', 
      '0009001': '0', '0009002': '0', '0009003': '0', '0009004': '0', '0009005': '0',
      '0009006': '0', '0009007': '0', '0009008': '0', '0009009': '0','0009010': '0',
      '0009011': '0', '0009012': '0', '0009013': '0', '0009014': '0', '0009015': '0',
      '0009016': '0', '0009017': '0', '0009018': '0', '0009019': '0','0009020': '0',
      '0009021': '0', '0009022': '0', '0009023': '0', '0009024': '0', '0009025': '0',
      '0009026': '0', '0009027': '0', '0009028': '0', '0009029': '0','0009030': '0',
      '0009031': '0', '0009032': '0', '0009033': '0', '0009034': '0',
      '0009035': '0', '0009036': '0', '0009037': '0', '0009038': '0',
      '0010001': '0', '0010002': '0', '0010003': '0',
    };

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


  handleQuantity(units: number, x: any) {
    var y = this.value[x];
    var z = parseInt(y);
    z -= units;

    if (z <= 0) {
      z = 0;
    }
    this.Lmenu = JSON.parse(sessionStorage.getItem("menu"));
    let Mlength = this.Lmenu.length;
    for (let i = 0; i < Mlength; i++) {
      let MDlength = this.Lmenu[i].menuDetails.length;
      for (let j = 0; j < MDlength; j++) {
        let menuItemInfo = this.Lmenu[i].menuDetails[j];
        if (menuItemInfo.uniqueDishId == x) {
          const uniqueDishId = menuItemInfo.uniqueDishId;
          const menuItemSummaryInfo: MenuItemSummaryInfo = {
            uniqueDishId,
            dishImage: menuItemInfo.dishImage[0],
            dishName: menuItemInfo.dishName,
            quantity: z,
            saleAmount: menuItemInfo.saleAmount,
            totalAmount: z * menuItemInfo.saleAmount,
          };
          if (z <= 0) {
            this.menuItemSelections.delete(uniqueDishId);

          } else {
            this.menuItemSelections.set(uniqueDishId, menuItemSummaryInfo);

          }

          this.menuSelections = [...this.menuItemSelections.values()];
          sessionStorage.setItem(
            'menuitemselection',
            JSON.stringify(this.menuSelections)
          );
       

        }
      }
    }

    this.value[x] = z.toString();
    sessionStorage.setItem('value', JSON.stringify(this.value));
 
  }
  ngOnInit(): void {

    let token = sessionStorage.getItem('token');
    if (token) {
      // window.scrollTo(0, 0);
      this.select = JSON.parse(sessionStorage.getItem('menuitemselection'));
      let sValue = JSON.parse(sessionStorage.getItem('value'));

      if (sValue) {
          for (const key in sValue) {
          if (Object.prototype.hasOwnProperty.call(sValue, key)) {
            this.value[key] = sValue[key];
          }
        }
      }
      if (this.select) {
        let Slength = this.select.length;
        for (let i = 0; i < Slength; i++) {
       
          this.handleQuantity(0, this.select[i].uniqueDishId);
        }
      }
      
    } else {
      this.router.navigate(["login"]);
    }
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