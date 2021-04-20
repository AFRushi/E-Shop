import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/User/crud.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetForm = new FormGroup({
    username : new FormControl('',[Validators.required])
  })


  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
    
  }
  get username()
  {
    return this.resetForm.get('username');
  }
  onSubmit()
  {
    
    console.log(this.resetForm.value);
    let resetobj = new user();
    resetobj.username = this.username.value;

    this.crudService.mail(resetobj).subscribe(res => {
      console.log(res);
      if(res == "Successfull"){
        alert("Reset Password Link is been sent to your Email");
      }
      else if (res == "User Does not exist"){
      }
      else{
        alert("Failed To send the link");
      }
    });
  }
}
export class user
{
  username : string;
}
