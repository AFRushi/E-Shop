import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products: any = [
    {product_id:'1',product_name:'Realme Narzo 20',color:'Glory Silver',smallDesc:'4 GB RAM 64 GB ROM Expandable Upto 256 GB16.56 cm (6.52 inch) HD+ Display 48MP + 8MP + 2MP  8MP Front Camera  6000 mAh Lithium-ion Battery MediaTek Helio G85 Processor',price:'10499',qty:'35',imgUrl:'src/assets/ProductsImage/1_SmartPhone_realme-narzo-20.jpeg'}
,{product_id:'2',product_name:'Realme Narzo 20',color:'Glory Silver',smallDesc:'4 GB RAM 64 GB ROM Expandable Upto 256 GB16.56 cm (6.52 inch) HD+ Display 48MP + 8MP + 2MP  8MP Front Camera  6000 mAh Lithium-ion Battery MediaTek Helio G85 Processor',price:'10499',qty:'35',imgUrl:'src/assets/ProductsImage/1_SmartPhone_realme-narzo-20.jpeg'}  
  ];

  productsHeader = ['Product ID','Product Img','Product Name', 'Color','Description','Price','Quantity','Action'];
  
  constructor() { }

  ngOnInit(): void {
  }

}
