import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/User/user-service.service';

/**
 *
 * @param form
 */

function passwordsMatchValidator(form) {
  const password = form.get('password')
  const confirmPassword = form.get('confirmPassword')

  if(password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordsMatch: true })
  } else {
    confirmPassword.setErrors(null)
  }

  return null
}

/**
 * If the data is valid return null else return an object
 */
function symbolValidator(control) { //control = registerForm.get('password')
  if(control.hasError('required')) return null;
  if(control.hasError('minlength')) return null;

  // if(control.value.indexOf('@') > -1) {
  //   return null
  // } else {
  //   return { symbol: true }
  // }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private builder: FormBuilder,private userService:UserServiceService,private router : Router) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.registerForm = this.builder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_no: ['',[Validators.required,Validators.pattern("^[798]{1}[0-9]{9}$")]],
      username: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, symbolValidator, Validators.minLength(4)]],
      confirmPassword: ''
    }, {
      validators: passwordsMatchValidator
    })
  }

  register() {
    console.log(this.registerForm.value)
  //   this.registerForm.controls['user_id'].setValue(user.user_id);
  // this.registerForm.controls['name'].setValue(user.name);
  // this.registerForm.controls['address'].setValue(user.address);
  // this.registerForm.controls['email'].setValue(user.email);
  // this.registerForm.controls['phone_no'].setValue(user.phone_no);
  // this.registerForm.controls['username'].setValue(user.username);
  // this.registerForm.controls['password'].setValue(user.password);
    this.userService.createUser(this.registerForm.value).subscribe(res =>{
debugger
      if(res.Status == "Success"){
        alert("Succesfully Register");
        this.router.navigateByUrl("/Login");
      }else{
        alert("Failed To register");
        this.registerForm.reset();
      }
    })
  }

}