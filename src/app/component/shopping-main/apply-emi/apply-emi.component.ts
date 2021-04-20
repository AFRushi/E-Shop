import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler/src/core';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import{FormControl,Validators,FormGroup}from '@angular/forms';
import { Router } from '@angular/router';
import { Banks } from 'src/app/models/user/banks';
import { Branches } from 'src/app/models/user/branches';
import { User } from 'src/app/models/user/user';
import { UserServiceService } from 'src/app/services/User/user-service.service';


@Component({
  selector: 'app-apply-emi',
  templateUrl: './apply-emi.component.html',
  styleUrls: ['./apply-emi.component.css']
})
export class ApplyEmiComponent implements OnInit {
  applyemiForm = new FormGroup({
    userid: new FormControl('',[Validators.required]),
    cardtype:new FormControl('',[Validators.required]),
    bankNo:new FormControl('',[Validators.required]),
    aadhar:new FormControl('',[Validators.required, Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$')]),
    pan:new FormControl('',[Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$")]),
    ifsc:new FormControl('',[Validators.required]),
    bankName:new FormControl('',[Validators.required]),
    branchNames:new FormControl('',[Validators.required])
  
  });
  user : User;
  Name : string;
  banks : Banks[] = [];
  // SelBankId : number = null;
   branches : Branches[]=[];
  ifscSelect : string;
  cardTypeSelected : any;
  constructor(private service : UserServiceService,private router : Router) { }
  get userid() {
    return this.applyemiForm.get('userid');
  } 
 
  get cardtype(){
    return this.applyemiForm.get('cardtype');
  }
  get bankName(){
    return this.applyemiForm.get('bankName');
  }
  get bankNo(){
    return this.applyemiForm.get('bankNo');
  }
  get aadhar(){
    return this.applyemiForm.get('aadhar');
  }
  get branchNames(){
    return this.applyemiForm.get('branchNames');
  }
  get pan(){
    return this.applyemiForm.get('pan');
  }
  get ifsc(){
    return this.applyemiForm.get('ifsc');
  }

  ngOnInit(): void {
    
    if(sessionStorage.length > 0){
      this.user = JSON.parse(sessionStorage.getItem("user"));
      console.log(this.user);
      this.Name = this.user.username;
      console.log(this.Name);
      this.FillBanks();
    }else{
      this.router.navigateByUrl("/Login");
    }

    
}

FillBanks(){
  this.service.getBanks().subscribe((data : Banks[]) =>{
    this.banks = data;
    console.log("Banks",this.banks);
  });
}

FillBranch(SelBankId : number){
 this.service.getBranches(SelBankId).subscribe((data : Branches[])=>{
   this.branches = data;
   console.log("Branches",this.branches);
 });
}
FillIfsc(ifsc: any){
  
  this.branches.forEach(element => {
    if(element.branch_id== ifsc){
      this.ifscSelect = element.ifsc_code;
    }
  });
//  this.ifscSelect = this.branches[ifsc].ifsc_code;
console.log("FromFillIfsc",this.ifscSelect );
// this.ifscSelect = ifsc;
}

selectCardType(typeSelected){
  this.cardTypeSelected = typeSelected;
}
onSubmit() {
  let dataObject = {
    "user_id" : this.user.user_id,
    "card_type" :this.cardTypeSelected,
    "bank_id" : this.applyemiForm.get('bankName').value,
    "bank_account_no" : this.applyemiForm.get('bankNo').value,
    "aadhar_no" : this.applyemiForm.get('aadhar').value,
    "pan_card" : this.applyemiForm.get('pan').value
  }
 console.log(dataObject);
 

 this.service.saveApplyEmiCard(dataObject).subscribe(data =>{
   if(data == "Success"){
    
    this.service.getUserData(this.user.user_id).subscribe(res =>{

      console.log("User Data", res);
      sessionStorage.setItem("user",JSON.stringify(res));
      console.log("Session Data Update", JSON.parse(sessionStorage.getItem('user')));
    })

    // this.router.navigateByUrl("/Shopping");
    alert("Applied Sucessfully");
    
   }else if(data == "AlreadyExist"){
    alert("Applied Card already Exist");
    
   }else if (data == null || data == undefined){
      alert("Something Went Wrong");
   }
 });

 window.location.reload();
 this.router.navigateByUrl("/Shopping");
}

  }


