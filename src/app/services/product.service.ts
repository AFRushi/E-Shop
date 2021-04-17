import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/user/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // products : Product [] = [
  //   new Product (1, "This is product 1" , "This is Kool Product!", 1200),
  //   new Product (2, "This is product 1" , "This is Kool Product!", 120),
  //   new Product (3, "This is product 1" , "This is Kool Product!", 120),
  //   new Product (4, "This is product 1" , "This is Kool Product!", 200),
  //   new Product (5, "This is product 1" , "This is Kool Product!", 1200),
  //   new Product (6, "This is product 1" , "This is Kool Product!", 1220),
  //   new Product (7, "This is product 1" , "This is Kool Product!", 10),

  // ]

  private apiServer = "http://localhost:56019/Api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient : HttpClient) { }

  getAllProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiServer + 'Products/GetProductList');
  }

  getProductById(id) :Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiServer + 'Products/GetProductById?id=' + id);
  }
}
