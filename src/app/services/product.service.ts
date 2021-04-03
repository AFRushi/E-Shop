import { Injectable } from '@angular/core';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products : Product [] = [
    new Product (1, "This is product 1" , "This is Kool Product!", 1200),
    new Product (2, "This is product 1" , "This is Kool Product!", 120),
    new Product (3, "This is product 1" , "This is Kool Product!", 120),
    new Product (4, "This is product 1" , "This is Kool Product!", 200),
    new Product (5, "This is product 1" , "This is Kool Product!", 1200),
    new Product (6, "This is product 1" , "This is Kool Product!", 1220),
    new Product (7, "This is product 1" , "This is Kool Product!", 10),

  ]
  constructor() { }

  getProducts() : Product[]{
    return this.products;
  }
}
