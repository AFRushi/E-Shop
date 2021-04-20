import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUsersService } from 'src/app/services/Admin/admin-users.service';
import { ProductService } from 'src/app/services/product.service';
import { UserServiceService } from 'src/app/services/User/user-service.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  user  : any;
  productItem : any;
  imageUrl: any;
  productName;
  Price;
  address;
  cardData;
  cardNumber;
  date;
  data = {};
  disablePayNow = false;
  
  constructor(private router1 : Router,
     private productService : ProductService,private router:ActivatedRoute,
     private service : AdminUsersService,private userService : UserServiceService) { }

  ngOnInit(): void {

    if(sessionStorage.length == 0){
      this.router1.navigateByUrl('/Login');
    }else{
      this.user = JSON.parse(sessionStorage.getItem('user'));
      console.log("User :" ,this.user);
      this.getProductDetails();
    }
    
  }
  async getProductDetails(){
      debugger
    console.log(this.router.snapshot.params['productid']);
   
    await this.productService.getProductById(this.router.snapshot.params['productid']).subscribe((data) =>{
    this.productItem = data;
    this.productName = this.productItem.product_name;
    this.Price = this.productItem.product_price;
    
      this.imageUrl = "../../../../assets/"+ this.productItem.product_image;
      console.log("Product :" ,this.productItem);
    });
    
    this.service.getCardDetails(this.user.user_id).subscribe(data =>{
      
      
        this.cardData = data;
        console.log("Card Date :",this.cardData);
        this.cardNumber = this.cardData.card_number;
        this.date = new Date(this.cardData.valid_till);
        this.date= this.date.getMonth() +"/" + this.date.getFullYear();
      
    })
  }


  selectedEmiPeriod(selectedEmi){
    
    
    this.data["emi_card_id"] = this.cardData.emi_card_id;
    this.data["product_id"] = this.productItem.product_id;
    this.data["emi_period"] = parseInt(selectedEmi);
   let date = new Date();
    // var s = formatDate(date, 'yyyy-MM-dd', 'IST');
    // console.log("Format Date",s);
    this.data["product_price"] = this.productItem.product_price;
    this.data["order_date"] = date;
    this.data["user_id"] = this.user.user_id;
    if(this.cardData.balance < this.productItem.product_price){
      this.disablePayNow = true;
    }
    console.log("data",this.data);
  }

  Pay(){
    
    this.userService.buyProduct(this.data).subscribe( res=>{
        if(res == "Success"){
          alert("Succesfull Payment");
          this.router1.navigateByUrl("/Cart")
        }else{
          alert("Payment Failed !!! Try again");
        }
    })
  }

  NotEnoughBalance(){
    alert("Not Enough Balnce!!");
  }
}