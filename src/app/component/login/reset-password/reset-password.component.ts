import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/User/crud.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  forgetForm = new FormGroup({
    password : new FormControl('',[Validators.required,Validators.pattern('(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}')]),
    cpassword : new FormControl ('', [Validators.required])
  })

  constructor(public crudService: CrudService) { }

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
    console.log(this.forgetForm.value);
    let forgot_pwdobj = new user();
    forgot_pwdobj.password=this.password.value;

    this.crudService.reset_pwd(forgot_pwdobj).subscribe(res => {
      console.log(res);
    });
  }
}

export class user
{
  password : string;
}
