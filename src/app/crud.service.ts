import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "http://localhost:56074/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  mail(muser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Mail/', JSON.stringify(muser), this.httpOptions)
  }

  reset_pwd(fuser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Reset_pwd/', JSON.stringify(fuser), this.httpOptions)
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