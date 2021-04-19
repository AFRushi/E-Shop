import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { CrudService } from '../../../crud.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetForm = new FormGroup({
    emailid : new FormControl('',[Validators.required, Validators.email])
  })


  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
    
  }
  get emailid()
  {
    return this.resetForm.get('emailid');
  }
  onSubmit()
  {
    
    console.log(this.resetForm.value);
    let resetobj = new user();
    resetobj.Email_ID = this.emailid.value;

    this.crudService.mail(resetobj).subscribe(res => {
      console.log(res);
      
    });
  }
}
export class user
{
  Email_ID : string;
}