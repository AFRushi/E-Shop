import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banks } from 'src/app/models/user/banks';
import { Branches } from 'src/app/models/user/branches';
import { CardDetail } from 'src/app/models/user/card-detail';
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

  getUserData(user_id) : Observable<User>{
    return this.httpClient.get<User>(this.apiServer + "User/GetUserData?user_id=" + user_id);
  }
  createUser(user) : Observable<any> {
    return this.httpClient.post<any>(this.apiServer + "User/CreateUser",JSON.stringify(user),this.httpOptions);
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

  getEmiDetails(id) : Observable<CardDetail>{
    return this.httpClient.get<CardDetail>(this.apiServer + "EMICard/GetCardDetails?id=" + id);
  }

  addToCart(userid, productid) : Observable<any>{
    return this.httpClient.post<any>(this.apiServer + "User/AddToCart?userid=" + userid +"&productid="+productid, this.httpOptions);
  }

  getCartData(userid) : Observable<any>{
    return this.httpClient.get<any>(this.apiServer+ "User/GetCartData?id=" + userid);
  }

  deleteFromcart(productid) : Observable<any>{
    return this.httpClient.delete<any>(this.apiServer+ "User/DeletFromCart?productid=" +productid,this.httpOptions);
  }

  buyProduct (data) : Observable<any>{
    return this.httpClient.post<any>(this.apiServer + "User/BuyProducts/" , JSON.stringify(data), this.httpOptions);
  }

 getPayingEMIDetails(user_id) : Observable<any>{
   return this.httpClient.get<any>(this.apiServer+"EMICard/GetPayingEMIDetails?user_id="+user_id);
 }

 getOrderHistory(user_id) : Observable<any> {
   return this.httpClient.get<any>(this.apiServer+"EMICard/GetOrderHistory?user_id="+user_id);
 }
}
