import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-Shop';
  isAdmin = true;;
  constructor(){}
  ngOnInit(){
    if(sessionStorage.getItem("isAdmin") && sessionStorage.getItem("userLoggedIn")){

    }
  }
}