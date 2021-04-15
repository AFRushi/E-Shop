import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/user/product';

import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList : Product[] = [];
  constructor(private productService :ProductService) { }

  ngOnInit(): void {
    // console.log(this.productService.getProducts())
   this.refreshProductList();
  }

  refreshProductList(){
    this.productService.getAllProducts().subscribe((data : Product[])=>{
      this.productList = data;
      // console.log(this.productList);
    })
  }

}
