import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  donotshow;
  constructor(private router: Router) { }

  ngOnInit(): void {
    
    if(sessionStorage.getItem("isAdmin") == "true"){
      this.donotshow =true;
    }else if(sessionStorage.getItem("isAdmin") == "false"){
      this.donotshow =true;
    }else{
      this.donotshow =false;
    }
  }

  AdminLogin(){
    this.router.navigateByUrl("/AdminLogin");
  }
}
