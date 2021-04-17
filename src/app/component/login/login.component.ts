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
  constructor(private service : UserServiceService, private toastr : ToastrService,private router :Router) { }

  ngOnInit(): void {
  }

  login(loginForm : NgForm) {
    // console.log(loginForm.value);
    this.service.getLogin(loginForm.value).subscribe(data =>{
      if(data == "Invalid" ){
        this.toastr.warning("Invalid Username Or Password");
      }else{
       console.log(JSON.stringify(data));
        sessionStorage.setItem("user",JSON.stringify(data));
        
        this.router.navigateByUrl("/Shopping");
      }
    })

  }
}
