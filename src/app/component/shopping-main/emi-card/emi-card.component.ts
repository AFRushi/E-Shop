import { Component, OnInit } from '@angular/core';
import{FormControl,FormGroup}from '@angular/forms';

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

  constructor() { }

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
  }

}
