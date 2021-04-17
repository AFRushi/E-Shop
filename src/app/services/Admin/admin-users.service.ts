import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { Login } from 'src/app/models/user/login';

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
    return this.httpClient.delete<User>(this.apiServer + 'Admin/DeleteUser?=' + id);
  }

  getLogin(login) : Observable<Login> {
    return this.httpClient.post<User>(this.apiServer+"User/UserLogin/",JSON.stringify(login),this.httpOptions );
  }

  createUser(user : User) : Observable<User> {
    return this.httpClient.post<User>(this.apiServer + "User/CreateUser",JSON.stringify(user),this.httpOptions);
  }
}
