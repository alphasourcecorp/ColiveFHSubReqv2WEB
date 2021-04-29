import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
about =true;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  //  openHome() {
  //   this.router.navigate(["home"]);
  // }
  // openNav() {
  //   document.getElementById("mySidenav").style.width = "350px";
  // }

}
