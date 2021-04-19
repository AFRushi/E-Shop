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
  ngOnInit(): void {
  }

  login(loginForm : NgForm) {
    // console.log(loginForm.value);
    this.service.getAdminLogin(loginForm.value).subscribe(data =>{
      if(data == "Invalid" ){
        this.toastr.warning("Invalid Username Or Password");
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
