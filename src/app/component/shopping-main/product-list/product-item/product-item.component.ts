import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/user/product';

import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem : Product
  
  imageUrl : any;
  constructor(private msgService : MessengerService, private router : Router) { }

  ngOnInit(): void {
    this.imageUrl = "../../../../../assets/"+this.productItem.product_image;
    
  }

  ViewDetail(){
    this.msgService.sentProduct(this.productItem);
    this.router.navigate(['/View-Details/'],{queryParams :{productid :this.productItem.product_id}});
  }
  handleAddToCart(){
    // this.msg.senMsg(this.productItem);
  }
}
