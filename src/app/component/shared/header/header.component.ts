import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sequenceEqual } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLogged = false;
  user;
  constructor(private router : Router) { }

  ngOnInit(): void {

    if(sessionStorage.length > 0){
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.userLogged = true;
    }
  }

  logout(){

    sessionStorage.removeItem('user');
    sessionStorage.clear();
    this.router.navigateByUrl("/Shopping");
    alert("Logged Out");
    window.location.reload();
  }
}