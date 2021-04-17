import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banks } from 'src/app/models/user/banks';
import { Branches } from 'src/app/models/user/branches';
import { Login } from 'src/app/models/user/login';


import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  private apiServer = "http://localhost:56019/Api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getLogin(login) : Observable<Login> {
    return this.httpClient.post<User>(this.apiServer+"User/UserLogin/",JSON.stringify(login),this.httpOptions );
  }

  createUser(user : User) : Observable<User> {
    return this.httpClient.post<User>(this.apiServer + "User/CreateUser",JSON.stringify(user),this.httpOptions);
  }

  getBanks() :Observable<Banks[]>{
    return this.httpClient.get<Banks[]>(this.apiServer + "User/GetAllBanks");
  }

  getBranches(bankid) :Observable<Branches[]>{
    return this.httpClient.get<Branches[]>(this.apiServer + "User/GetBranches?bankid=" +bankid);
  }

  saveApplyEmiCard(data) : Observable<any>{
    return this.httpClient.post<any>(this.apiServer+"EMICard/CreateEmiCardForUser/",JSON.stringify(data),this.httpOptions);
  }
}
