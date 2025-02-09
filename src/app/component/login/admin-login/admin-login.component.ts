import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminUsersService } from 'src/app/services/Admin/admin-users.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private service : AdminUsersService,
    private toastr : ToastrService,private router :Router) { }
  model: any = {}
  isDashBoard =false;
  role;
  adminObj;
  userObj;
  ngOnInit(): void {

    if(sessionStorage.length == 0){
      this.isDashBoard = true;
    }else if(sessionStorage.length > 0 && sessionStorage.getItem('role') == "admin"){
      this.isDashBoard = false;
      this.role = "admin";
      this.adminObj = JSON.parse(sessionStorage.getItem('Admindata'));
      console.log("role :",this.role);
      this.router.navigateByUrl("");
    }else if(sessionStorage.length > 0 && sessionStorage.getItem("role") == "user"){
      this.isDashBoard = false;
      this.role = "user";
      this.userObj = JSON.parse(sessionStorage.getItem("user"));
      console.log("role :",this.role);
      
    }
  }

  login(loginForm : NgForm) {
    // console.log(loginForm.value);
    this.service.getAdminLogin(loginForm.value).subscribe(data =>{
      if(data == "Invalid" ){
        alert("Invalid Username Or Password");
      }else{
       console.log(JSON.stringify(data));
       sessionStorage.setItem("role","admin");
       
        sessionStorage.setItem("Admindata",JSON.stringify(data));
        // sessionStorage.setItem("Admindata","true");
        window.location.reload();
        this.router.navigateByUrl("");
       
        
      }
    })
  }
}