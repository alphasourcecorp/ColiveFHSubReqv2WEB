import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {


  user: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();

  }
  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem("user"));
    if(this.user){

      window.scrollTo(0,380);
     }else{
      this.router.navigate(["home"]);

   }
  }
  gohome() {
    this.router.navigate(["home"]);
    // sessionStorage.clear();
  }
  gorequestlist(){
    this.router.navigate(["requestlist"]);
  }
}
