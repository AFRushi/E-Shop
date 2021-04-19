import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/user/product';


import { UserServiceService } from 'src/app/services/User/user-service.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem : Product
  
  imageUrl : any;
  user :any
  constructor(private service : UserServiceService, private router : Router) { }

  ngOnInit(): void {
    this.imageUrl = "../../../../../assets/"+this.productItem.product_image;
    
  }

  ViewDetail(){
    // this.msgService.sentProduct(this.productItem);
    this.router.navigate(['/View-Details/'],{queryParams :{productid :this.productItem.product_id}});
  }

  handleAddToCart(){
    // this.msg.senMsg(this.productItem);
    try{
      this.user = JSON.parse(sessionStorage.getItem('user'));
        
      console.log("User Id:",this.user.user_id,"Product ID:",this.productItem.product_id);
        this.service.addToCart(this.user.user_id,this.productItem.product_id).subscribe(data =>{
            if(data == "Success"){
                alert("Successfully addded to cart");
            }else{
                alert("Network Problems");
            }
         });
        

        }catch(error){
        console.error(error);
      
        }
  }
}
