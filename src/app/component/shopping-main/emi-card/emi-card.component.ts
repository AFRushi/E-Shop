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
    
    if(sessionStorage.length  > 0){
      this.data = JSON.parse(sessionStorage.getItem("user"));
      this.IsApproved = this.data.approved_by_admin;
      // this.IsApproved = true;
      this.getEMICardDetails();
    }else{
      this.router.navigateByUrl("/Login");
    }
  }

  getEMICardDetails(){
    
    this.service.getEmiDetails(this.data.user_id).subscribe(data =>{
      this.cardDetails = data;
      console.log("Emi-Card-CardDetails",this.cardDetails);
      
      let validDate = new Date(this.cardDetails.valid_till) ;
      // console.log(validDate)
      let year = validDate.getFullYear();
      let month = validDate.getMonth();
      // console.log("year ",year,"date",month);
      this.emicardForm.controls['cardnumber'].setValue(this.cardDetails.card_number);
      this.emicardForm.controls["cardtype"].setValue(this.cardDetails.card_type);
      this.emicardForm.controls["validtill"].setValue(month+'/'+year);
      this.emicardForm.controls["limit"].setValue(this.cardDetails.limit);
      this.emicardForm.controls["balance"].setValue(this.cardDetails.balance);

    });
  }
}