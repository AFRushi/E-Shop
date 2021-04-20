import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/User/user-service.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  user;
  orders;
  products;
  emptyOrders;
  constructor(private router : Router, private userService : UserServiceService) { }

  ngOnInit(): void {

    if(sessionStorage.length > 0){
      this.user = JSON.parse(sessionStorage.getItem('user'));
      console.log('user',this.user);
      this.refreshOrderHistory();
    }else{
      this.router.navigateByUrl("/Login");
    }
  }

  refreshOrderHistory(){

    debugger
    this.userService.getOrderHistory(this.user.user_id).subscribe(res =>{

      this.orders = res["Orders"];
      this.products = res["Products"];

      console.log("OrderData :",this.orders);
      console.log("Products Data", this.products);

      for(var i = 0 ;  i< this.orders.length; i++){
        for(var j=0; j< this.products.length; j++){

          if(this.orders[i].product_id == this.products[j].product_id){
            this.orders[i]["product_name"] = this.products[j].product_name;
            this.orders[i]["product_price"] = this.products[j].product_price;
            break;
          }

        }
      }
    })
  }
  

}
