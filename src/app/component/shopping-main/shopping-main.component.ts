import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-main',
  templateUrl: './shopping-main.component.html',
  styleUrls: ['./shopping-main.component.css']
})
export class ShoppingMainComponent implements OnInit {

  role;
  isDashBoard=false;
  adminObj;
  userObj;
  constructor(private router : Router) { }

  ngOnInit(): void {

    if(sessionStorage.length == 0){
      this.isDashBoard = true;
    }else if( sessionStorage.length > 0 && sessionStorage.getItem('role') == "admin"){
      this.isDashBoard = false;
      this.role = "admin";
      this.adminObj = JSON.parse(sessionStorage.getItem('Admindata'));
      console.log("role :",this.role);
      this.router.navigateByUrl("/AdminLogin");
    }else if(sessionStorage.length > 0 && sessionStorage.getItem('role') == "user"){
      this.isDashBoard = false;
      this.role = "user";
      this.userObj = JSON.parse(sessionStorage.getItem("user"));
      console.log("role :",this.role);
    }
    
  }

}
