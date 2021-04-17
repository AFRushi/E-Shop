import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiServer = "http://localhost:51732/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient : HttpClient) { }
  
  postProduct(user_id, product_id) : Observable<CartItem> {
    return this.httpClient.post<CartItem>(this.apiServer + 'Cart/PostProduct?user_id='+user_id +'&product_id='+product_id,this.httpOptions);
  }

}
