import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

  goLogin(){
    this.router.navigate(["login"]);
  }
}
