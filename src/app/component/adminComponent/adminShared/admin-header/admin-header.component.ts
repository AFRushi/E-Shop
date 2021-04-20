import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

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
      console.log("Admin :",this.adminObj);
    }else if(sessionStorage.length > 0 && sessionStorage.getItem('role') == "user"){
      this.isDashBoard = false;
      this.role = "user";
      this.userObj = JSON.parse(sessionStorage.getItem("user"));
      console.log("role :",this.role);
    }
  }


  Adminlogout(){
    
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('Admindata');
    sessionStorage.clear();
    this.isDashBoard = true;
    // window.location.reload();
    this.router.navigateByUrl('');
    window.location.reload();

  }
  Userlogout(){
    
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userObj');
    sessionStorage.clear();
    this.isDashBoard = true;
    window.location.reload();
    this.router.navigateByUrl("");
    

  }
}