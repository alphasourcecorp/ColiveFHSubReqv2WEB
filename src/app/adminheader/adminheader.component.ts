import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  closeNav() {
    document.getElementById("mySidenavAdmin").style.width = "0";
  }
  openNav() {
    document.getElementById("mySidenavAdmin").style.width = "350px";
  }
  goTorequestView(str) {
    sessionStorage.setItem("adminrequestid", str);
    this.router.navigate(["adminrequestview"]);

  }
  logout() {
    this.router.navigate(["login"]);
    sessionStorage.clear();
  }
  signup() {
    this.router.navigate(["admin"]);
  }

}
