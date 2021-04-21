import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/User/crud.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  forgetForm = new FormGroup({
    password : new FormControl('',[Validators.required,Validators.pattern(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)]),
    cpassword : new FormControl ('', [Validators.required])
  })

  constructor(public crudService: CrudService, private router : Router) { }

  ngOnInit():void {
    
  }
  
  get password()
  {
    return this.forgetForm.get('password');
  }

  get cpassword()
  {
    return this.forgetForm.get('cpassword');
  }


  onSubmit()
  {
    const urlParams = new URLSearchParams(window.location.search);
    const token = decodeURI(urlParams.get('token'));
    console.log(token);
    console.log(decodeURI(token));
    console.log(this.forgetForm.value);

    let forgot_pwdobj = new user();
    forgot_pwdobj.email = decodeURI(token);
    forgot_pwdobj.password=this.password.value;

    this.crudService.reset_pwd(forgot_pwdobj).subscribe(res => {
      console.log(res);
      if(res == "Success"){
        alert("Password Successfully updated");
        this.router.navigateByUrl("/Login");
      }else{
        alert("Failed To reset Password");
      }
    });
  }
}

export class user
{
  email : string;
  password : string;
}
