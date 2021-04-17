import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CardDetail } from 'src/app/models/user/card-detail';
import { UserServiceService } from 'src/app/services/User/user-service.service';

@Component({
  selector: 'app-emi-card',
  templateUrl: './emi-card.component.html',
  styleUrls: ['./emi-card.component.css']
})
export class EmiCardComponent implements OnInit {
  emicardForm=new FormGroup({
    cardnumber: new FormControl(''),
    limit:new FormControl(''),
    balance:new FormControl(''),
    cardtype: new FormControl(''),
    validtill: new FormControl(''),

    
  })
  data : any;
  cardDetails : CardDetail;
  IsApproved ;
  constructor(private service : UserServiceService, private router : Router) { }
  get cardnumber() {
    return this.emicardForm.get('cardnumber');
  } 
  get limit() {
    return this.emicardForm.get('limit');
  } 
  get validtill() {
    return this.emicardForm.get('validtill');
  } 
  get balance() {
    return this.emicardForm.get('balance');
  } 
  get cardtype() {
    return this.emicardForm.get('cardtype');
  } 

  ngOnInit(): void {
    debugger
    if(sessionStorage.length != null){
      this.data = JSON.parse(sessionStorage.getItem("user"));
      this.IsApproved = this.data.approved_by_admin;
      this.getEMICardDetails();
    }else{
      this.router.navigateByUrl("/Login");
    }
  }

  getEMICardDetails(){
    debugger
    this.service.getEmiDetails(this.data.user_id).subscribe(data =>{
      this.cardDetails = data;
      console.log("Emi-Card-CardDetails",this.cardDetails);
    })
  }
}
