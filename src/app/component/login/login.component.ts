import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/User/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {}
  role;
  isDashBoard =false;
  
  adminObj;
  userObj;
  constructor(private service : UserServiceService, private toastr : ToastrService,private router :Router) { }

  ngOnInit(): void {
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
      console.log("role :",this.role);
      this.router.navigateByUrl("/Shopping");
    }
  }

  login(loginForm : NgForm) {
    
    // console.log(loginForm.value);
    this.service.getLogin(loginForm.value).subscribe(data =>{
      if(data == "Invalid" ){
        this.toastr.warning("Invalid Username Or Password");
        alert("Invalid Username Or password");
      }else{

         console.log(JSON.stringify(data));
        sessionStorage.setItem("role","user")
        sessionStorage.setItem("user",JSON.stringify(data));
        window.location.reload();
        this.router.navigateByUrl("/Shopping");
        
      }
    })
    
  }
}