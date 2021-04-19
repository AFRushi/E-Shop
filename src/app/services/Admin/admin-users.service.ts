import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { Login } from 'src/app/models/user/login';
import { CardDetail } from 'src/app/models/user/card-detail';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  private apiServer = "http://localhost:56019/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient : HttpClient) { }

  getAdminLogin(login) : Observable<Login> {
    return this.httpClient.post<User>(this.apiServer+"Admin/AdminLogin/",JSON.stringify(login),this.httpOptions );
  }
  getAllUsers() :Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer + 'Admin/AllUsers');
  }

  getAppliedUsers() :Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer + 'Admin/GetAppliedUsers');
  }

  getApprovedUsers() :Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer + 'Admin/GetApprovedUsers');
  }

  upDateUserDetail( id, user) : Observable<User> {
    return this.httpClient.put<User>(this.apiServer+ 'Admin/UpdateUser?id=' + id , JSON.stringify(user),this.httpOptions);
  }

  deleteUser(id): Observable<User>{
    return this.httpClient.delete<User>(this.apiServer + 'Admin/DeleteUser?id=' + id);
  }

  getLogin(login) : Observable<Login> {
    return this.httpClient.post<User>(this.apiServer+"User/UserLogin/",JSON.stringify(login),this.httpOptions );
  }

  createUser(user : User) : Observable<User> {
    return this.httpClient.post<User>(this.apiServer + "User/CreateUser",JSON.stringify(user),this.httpOptions);
  }

  getCardDetails(user_id) :Observable<CardDetail> {
    return this.httpClient.get<CardDetail>(this.apiServer+ "EMICard/GetCardDetails?id=" + user_id)
  }
}
