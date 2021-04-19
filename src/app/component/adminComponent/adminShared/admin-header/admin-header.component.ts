import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  role;
  isDashBoard = false;
  adminObj;
  userObj;
  constructor(private router : Router) { }

  ngOnInit(): void {

    if(sessionStorage.length == 0){
      this.isDashBoard = true;
    }else if( sessionStorage.length > 0 && sessionStorage.getItem('role') == "admin"){

      this.role = "admin";
      this.adminObj = JSON.parse(sessionStorage.get('Admindata'));
      
    }else if(sessionStorage.length > 0 && sessionStorage.getItem('role') == "user"){

    }
  }


  logout(){
    
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.clear();
    
    this.router.navigateByUrl('/AdminLogin');
  }
}
