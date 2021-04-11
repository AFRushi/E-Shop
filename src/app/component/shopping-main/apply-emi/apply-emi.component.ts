import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import{FormControl,Validators,FormGroup}from '@angular/forms';

@Component({
  selector: 'app-apply-emi',
  templateUrl: './apply-emi.component.html',
  styleUrls: ['./apply-emi.component.css']
})
export class ApplyEmiComponent implements OnInit {
  applyemiForm = new FormGroup({
    userid: new FormControl('',[Validators.required]),
    cardtype:new FormControl('',[Validators.required]),
    bank:new FormControl('',[Validators.required]),
    aadhar:new FormControl('',[Validators.required]),
    pan:new FormControl('',[Validators.required]),
    ifsc:new FormControl('',[Validators.required]),
    bankid:new FormControl('',[Validators.required])
  
  })
  constructor() { }
  get userid() {
    return this.applyemiForm.get('userid');
  } 
  get cardtype(){
    return this.applyemiForm.get('cardtype');
  }
  get bankid(){
    return this.applyemiForm.get('bankid');
  }
  get bank(){
    return this.applyemiForm.get('bank');
  }
  get aadhar(){
    return this.applyemiForm.get('aadhar');
  }
  get pan(){
    return this.applyemiForm.get('pan');
  }
  get ifsc(){
    return this.applyemiForm.get('ifsc');
  }
  onSubmit() {
    console.log(this.applyemiForm.value);
    alert("Applied Sucessfully");
  }
  ngOnInit(): void {
    
  
}

  }


