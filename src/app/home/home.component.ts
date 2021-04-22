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
  mainsub;
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
    this.menuService.getMenuItems().subscribe((menuResponse) => {
      if (menuResponse.isSuccess) {
        this.menu = menuResponse.data;

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

    this.mainsub=this.menu;
    this.submenu=this.menuCategories;
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
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
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
      window.scrollTo(0, 0);
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
  this.submenu=this.menuCategories;
}

this.submenu=this.menuCategories;
this.submenu = this.submenu.filter(res => {
  return res.categoryName.toLowerCase().includes(this.query.toLowerCase()) 
})
  }
  onCheckboxChangeBreakfast(){
    if(this.breakfast==true){
    this.lunch=false;
    this.dinner=false;
    this.snacks=false;
    this.mealtype='Breakfast';
    }else{
      this.mealtype='dishName';
    }
  }
  onCheckboxChangelunch(){
    if(this.lunch==true){
    this.breakfast=false;
    this.dinner=false;
    this.snacks=false;
    this.mealtype='Lunch';
  }else{
    this.mealtype='dishName';
  }
  }
  onCheckboxChangeDinner(){
    if(this.dinner==true){
    this.breakfast=false;
    this.lunch=false;
    this.snacks=false;
    this.mealtype='Dinner';
  }else{
    this.mealtype='dishName';
  }
  }
  onCheckboxChangesnacks(){
    if(this.snacks==true){
    this.breakfast=false;
    this.lunch=false;
    this.dinner=false;
    this.mealtype='Snacks';
  }else{
    this.mealtype='dishName';
  }
  }
}