import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { Banks } from 'src/app/models/user/banks';
import { Branches } from 'src/app/models/user/branches';
import { CardDetail } from 'src/app/models/user/card-detail';
import { Login } from 'src/app/models/user/login';
import { catchError } from 'rxjs/operators';


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
    return this.httpClient.post<User>(this.apiServer+"User/UserLogin/",JSON.stringify(login),this.httpOptions ).pipe(
      catchError(this.errorHandler)
    );
  }

  getUserData(user_id) : Observable<User>{
    return this.httpClient.get<User>(this.apiServer + "User/GetUserData?user_id=" + user_id).pipe(
      catchError(this.errorHandler)
    );
  }
  createUser(user) : Observable<any> {
    return this.httpClient.post<any>(this.apiServer + "User/CreateUser",JSON.stringify(user),this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  getBanks() :Observable<Banks[]>{
    return this.httpClient.get<Banks[]>(this.apiServer + "User/GetAllBanks").pipe(
      catchError(this.errorHandler)
    );
  }

  getBranches(bankid) :Observable<Branches[]>{
    return this.httpClient.get<Branches[]>(this.apiServer + "User/GetBranches?bankid=" +bankid).pipe(
      catchError(this.errorHandler)
    );
  }

  saveApplyEmiCard(data) : Observable<any>{
    return this.httpClient.post<any>(this.apiServer+"EMICard/CreateEmiCardForUser/",JSON.stringify(data),this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  getEmiDetails(id) : Observable<CardDetail>{
    return this.httpClient.get<CardDetail>(this.apiServer + "EMICard/GetCardDetails?id=" + id).pipe(
      catchError(this.errorHandler)
    );
  }

  addToCart(userid, productid) : Observable<any>{
    return this.httpClient.post<any>(this.apiServer + "User/AddToCart?userid=" + userid +"&productid="+productid, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  getCartData(userid) : Observable<any>{
    return this.httpClient.get<any>(this.apiServer+ "User/GetCartData?id=" + userid).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteFromcart(productid) : Observable<any>{
    return this.httpClient.delete<any>(this.apiServer+ "User/DeletFromCart?productid=" +productid,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  buyProduct (data) : Observable<any>{
    return this.httpClient.post<any>(this.apiServer + "User/BuyProducts/" , JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

 getPayingEMIDetails(user_id) : Observable<any>{
   return this.httpClient.get<any>(this.apiServer+"EMICard/GetPayingEMIDetails?user_id="+user_id).pipe(
    catchError(this.errorHandler)
  );
 }

 getOrderHistory(user_id) : Observable<any> {
   return this.httpClient.get<any>(this.apiServer+"EMICard/GetOrderHistory?user_id="+user_id).pipe(
    catchError(this.errorHandler)
  );
 }

 errorHandler(error) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
}