import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  isDashBoard =false;
  role;
  adminObj;
  userObj;
  IsApplied : any;
  IsApproved : any
  constructor() { }

  ngOnInit(): void {
    debugger
    if(sessionStorage.length == 0){
      this.isDashBoard = true;
    }else if(sessionStorage.length > 0 && sessionStorage.getItem('role') == "admin"){
      this.isDashBoard = false;
      this.role = "admin";
      this.adminObj = JSON.parse(sessionStorage.getItem('Admindata'));
      console.log("role :",this.role);
    }else if(sessionStorage.length > 0 && sessionStorage.getItem("role") == "user"){
      this.isDashBoard = false;
      this.role = "user";
      this.userObj = JSON.parse(sessionStorage.getItem("user"));

      this.IsApplied = this.userObj.applied_for_card;
      this.IsApproved = this.userObj.approved_by_admin;
      console.log("role :",this.role);
    }
  }

}