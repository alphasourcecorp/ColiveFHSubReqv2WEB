import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  home(){
    let user =JSON.parse(sessionStorage.getItem('user'))
    if (user.isAdmin == false) {
      
      sessionStorage.removeItem("requestdata");
      sessionStorage.removeItem('menuitemselection');
      sessionStorage.removeItem('value');
      sessionStorage.removeItem('scheduleID');
      sessionStorage.removeItem('scheduledata');
      this.router.navigate(["home"]);
    } else if(user.isAdmin == true) {
    
      this.router.navigate(["admin"]);
    }else{
      this.router.navigate(["login"]);
  }

   
  }

}
