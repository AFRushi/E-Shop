import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  IsApplied : any;
  IsApproved : any
  constructor() { }

  ngOnInit(): void {
    debugger
    if(sessionStorage.length > 0){
      let data = JSON.parse(sessionStorage.getItem("user"));
      this.IsApplied = data.applied_for_card;
      this.IsApproved = data.approved_by_admin;
    }
  }

}