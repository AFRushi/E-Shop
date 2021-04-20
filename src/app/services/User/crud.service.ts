import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private apiServer = "http://localhost:51732/Api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  mail(muser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + 'Mail/mail/', JSON.stringify(muser), this.httpOptions)
  }

  reset_pwd(fuser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + 'Reset_Pwd/Forget/', JSON.stringify(fuser), this.httpOptions)
  }

}
export class Mailuser
{
  Email_ID : string;
}
export class reset_pwd
{
  password : string;
}