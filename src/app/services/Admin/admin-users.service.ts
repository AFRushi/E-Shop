import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { Login } from 'src/app/models/user/login';
import { CardDetail } from 'src/app/models/user/card-detail';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  private apiServer = "http://localhost:51732/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient : HttpClient) { }

  getAdminLogin(login) : Observable<Login> {
    return this.httpClient.post<User>(this.apiServer+"Admin/AdminLogin/",JSON.stringify(login),this.httpOptions ).pipe(
      catchError(this.errorHandler)
    );;
  }

  getAllUsers() :Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer + 'Admin/AllUsers').pipe(
      catchError(this.errorHandler)
    );;
  }

  getAppliedUsers() :Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer + 'Admin/GetAppliedUsers').pipe(
      catchError(this.errorHandler)
    );
  }

  getApprovedUsers() :Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer + 'Admin/GetApprovedUsers').pipe(
      catchError(this.errorHandler)
    );
  }

  upDateUserDetail( id, user) : Observable<User> {
    return this.httpClient.put<User>(this.apiServer+ 'Admin/UpdateUser?id=' + id , JSON.stringify(user),this.httpOptions);
  }

  deleteUser(id): Observable<User>{
    return this.httpClient.delete<User>(this.apiServer + 'Admin/DeleteUser?id=' + id).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteProduct(id) :Observable<User>{
    return this.httpClient.delete<User>(this.apiServer + 'Admin/DeleteProduct?id=' + id).pipe(
      catchError(this.errorHandler)
    );
  }

  getLogin(login) : Observable<Login> {
    return this.httpClient.post<User>(this.apiServer+"User/UserLogin/",JSON.stringify(login),this.httpOptions ).pipe(
      catchError(this.errorHandler)
    );
  }

  createUser(user : User) : Observable<User> {
    return this.httpClient.post<User>(this.apiServer + "User/CreateUser",JSON.stringify(user),this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  getCardDetails(user_id) :Observable<CardDetail> {
    return this.httpClient.get<CardDetail>(this.apiServer+ "EMICard/GetCardDetails?id=" + user_id).pipe(
      catchError(this.errorHandler)
    )
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